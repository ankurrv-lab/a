import asyncio
import subprocess
import os
import psutil
import logging
from fastapi import FastAPI, Request, Form, Query
from fastapi.responses import HTMLResponse, JSONResponse
import re
app = FastAPI()

# Configure detailed logging
logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger("app")

# Store alerts for private messages per IP or useragent
private_alerts_store = {}

# Track current typing models
current_typing_models = set()

cloudflare_public_url = None


def ollama_list_models():
    logger.debug("Listing Ollama models...")
    try:
        result = subprocess.run(
            ["ollama", "list"],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            encoding="utf-8",
        )
        models = []
        for line in result.stdout.strip().splitlines():
            if line and not line.startswith("NAME"):
                model_name = line.split()[0]
                models.append(model_name)
        logger.info(f"Discovered models: {models}")
        return models
    except Exception as e:
        logger.error(f"Failed to list Ollama models: {e}")
        return ["mistral"]


OLLAMA_MODELS = ollama_list_models()


def get_ollama_pids():
    try:
        pids = [p.pid for p in psutil.process_iter(["name"]) if "ollama" in (p.info.get("name") or "").lower()]
        logger.debug(f"Ollama running process PIDs: {pids}")
        return pids
    except Exception as e:
        logger.warning(f"Error finding Ollama PIDs: {e}")
        return []


def get_gpu_stats():
    try:
        result = subprocess.run(
            ["nvidia-smi", "--query-gpu=utilization.gpu,memory.used", "--format=csv,noheader,nounits"],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            encoding="utf-8",
        )
        if result.returncode == 0 and result.stdout:
            gpu_util, gpu_mem = result.stdout.strip().split(",")
            logger.debug(f"GPU utilization: {gpu_util}%, Memory used: {gpu_mem}MB")
            return gpu_util + "%", gpu_mem + "MB"
        logger.debug("GPU utilization not available, returning 0% and 0MB")
        return "0%", "0MB"
    except Exception as e:
        logger.warning(f"Error getting GPU stats: {e}")
        return "0%", "0MB"


def get_iops_stats():
    try:
        io_counters = psutil.disk_io_counters()
        logger.debug(f"Disk IOPS - Read: {io_counters.read_count}, Write: {io_counters.write_count}")
        return io_counters.read_count, io_counters.write_count
    except Exception as e:
        logger.warning(f"Error getting disk IO stats: {e}")
        return 0, 0


async def get_system_stats():
    logger.debug("Gathering system stats...")
    cpu_percent = psutil.cpu_percent(interval=0.1)
    mem_used = psutil.virtual_memory().used
    pids = get_ollama_pids()
    total_cpu = 0.0
    total_mem = 0
    for pid in pids:
        try:
            proc = psutil.Process(pid)
            total_cpu += proc.cpu_percent(interval=0.0)
            total_mem += proc.memory_info().rss
        except Exception as e:
            logger.debug(f"Process info retrieval failed for PID {pid}: {e}")
    gpu_util, gpu_mem = get_gpu_stats()
    read_iops, write_iops = get_iops_stats()
    stats = {
        "cpu": cpu_percent,
        "memory": mem_used,
        "ollama_cpu": total_cpu,
        "ollama_memory": total_mem,
        "gpu": gpu_util,
        "gpu_mem": gpu_mem,
        "read_iops": read_iops,
        "write_iops": write_iops,
    }
    logger.debug(f"System stats: {stats}")
    return stats


def typing_update(model: str, is_typing: bool):
    if is_typing:
        current_typing_models.add(model)
    else:
        current_typing_models.discard(model)
    logger.debug(f"Typing update: {current_typing_models}")


async def run_ollama_model(model: str, prompt: str, typing_cb=None):
    logger.debug(f"Running model '{model}' with prompt: {prompt}")
    retries = 3
    attempt = 0
    import time
    start = time.time()
    if typing_cb:
        typing_cb(model, True)
    while attempt <= retries:
        proc = None
        try:
            proc = await asyncio.create_subprocess_exec(
                "ollama", "run", model, prompt,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
                env={**os.environ, "PYTHONUTF8": "1"}
            )
            logger.debug(f"Subprocess for model '{model}' started PID {proc.pid}")
            stdout, stderr = await proc.communicate()
            out_text = stdout.decode("utf-8", errors="replace") if stdout else ""
            err_text = stderr.decode("utf-8", errors="replace") if stderr else ""
            for noise in [
                "failed to get console mode for stdout: The handle is invalid.",
                "failed to get console mode for stderr: The handle is invalid."
            ]:
                out_text = out_text.replace(noise, "")
                err_text = err_text.replace(noise, "")
            if err_text:
                logger.warning(f"Model '{model}' stderr: {err_text}")
            sys_stats = await get_system_stats()
            duration = time.time() - start
            usage = (f"CPU: {sys_stats['ollama_cpu']:.2f}%, MEM: {sys_stats['ollama_memory'] // 1024**2}MB, "
                     f"GPU: {sys_stats['gpu']}, GPU_MEM: {sys_stats['gpu_mem']}, "
                     f"IOPS: {sys_stats['read_iops']}/{sys_stats['write_iops']}, Duration: {duration:.2f}s")
            result = f"【{model}】:\n{out_text.strip()}\n[System: {usage}]"
            if typing_cb:
                typing_cb(model, False)
            return result
        except Exception as e:
            logger.error(f"Error running model '{model}': {e}, retry {attempt}")
            if proc:
                proc.kill()
            attempt += 1
            await asyncio.sleep(1)
    if typing_cb:
        typing_cb(model, False)
    return f"\n[Error: Failed to get response from {model} after retries]\n"


def write_redirect_index(url, repo='.'):
    content = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Redirecting...</title>
<meta http-equiv="refresh" content="0; url={url}" />
</head>
<body>
<a href="{url}">Redirecting to {url}</a>
</body>
</html>
"""
    path = os.path.join(repo, "index.html")
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    logger.info(f"Redirect HTML written to {path}")


def git_commit_push(files, repo='.'):
    try:
        logger.info("Running git pull")
        subprocess.run(["git", "pull"], cwd=repo, check=True)
        logger.info(f"Running git add for: {files}")
        subprocess.run(["git", "add"] + files, cwd=repo, check=True)
        import datetime
        msg = f"Auto commit at {datetime.datetime.now().isoformat()}"
        logger.info(f"Running git commit with message: {msg}")
        subprocess.run(["git", "commit", "-m", msg], cwd=repo, check=True)
        logger.info("Running git push")
        subprocess.run(["git", "push"], cwd=repo, check=True)
        logger.info("Git commit and push completed successfully")
    except subprocess.CalledProcessError as e:
        logger.error(f"Git command failed: {e}")


def run_cloudflared():
    import threading
    import webbrowser
    global cloudflare_public_url
    logger.info("write_redirect_index(cloudflare_public_url)")
    write_redirect_index(cloudflare_public_url)
    logger.info("git_commit_push")
    git_commit_push(["index.html", "fastapi_ollama_mistral_chat_v3.py"])
    cmd = ["cloudflared", "tunnel", "--url", "http://localhost:8000", "--protocol", "http2"]
    proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
                            text=True, encoding="utf-8", bufsize=1)

    for line in proc.stdout:
        line = line.strip()
        logger.info(f"Cloudflared: {line}")
        if not cloudflare_public_url and "Visit it at" in line:
            # Use regex to find https URL inside square brackets
            matches = re.findall(r"\[(https?://[^\]]+)\]", line)
            logger.info(f"if not cloudflare_public_url ")
            if matches:
                logger.info(f"if matches:")
                url_candidate = matches[0]
                cloudflare_public_url = url_candidate
                logger.info(f"Cloudflare public URL extracted: {cloudflare_public_url}")
                webbrowser.open(cloudflare_public_url)
                write_github_redirect_index(cloudflare_public_url)
                git_commit_and_push(["index.html", "fastapi_ollama_mistral_chat_v3.py"])
    proc.wait()


@app.get("/", response_class=HTMLResponse)
async def index():
    typing_str = ", ".join(current_typing_models) or "No one"
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Ollama Chat</title>
<style>
/* ... your CSS here copied from previous ... */
</style>
</head>
<body>
<div id="app">
<header>
<h1>Ollama Chat - Typing: {typing_str}</h1>
<div id="status" title="Connection Status"></div>
</header>
<main id="chat" style="height: 80vh; overflow-y: scroll;"></main>
<footer>
<input id="msg" type="text" placeholder="Type message..."/>
<button id="send" disabled>Send</button>
</footer>
<audio id="beep" src="https://actions.google.com/sounds/v1/alarms/beep_short.ogg"></audio>
<script>
/* Copy and adapt your client JS here consistent with previous example */
/* Implement chat message adding, typing indicators, alert polling, etc. */
</script>
</body>
</html>"""
    return HTMLResponse(content=html, status_code=200)


@app.get("/whoami")
async def whoami(request: Request):
    ip = request.client.host
    ua = request.headers.get("user-agent", "unknown")
    user = f"{ip}:{ua[:16]}"
    logger.debug(f"Whoami called for {user}")
    return JSONResponse({"username": user})


@app.get("/alerts")
async def alerts(request: Request, ip: str = None, useragent: str = None):
    key = ip or useragent or request.client.host or "unknown"
    alerts = private_alerts_store.pop(key, [])
    logger.debug(f"Alerts sent to {key}: {alerts}")
    return JSONResponse({"alerts": alerts})


@app.post("/chat")
async def chat(message: str = Form(...), request: Request = None):
    ip = request.client.host if request else "unknown"
    ua = request.headers.get("user-agent", "unknown") if request else "unknown"
    user = f"{ip}:{ua[:16]}"
    lower_msg = message.lower()

    logger.debug(f"Chat received from {user}: {message}")

    targets = []
    alert_ip = None
    alert_model = None
    for model in OLLAMA_MODELS:
        if f"@{model.lower()}" in lower_msg or any(f"@{abbr}" in lower_msg for abbr in [model[:6], model[:3]]):
            targets.append(model)
            alert_model = model

    if "@" in lower_msg:
        for segment in lower_msg.split("@")[1:]:
            if "." in segment and any(ch.isdigit() for ch in segment):
                alert_ip = segment.strip().split()[0]

    if not targets:
        targets = OLLAMA_MODELS

    if alert_ip:
        private_alerts_store.setdefault(alert_ip, []).append(f"Someone pinged your IP {alert_ip}. Please respond.")

    tasks = [run_ollama_model(m, message, typing_cb=typing_update) for m in targets]
    results = await asyncio.gather(*tasks)

    stats = await get_system_stats()
    status_str = (
        f"CPU: {stats['cpu']}%, Mem: {stats['memory'] // 1024**2}MB, "
        f"GPU: {stats['gpu']}, GPU Mem: {stats['gpu_mem']}, "
        f"IOPS: {stats['read_iops']}/{stats['write_iops']}"
    )

    responses = []
    for model, res in zip(targets, results):
        alert_flag = (alert_model == model or alert_ip is not None)
        responses.append({
            "text": res,
            "meta": f"{model} bot",
            "system": status_str,
            "alert": alert_flag
        })

    return JSONResponse({"responses": responses})


if __name__ == "__main__":
    import threading
    import uvicorn
    t = threading.Thread(target=run_cloudflared, daemon=True)
    t.start()
    logger.info("Starting FastAPI server with cloudflared tunnel")
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="debug")
