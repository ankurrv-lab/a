// Unika Housing Society Website JavaScript
// Enhanced with robust metadata loading and character encoding fixes

class CommunityWebsite {
    constructor() {
        this.data = null;
        this.init();
    }

    // Embedded fallback data (encoded safely without special characters)
    getFallbackData() {
        return {
            videos: [
                {
                    title: "Day 9 Friday September 4 - All Performances",
                    url: "https://youtu.be/m9C-BkvTY7Q",
                    date: "2025-09-04",
                    description: "Complete performances from Day 9 of our community events",
                    thumbnail: "https://img.youtube.com/vi/m9C-BkvTY7Q/maxresdefault.jpg"
                },
                {
                    title: "Day 8 Friday September 3 - Morning Aarti and Performance",
                    url: "https://youtu.be/GmpDN48JYn4",
                    date: "2025-09-03",
                    description: "Morning aarti and cultural performances from Day 8",
                    thumbnail: "https://img.youtube.com/vi/GmpDN48JYn4/maxresdefault.jpg"
                },
                {
                    title: "Day 7 Purple Day - Morning Aarti and Housie Game Highlights",
                    url: "https://youtu.be/I3_6kmCxVYQ",
                    date: "2025-09-02",
                    description: "Purple day celebrations with morning aarti and housie game",
                    thumbnail: "https://img.youtube.com/vi/I3_6kmCxVYQ/maxresdefault.jpg"
                },
                {
                    title: "Day 4 Evening Games",
                    url: "https://youtu.be/AWtFzAvBAmU",
                    date: "2025-08-30",
                    description: "Evening games and activities from Day 4",
                    thumbnail: "https://img.youtube.com/vi/AWtFzAvBAmU/maxresdefault.jpg"
                },
                {
                    title: "August 27th 2025 Event",
                    url: "https://youtu.be/F6tJ04NBbcU",
                    date: "2025-08-27",
                    description: "Special community event on August 27th",
                    thumbnail: "https://img.youtube.com/vi/F6tJ04NBbcU/maxresdefault.jpg"
                },
                {
                    title: "15th August 2025 Independence Day",
                    url: "https://youtu.be/ABmNSpv51g8",
                    date: "2025-08-15",
                    description: "Independence Day celebrations",
                    thumbnail: "https://img.youtube.com/vi/ABmNSpv51g8/maxresdefault.jpg"
                },
                {
                    title: "Holi 14 March 2025",
                    url: "https://youtu.be/TasomD1aKCQ",
                    date: "2025-03-14",
                    description: "Holi festival celebrations",
                    thumbnail: "https://img.youtube.com/vi/TasomD1aKCQ/maxresdefault.jpg"
                },
                {
                    title: "76th Republic Day",
                    url: "https://youtu.be/ncIraPMjBr0",
                    date: "2025-01-26",
                    description: "Republic Day celebrations",
                    thumbnail: "https://img.youtube.com/vi/ncIraPMjBr0/maxresdefault.jpg"
                }
            ],
            timelineEvents: [
                {
                    title: "Day 9 - Grand Finale Performances",
                    date: "September 4, 2025",
                    description: "The spectacular conclusion of our 9-day celebration featuring all community performances and cultural programs.",
                    videoUrl: "https://youtu.be/m9C-BkvTY7Q",
                    icon: "EVENTS",
                    side: "right"
                },
                {
                    title: "Day 8 - Morning Aarti & Cultural Show",
                    date: "September 3, 2025", 
                    description: "Sacred morning prayers followed by beautiful cultural performances by our talented residents.",
                    videoUrl: "https://youtu.be/GmpDN48JYn4",
                    icon: "PRAYER",
                    side: "left"
                },
                {
                    title: "Day 7 - Purple Day Celebrations",
                    date: "September 2, 2025",
                    description: "Special purple-themed day with morning aarti and exciting housie game sessions for all ages.",
                    videoUrl: "https://youtu.be/I3_6kmCxVYQ",
                    icon: "PURPLE",
                    side: "right"
                },
                {
                    title: "Day 4 - Evening Games Extravaganza",
                    date: "August 30, 2025",
                    description: "Fun-filled evening with community games, competitions, and entertainment for the whole family.",
                    videoUrl: "https://youtu.be/AWtFzAvBAmU",
                    icon: "GAMES",
                    side: "left"
                },
                {
                    title: "Special Community Gathering",
                    date: "August 27, 2025",
                    description: "A memorable community event bringing neighbors together with food, music, and celebration.",
                    videoUrl: "https://youtu.be/F6tJ04NBbcU",
                    icon: "COMMUNITY",
                    side: "right"
                },
                {
                    title: "Independence Day Celebration",
                    date: "August 15, 2025",
                    description: "Patriotic celebration with flag hoisting, cultural programs, and community spirit.",
                    videoUrl: "https://youtu.be/ABmNSpv51g8",
                    icon: "INDIA",
                    side: "left"
                },
                {
                    title: "Holi - Festival of Colors",
                    date: "March 14, 2025",
                    description: "Joyous Holi celebration with colors, music, dance, and traditional festivities.",
                    videoUrl: "https://youtu.be/TasomD1aKCQ",
                    icon: "COLORS",
                    side: "right"
                },
                {
                    title: "76th Republic Day",
                    date: "January 26, 2025",
                    description: "Celebrating India's Republic Day with pride, patriotic songs, and community unity.",
                    videoUrl: "https://youtu.be/ncIraPMjBr0",
                    icon: "REPUBLIC",
                    side: "left"
                }
            ],
            creator: {
                name: "Dr. Ankur Rajan Verma",
                youtube: "https://www.youtube.com/@vermaanz",
                instagram: "https://www.instagram.com/ankurvermarajan", 
                linkedin: "https://www.linkedin.com/in/dr-ankur-rajan-devendra-nath-verma-ph-d-209200257/",
                whatsapp: "https://chat.whatsapp.com/CpuHaMaT2XC7rWQ42Bifgu"
            }
        };
    }

    async init() {
        console.log('Initializing Unika Housing Society website...');
        
        // Try to load metadata from multiple locations
        await this.loadMetadata();
        
        // Initialize components
        this.renderEvents();
        this.renderVideos();
        this.renderTimeline();
        this.setupNavigation(); // Setup navigation after content is rendered
        
        console.log('Website initialization complete.');
    }

    async loadMetadata() {
        const locations = [
            './data/video_metadata.js',  // Primary location
            './video_metadata.js'        // Fallback location (same folder)
        ];

        for (const location of locations) {
            try {
                console.log(`Attempting to load metadata from: ${location}`);
                
                const response = await fetch(location);
                if (response.ok) {
                    const metadata = await response.json();
                    console.log(`Successfully loaded metadata from: ${location}`);
                    this.data = metadata;
                    return;
                }
            } catch (error) {
                console.warn(`Failed to load metadata from ${location}:`, error.message);
            }
        }

        // Use embedded fallback data
        console.log('Using embedded fallback data');
        this.data = this.getFallbackData();
    }

    setupNavigation() {
        console.log('Setting up navigation...');
        
        // Remove any existing event listeners to prevent duplicates
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            const newAnchor = anchor.cloneNode(true);
            anchor.parentNode.replaceChild(newAnchor, anchor);
        });

        // Add fresh event listeners
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const targetId = anchor.getAttribute('href').substring(1); // Remove #
                console.log(`Navigation clicked for: #${targetId}`);
                
                this.scrollToSection(targetId);
            });
        });

        console.log('Navigation setup complete.');
    }

    scrollToSection(sectionId) {
        console.log(`Attempting to scroll to section: ${sectionId}`);
        
        const target = document.getElementById(sectionId);
        if (!target) {
            console.warn(`Section not found: ${sectionId}`);
            return;
        }

        // Calculate scroll position
        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = target.offsetTop - headerHeight - 20;

        console.log(`Scrolling to position: ${targetPosition} for section: ${sectionId}`);

        // Perform smooth scroll
        window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: 'smooth'
        });
    }

    renderEvents() {
        const container = document.getElementById('events-grid');
        if (!container || !this.data) return;

        try {
            const eventsHtml = this.data.videos.slice(0, 6).map(video => {
                const formattedDate = this.formatDate(video.date);
                return `
                    <div class="event-card">
                        <img src="${video.thumbnail}" alt="${this.sanitizeText(video.title)}" class="event-thumbnail" onerror="this.style.display='none'">
                        <div class="event-content">
                            <h3 class="event-title">${this.sanitizeText(video.title)}</h3>
                            <div class="event-date">${formattedDate}</div>
                            <p class="event-description">${this.sanitizeText(video.description)}</p>
                            <a href="${video.url}" target="_blank" rel="noopener noreferrer" class="event-link" onclick="console.log('Opening video:', '${video.url}');">
                                Watch Event
                            </a>
                        </div>
                    </div>
                `;
            }).join('');

            container.innerHTML = eventsHtml;
            console.log('Events rendered successfully');
        } catch (error) {
            console.error('Error rendering events:', error);
            container.innerHTML = this.getFallbackEventsHtml();
        }
    }

    renderVideos() {
        const container = document.getElementById('videos-grid');
        if (!container || !this.data) return;

        try {
            const videosHtml = this.data.videos.map(video => {
                const formattedDate = this.formatDate(video.date);
                return `
                    <div class="video-card">
                        <img src="${video.thumbnail}" alt="${this.sanitizeText(video.title)}" class="video-thumbnail" onerror="this.style.display='none'">
                        <div class="video-content">
                            <h3 class="video-title">${this.sanitizeText(video.title)}</h3>
                            <p class="video-description">${this.sanitizeText(video.description)}</p>
                            <div class="video-date">${formattedDate}</div>
                            <a href="${video.url}" target="_blank" rel="noopener noreferrer" class="video-link" onclick="console.log('Opening video:', '${video.url}');">
                                Watch Video
                            </a>
                        </div>
                    </div>
                `;
            }).join('');

            container.innerHTML = videosHtml;
            console.log('Videos rendered successfully');
        } catch (error) {
            console.error('Error rendering videos:', error);
            container.innerHTML = this.getFallbackVideosHtml();
        }
    }

    renderTimeline() {
        const container = document.getElementById('timeline');
        if (!container || !this.data) return;

        try {
            const timelineHtml = this.data.timelineEvents.map((event, index) => {
                const iconText = this.getIconText(event.icon);
                const sideClass = event.side || (index % 2 === 0 ? 'right' : 'left');
                
                return `
                    <div class="timeline-item ${sideClass}">
                        <div class="timeline-content">
                            <h3 class="timeline-title">${this.sanitizeText(event.title)}</h3>
                            <div class="timeline-date">${event.date}</div>
                            <p class="timeline-description">${this.sanitizeText(event.description)}</p>
                            ${event.videoUrl ? `<a href="${event.videoUrl}" target="_blank" rel="noopener noreferrer" class="timeline-video-link" onclick="console.log('Opening timeline video:', '${event.videoUrl}');">Watch Video</a>` : ''}
                        </div>
                        <div class="timeline-icon">${iconText}</div>
                    </div>
                `;
            }).join('');

            container.innerHTML = timelineHtml;
            console.log('Timeline rendered successfully');
        } catch (error) {
            console.error('Error rendering timeline:', error);
            container.innerHTML = this.getFallbackTimelineHtml();
        }
    }

    // Convert icon types to simple text representations
    getIconText(iconType) {
        const iconMap = {
            'EVENTS': 'EV',
            'PRAYER': 'PR',
            'PURPLE': 'PP',
            'GAMES': 'GM',
            'COMMUNITY': 'CM',
            'INDIA': 'IN',
            'COLORS': 'CO',
            'REPUBLIC': 'RP'
        };
        return iconMap[iconType] || 'EV';
    }

    // Sanitize text to remove special characters and emojis
    sanitizeText(text) {
        if (!text) return '';
        
        // Remove emojis and special Unicode characters
        return text
            .replace(/[\u{1F600}-\u{1F64F}]/gu, '') // Emoticons
            .replace(/[\u{1F300}-\u{1F5FF}]/gu, '') // Misc Symbols
            .replace(/[\u{1F680}-\u{1F6FF}]/gu, '') // Transport
            .replace(/[\u{1F1E0}-\u{1F1FF}]/gu, '') // Flags
            .replace(/[\u{2600}-\u{26FF}]/gu, '')   // Misc symbols
            .replace(/[\u{2700}-\u{27BF}]/gu, '')   // Dingbats
            .replace(/[^\x00-\x7F]/g, '')           // Remove non-ASCII
            .trim();
    }

    formatDate(dateString) {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (error) {
            return dateString; // Return original if formatting fails
        }
    }

    // Fallback HTML methods
    getFallbackEventsHtml() {
        return `
            <div class="fallback-content">
                <h3>Community Events</h3>
                <p>Our community regularly hosts various events including cultural celebrations, games, and social gatherings. Please check back later for updated event information.</p>
                <a href="https://www.youtube.com/@vermaanz" target="_blank" rel="noopener noreferrer" class="btn btn--primary">Visit YouTube Channel</a>
            </div>
        `;
    }

    getFallbackVideosHtml() {
        return `
            <div class="fallback-content">
                <h3>Video Gallery</h3>
                <p>Our video gallery showcases memorable moments from community events. Visit our <a href="https://www.youtube.com/@vermaanz" target="_blank" rel="noopener noreferrer">YouTube channel</a> to view all videos.</p>
                <a href="https://www.youtube.com/@vermaanz" target="_blank" rel="noopener noreferrer" class="btn btn--primary">Visit YouTube Channel</a>
            </div>
        `;
    }

    getFallbackTimelineHtml() {
        return `
            <div class="fallback-content">
                <h3>Community Timeline</h3>
                <p>Our community has been celebrating various festivals and events throughout the year. Each celebration brings us closer together as neighbors and friends.</p>
                <a href="https://www.youtube.com/@vermaanz" target="_blank" rel="noopener noreferrer" class="btn btn--primary">See All Events</a>
            </div>
        `;
    }

    // Utility method to handle image loading errors
    handleImageError(img) {
        img.style.display = 'none';
        console.warn('Failed to load image:', img.src);
    }
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing website...');
    
    // Small delay to ensure all content is rendered
    setTimeout(() => {
        new CommunityWebsite();
    }, 100);
});

// Global error handler
window.addEventListener('error', (event) => {
    console.error('Global error caught:', event.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    event.preventDefault();
});