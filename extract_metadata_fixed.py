
import requests
import json
import re
from urllib.parse import urlparse, parse_qs
import time
from datetime import datetime
import os

class YouTubeMetadataExtractor:
    def __init__(self):
        """Initialize YouTube metadata extractor"""
        self.ensure_folders()

    def ensure_folders(self):
        """Create data folder if it doesn't exist"""
        if not os.path.exists("data"):
            os.makedirs("data")

    def extract_video_id(self, url):
        """Extract video ID from various YouTube URL formats"""
        if "youtu.be" in url:
            video_id = url.split("/")[-1].split("?")[0]
            return video_id
        elif "youtube.com" in url:
            if "watch?v=" in url:
                return url.split("watch?v=")[1].split("&")[0]
            elif "embed/" in url:
                return url.split("embed/")[1].split("?")[0]
        return None

    def get_metadata_web_scraping(self, url):
        """Get metadata using web scraping (no API key required)"""
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }

        try:
            print(f"Fetching: {url}")
            response = requests.get(url, headers=headers, timeout=10)
            response.raise_for_status()
            html = response.text

            # Extract title
            title_pattern = r'<title>([^<]+)</title>'
            title_match = re.search(title_pattern, html)
            title = title_match.group(1).replace(' - YouTube', '').strip() if title_match else 'Unknown Title'

            # Extract view count
            view_patterns = [
                r'"viewCount":"(\d+)"',
                r'"views"\s*:\s*"([^"]+)"',
                r'([\d,]+) views'
            ]
            view_count = 'Unknown'
            for pattern in view_patterns:
                match = re.search(pattern, html)
                if match:
                    view_count = match.group(1)
                    break

            # Extract channel name
            channel_patterns = [
                r'"author":"([^"]+)"',
                r'"channelTitle":"([^"]+)"',
                r'<meta name="author" content="([^"]+)"'
            ]
            channel = 'Unknown Channel'
            for pattern in channel_patterns:
                match = re.search(pattern, html)
                if match:
                    channel = match.group(1)
                    break

            # Extract description
            desc_patterns = [
                r'"shortDescription":"([^"]{0,300})',
                r'<meta name="description" content="([^"]+)"'
            ]
            description = 'No description available'
            for pattern in desc_patterns:
                match = re.search(pattern, html)
                if match:
                    description = match.group(1)[:200] + '...' if len(match.group(1)) > 200 else match.group(1)
                    break

            # Extract thumbnail
            video_id = self.extract_video_id(url)
            thumbnail = f"https://img.youtube.com/vi/{video_id}/maxresdefault.jpg" if video_id else None

            return {
                'title': title,
                'description': description,
                'channel': channel,
                'view_count': view_count,
                'thumbnail': thumbnail,
                'url': url,
                'video_id': video_id,
                'extraction_method': 'web_scraping',
                'extracted_at': datetime.now().isoformat()
            }

        except Exception as e:
            print(f"Error extracting metadata from {url}: {e}")
            return {
                'title': 'Error extracting title',
                'description': 'Failed to extract metadata',
                'channel': 'Unknown',
                'view_count': 'Unknown',
                'url': url,
                'error': str(e),
                'extraction_method': 'web_scraping_failed',
                'extracted_at': datetime.now().isoformat()
            }

    def process_video_list(self, video_urls):
        """Process a list of YouTube URLs and extract metadata"""
        results = []
        total_videos = len(video_urls)

        print(f"Starting extraction for {total_videos} videos...")
        print("=" * 60)

        for i, url in enumerate(video_urls, 1):
            print(f"\nProcessing video {i}/{total_videos}")

            metadata = self.get_metadata_web_scraping(url)
            if metadata:
                results.append(metadata)
                print(f"Success: {metadata.get('title', 'Unknown')[:50]}...")
            else:
                print(f"Failed: {url}")

            # Be respectful with requests
            if i < total_videos:
                time.sleep(2)

        return results

    def save_metadata_files(self, data):
        """Save metadata to multiple locations for flexibility"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

        # 1. Save as JavaScript for web consumption (in root folder)
        js_content = f"""// YouTube video metadata - Generated on {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
// This file contains metadata for all Unika Housing Society videos

const videoMetadata = {json.dumps(data, ensure_ascii=False, indent=2)};

// Make it available globally
window.videoMetadata = videoMetadata;

// Export for CommonJS if available
if (typeof module !== 'undefined' && module.exports) {{
    module.exports = videoMetadata;
}}

console.log('Video metadata loaded: ' + videoMetadata.length + ' videos');
"""

        # Save in root folder (same folder as website)
        root_js_file = "video_metadata.js"
        with open(root_js_file, 'w', encoding='utf-8') as f:
            f.write(js_content)
        print(f"JavaScript metadata saved to: {root_js_file}")

        # Save in data folder as well (backup location)
        data_js_file = os.path.join("data", "video_metadata.js")
        with open(data_js_file, 'w', encoding='utf-8') as f:
            f.write(js_content)
        print(f"JavaScript metadata backup saved to: {data_js_file}")

        # 2. Save JSON backup with timestamp
        json_filename = f"unika_youtube_metadata_{timestamp}.json"
        json_filepath = os.path.join("data", json_filename)
        with open(json_filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"JSON backup saved to: {json_filepath}")

        return {
            'root_js': root_js_file,
            'data_js': data_js_file,
            'json_backup': json_filepath
        }

def main():
    """Main function to extract Unika Housing Society video metadata"""
    print("Unika Housing Society - YouTube Metadata Extractor")
    print("Fixed Version - Saves to both root and data folders")
    print("=" * 60)

    # All video URLs from Unika Housing Society
    video_urls = [
        "https://youtu.be/m9C-BkvTY7Q",  # Day 9 Friday September 4
        "https://youtu.be/GmpDN48JYn4",  # Day 8 Friday September 3
        "https://www.youtube.com/watch?v=dZZsAsRCDhU",
        "https://youtu.be/Bs13pcCDPV8",
        "https://youtu.be/NMDpQtJWbMw",
        "https://youtu.be/ATB3sCiGmWc",
        "https://youtu.be/I3_6kmCxVYQ",  # Day 7 purple day
        "https://youtu.be/DzS30Vb8BEg",
        "https://youtu.be/AMUEA3s5UNo",
        "https://youtu.be/_jC-SIRpsD0",
        "https://youtu.be/3bZ-pjyz1dI",
        "https://youtu.be/1GIVDZVZ6MU",
        "https://youtu.be/qWDQzYDqNIw",
        "https://youtu.be/AWtFzAvBAmU",  # Day 4 evening games
        "https://youtu.be/F6tJ04NBbcU",  # Aug 27th 2025
        "https://youtu.be/ABmNSpv51g8",  # 15th Aug 2025
        "https://youtu.be/TasomD1aKCQ",  # Holi 14 Mar 2025
        "https://youtu.be/ncIraPMjBr0",  # 76th Republic Day
    ]

    # Initialize extractor
    extractor = YouTubeMetadataExtractor()

    # Extract metadata
    metadata_list = extractor.process_video_list(video_urls)

    # Save metadata to multiple locations
    files_created = extractor.save_metadata_files(metadata_list)

    # Display summary
    print("\n" + "=" * 60)
    print("EXTRACTION SUMMARY")
    print("=" * 60)
    print(f"Total videos processed: {len(metadata_list)}")
    print(f"Successful extractions: {len([v for v in metadata_list if 'error' not in v])}")
    print(f"Failed extractions: {len([v for v in metadata_list if 'error' in v])}")

    # Show sample data
    print(f"\nSAMPLE EXTRACTED DATA:")
    print("-" * 40)
    for i, video in enumerate(metadata_list[:3]):  # Show first 3 videos
        print(f"\n{i+1}. {video.get('title', 'Unknown Title')[:60]}...")
        print(f"   Channel: {video.get('channel', 'Unknown')}")
        print(f"   Views: {video.get('view_count', 'Unknown')}")

    print(f"\nFILES CREATED:")
    print(f"ROOT FOLDER (same as website):")
    print(f"  - {files_created['root_js']} (website will load this)")
    print(f"\nDATA FOLDER (backup):")
    print(f"  - {files_created['data_js']} (backup copy)")  
    print(f"  - {files_created['json_backup']} (JSON format)")

    print(f"\nWEBSITE COMPATIBILITY:")
    print("The website will now automatically find the metadata in either location:")
    print("1. First tries: video_metadata.js (same folder)")
    print("2. Then tries: data/video_metadata.js (data folder)")
    print("3. Falls back to embedded data if neither found")

    print(f"\nREADY FOR GITHUB PAGES!")
    print("Upload the entire folder to your repository and your site will work perfectly.")

    return metadata_list

if __name__ == "__main__":
    main()
