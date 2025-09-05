// App State
const appState = {
    currentLanguage: 'en',
    videosLoaded: 0,
    videosPerPage: 6,
    isLoading: false
};

// Language translations
const translations = {
    en: {
        siteName: "Unika Housing Society",
        welcome: "Welcome to Our Community",
        heroDescription: "Experience the vibrant celebrations and memorable moments of our housing society",
        watchVideos: "Watch Latest Videos",
        browsePhotos: "Browse Photos",
        latestVideos: "Latest Videos",
        videosDescription: "Watch highlights from our community events and celebrations",
        photoGalleries: "Photo Galleries",
        photosDescription: "Browse through our collection of memorable moments",
        eventsTimeline: "Events Timeline",
        timelineDescription: "A chronological journey through our community events",
        aboutCreator: "About Creator",
        creatorDescription: "Community organizer and content creator dedicated to bringing neighbors together through memorable events and celebrations.",
        joinWhatsApp: "Join WhatsApp Group",
        loadMore: "Load More Videos",
        viewOnYouTube: "View on YouTube",
        viewPhotos: "View Photos",
        oldSite: "View Old Site",
        loading: "Loading...",
        home: "Home",
        videos: "Videos",
        photos: "Photos",
        timeline: "Timeline",
        about: "About",
        footerDescription: "Bringing our community together through memorable events and celebrations.",
        quickLinks: "Quick Links",
        connect: "Connect With Us",
        rightsReserved: "All rights reserved.",
        createdBy: "Created by"
    },
    hi: {
        siteName: "à¤¯à¥à¤¨à¤¿à¤à¤¾ à¤¹à¤¾à¤à¤¸à¤¿à¤à¤ à¤¸à¥à¤¸à¤¾à¤à¤à¥",
        welcome: "à¤¹à¤®à¤¾à¤°à¥ à¤¸à¤®à¥à¤¦à¤¾à¤¯ à¤®à¥à¤ à¤à¤ªà¤à¤¾ à¤¸à¥à¤µà¤¾à¤à¤¤ à¤¹à¥",
        heroDescription: "à¤¹à¤®à¤¾à¤°à¥ à¤¹à¤¾à¤à¤¸à¤¿à¤à¤ à¤¸à¥à¤¸à¤¾à¤à¤à¥ à¤à¥ à¤à¥à¤µà¤à¤¤ à¤à¤¤à¥à¤¸à¤µ à¤à¤° à¤¯à¤¾à¤¦à¤à¤¾à¤° à¤ªà¤²à¥à¤ à¤à¤¾ à¤à¤¨à¥à¤­à¤µ à¤à¤°à¥à¤",
        watchVideos: "à¤¨à¤µà¥à¤¨à¤¤à¤® à¤µà¥à¤¡à¤¿à¤¯à¥ à¤¦à¥à¤à¥à¤",
        browsePhotos: "à¤«à¥à¤à¥ à¤¬à¥à¤°à¤¾à¤à¤à¤¼ à¤à¤°à¥à¤",
        latestVideos: "à¤¨à¤µà¥à¤¨à¤¤à¤® à¤µà¥à¤¡à¤¿à¤¯à¥",
        videosDescription: "à¤¹à¤®à¤¾à¤°à¥ à¤¸à¤¾à¤®à¥à¤¦à¤¾à¤¯à¤¿à¤ à¤à¤¾à¤°à¥à¤¯à¤à¥à¤°à¤®à¥à¤ à¤à¤° à¤à¤¤à¥à¤¸à¤µà¥à¤ à¤à¥ à¤¹à¤¾à¤à¤²à¤¾à¤à¤à¥à¤¸ à¤¦à¥à¤à¥à¤",
        photoGalleries: "à¤«à¥à¤à¥ à¤à¥à¤²à¤°à¥",
        photosDescription: "à¤¹à¤®à¤¾à¤°à¥ à¤¯à¤¾à¤¦à¤à¤¾à¤° à¤ªà¤²à¥à¤ à¤à¥ à¤¸à¤à¤à¥à¤°à¤¹ à¤à¥ à¤¦à¥à¤à¥à¤",
        eventsTimeline: "à¤à¤¾à¤°à¥à¤¯à¤à¥à¤°à¤® à¤¸à¤®à¤¯à¤°à¥à¤à¤¾",
        timelineDescription: "à¤¹à¤®à¤¾à¤°à¥ à¤¸à¤¾à¤®à¥à¤¦à¤¾à¤¯à¤¿à¤ à¤à¤¾à¤°à¥à¤¯à¤à¥à¤°à¤®à¥à¤ à¤à¥ à¤à¤¾à¤²à¤¾à¤¨à¥à¤à¥à¤°à¤®à¤¿à¤ à¤¯à¤¾à¤¤à¥à¤°à¤¾",
        aboutCreator: "à¤¨à¤¿à¤°à¥à¤®à¤¾à¤¤à¤¾ à¤à¥ à¤¬à¤¾à¤°à¥ à¤®à¥à¤",
        creatorDescription: "à¤¸à¤®à¥à¤¦à¤¾à¤¯à¤¿à¤ à¤à¤¯à¥à¤à¤ à¤à¤° à¤¸à¤¾à¤®à¤à¥à¤°à¥ à¤¨à¤¿à¤°à¥à¤®à¤¾à¤¤à¤¾ à¤à¥ à¤¯à¤¾à¤¦à¤à¤¾à¤° à¤à¤¾à¤°à¥à¤¯à¤à¥à¤°à¤®à¥à¤ à¤à¤° à¤à¤¤à¥à¤¸à¤µà¥à¤ à¤à¥ à¤®à¤¾à¤§à¥à¤¯à¤® à¤¸à¥ à¤ªà¤¡à¤¼à¥à¤¸à¤¿à¤¯à¥à¤ à¤à¥ à¤à¤ à¤¸à¤¾à¤¥ à¤²à¤¾à¤¨à¥ à¤à¥ à¤²à¤¿à¤ à¤¸à¤®à¤°à¥à¤ªà¤¿à¤¤ à¤¹à¥à¥¤",
        joinWhatsApp: "WhatsApp à¤à¥à¤°à¥à¤ª à¤à¥à¤µà¤¾à¤à¤¨ à¤à¤°à¥à¤",
        loadMore: "à¤à¤§à¤¿à¤ à¤µà¥à¤¡à¤¿à¤¯à¥ à¤²à¥à¤¡ à¤à¤°à¥à¤",
        viewOnYouTube: "YouTube à¤ªà¤° à¤¦à¥à¤à¥à¤",
        viewPhotos: "à¤«à¥à¤à¥ à¤¦à¥à¤à¥à¤",
        oldSite: "à¤ªà¥à¤°à¤¾à¤¨à¥ à¤¸à¤¾à¤à¤ à¤¦à¥à¤à¥à¤",
        loading: "à¤²à¥à¤¡ à¤¹à¥ à¤°à¤¹à¤¾ à¤¹à¥...",
        home: "à¤¹à¥à¤®",
        videos: "à¤µà¥à¤¡à¤¿à¤¯à¥",
        photos: "à¤«à¥à¤à¥",
        timeline: "à¤¸à¤®à¤¯à¤°à¥à¤à¤¾",
        about: "à¤à¥ à¤¬à¤¾à¤°à¥ à¤®à¥à¤",
        footerDescription: "à¤¯à¤¾à¤¦à¤à¤¾à¤° à¤à¤¾à¤°à¥à¤¯à¤à¥à¤°à¤®à¥à¤ à¤à¤° à¤à¤¤à¥à¤¸à¤µà¥à¤ à¤à¥ à¤®à¤¾à¤§à¥à¤¯à¤® à¤¸à¥ à¤¹à¤®à¤¾à¤°à¥ à¤¸à¤®à¥à¤¦à¤¾à¤¯ à¤à¥ à¤à¤ à¤¸à¤¾à¤¥ à¤²à¤¾à¤¨à¤¾à¥¤",
        quickLinks: "à¤¤à¥à¤µà¤°à¤¿à¤¤ à¤²à¤¿à¤à¤",
        connect: "à¤¹à¤®à¤¸à¥ à¤à¥à¤¡à¤¼à¥à¤",
        rightsReserved: "à¤¸à¤­à¥ à¤à¤§à¤¿à¤à¤¾à¤° à¤¸à¥à¤°à¤à¥à¤·à¤¿à¤¤à¥¤",
        createdBy: "à¤¦à¥à¤µà¤¾à¤°à¤¾ à¤¨à¤¿à¤°à¥à¤®à¤¿à¤¤"
    },
    mr: {
        siteName: "à¤¯à¥à¤¨à¤¿à¤à¤¾ à¤¹à¤¾à¤à¤¸à¤¿à¤à¤ à¤¸à¥à¤¸à¤¾à¤¯à¤à¥",
        welcome: "à¤à¤®à¤à¥à¤¯à¤¾ à¤¸à¤®à¥à¤¦à¤¾à¤¯à¤¾à¤¤ à¤à¤ªà¤²à¥ à¤¸à¥à¤µà¤¾à¤à¤¤ à¤à¤¹à¥",
        heroDescription: "à¤à¤®à¤à¥à¤¯à¤¾ à¤¹à¤¾à¤à¤¸à¤¿à¤à¤ à¤¸à¥à¤¸à¤¾à¤¯à¤à¥à¤à¥à¤¯à¤¾ à¤¦à¥à¤²à¤¾à¤¯à¤®à¤¾à¤¨ à¤à¤¤à¥à¤¸à¤µ à¤à¤£à¤¿ à¤¸à¤à¤¸à¥à¤®à¤°à¤£à¥à¤¯ à¤à¥à¤·à¤£à¤¾à¤à¤à¤¾ à¤à¤¨à¥à¤­à¤µ à¤à¥à¤¯à¤¾",
        watchVideos: "à¤¨à¤µà¥à¤¨ à¤µà¥à¤¹à¤¿à¤¡à¤¿à¤ à¤ªà¤¹à¤¾",
        browsePhotos: "à¤«à¥à¤à¥ à¤ªà¤¹à¤¾",
        latestVideos: "à¤¨à¤µà¥à¤¨ à¤µà¥à¤¹à¤¿à¤¡à¤¿à¤",
        videosDescription: "à¤à¤®à¤à¥à¤¯à¤¾ à¤¸à¤®à¥à¤¦à¤¾à¤¯à¤¿à¤ à¤à¤¾à¤°à¥à¤¯à¤à¥à¤°à¤® à¤à¤£à¤¿ à¤à¤¤à¥à¤¸à¤µà¤¾à¤à¤à¥ à¤ à¤³à¤ à¤­à¤¾à¤ à¤ªà¤¹à¤¾",
        photoGalleries: "à¤«à¥à¤à¥ à¤à¥à¤²à¤°à¥",
        photosDescription: "à¤à¤®à¤à¥à¤¯à¤¾ à¤¸à¤à¤¸à¥à¤®à¤°à¤£à¥à¤¯ à¤à¥à¤·à¤£à¤¾à¤à¤à¥ à¤¸à¤à¤à¤²à¤¨ à¤ªà¤¹à¤¾",
        eventsTimeline: "à¤à¤¾à¤°à¥à¤¯à¤à¥à¤°à¤® à¤à¤¾à¤à¤®à¤²à¤¾à¤à¤¨",
        timelineDescription: "à¤à¤®à¤à¥à¤¯à¤¾ à¤¸à¤®à¥à¤¦à¤¾à¤¯à¤¿à¤ à¤à¤¾à¤°à¥à¤¯à¤à¥à¤°à¤®à¤¾à¤à¤à¥ à¤à¤¾à¤²à¤à¥à¤°à¤®à¤¾à¤¨à¥à¤¸à¤¾à¤° à¤ªà¥à¤°à¤µà¤¾à¤¸",
        aboutCreator: "à¤¨à¤¿à¤°à¥à¤®à¤¾à¤¤à¤¾ à¤¬à¤¦à¥à¤¦à¤²",
        creatorDescription: "à¤¸à¤®à¥à¤¦à¤¾à¤¯à¤¿à¤ à¤à¤¯à¥à¤à¤ à¤à¤£à¤¿ à¤¸à¤¾à¤®à¤à¥à¤°à¥ à¤¨à¤¿à¤°à¥à¤®à¤¾à¤¤à¤¾ à¤à¥ à¤¸à¤à¤¸à¥à¤®à¤°à¤£à¥à¤¯ à¤à¤¾à¤°à¥à¤¯à¤à¥à¤°à¤® à¤à¤£à¤¿ à¤à¤¤à¥à¤¸à¤µà¤¾à¤à¤¦à¥à¤µà¤¾à¤°à¥ à¤¶à¥à¤à¤¾à¤±à¥à¤¯à¤¾à¤à¤¨à¤¾ à¤à¤à¤¤à¥à¤° à¤à¤£à¤£à¥à¤¯à¤¾à¤¸à¤¾à¤ à¥ à¤¸à¤®à¤°à¥à¤ªà¤¿à¤¤ à¤à¤¹à¥à¥¤",
        joinWhatsApp: "WhatsApp à¤à¥à¤°à¥à¤ª à¤®à¤§à¥à¤¯à¥ à¤¸à¤¾à¤®à¥à¤² à¤µà¥à¤¹à¤¾",
        loadMore: "à¤à¤§à¤¿à¤ à¤µà¥à¤¹à¤¿à¤¡à¤¿à¤ à¤²à¥à¤¡ à¤à¤°à¤¾",
        viewOnYouTube: "YouTube à¤µà¤° à¤ªà¤¹à¤¾",
        viewPhotos: "à¤«à¥à¤à¥ à¤ªà¤¹à¤¾",
        oldSite: "à¤à¥à¤¨à¥ à¤¸à¤¾à¤à¤ à¤ªà¤¹à¤¾",
        loading: "à¤²à¥à¤¡ à¤¹à¥à¤¤ à¤à¤¹à¥...",
        home: "à¤¹à¥à¤®",
        videos: "à¤µà¥à¤¹à¤¿à¤¡à¤¿à¤",
        photos: "à¤«à¥à¤à¥",
        timeline: "à¤à¤¾à¤à¤®à¤²à¤¾à¤à¤¨",
        about: "à¤µà¤¿à¤·à¤¯à¥",
        footerDescription: "à¤¸à¤à¤¸à¥à¤®à¤°à¤£à¥à¤¯ à¤à¤¾à¤°à¥à¤¯à¤à¥à¤°à¤® à¤à¤£à¤¿ à¤à¤¤à¥à¤¸à¤µà¤¾à¤à¤¦à¥à¤µà¤¾à¤°à¥ à¤à¤®à¤à¥à¤¯à¤¾ à¤¸à¤®à¥à¤¦à¤¾à¤¯à¤¾à¤²à¤¾ à¤à¤à¤¤à¥à¤° à¤à¤£à¤£à¥à¥¤",
        quickLinks: "à¤à¤à¤ªà¤ à¤¦à¥à¤µà¥",
        connect: "à¤à¤®à¤à¥à¤¯à¤¾à¤¶à¥ à¤¸à¤à¤ªà¤°à¥à¤ à¤¸à¤¾à¤§à¤¾",
        rightsReserved: "à¤¸à¤°à¥à¤µ à¤¹à¤à¥à¤ à¤°à¤¾à¤à¥à¤µà¥¤",
        createdBy: "à¤¦à¥à¤µà¤¾à¤°à¥ à¤¤à¤¯à¤¾à¤° à¤à¥à¤²à¥"
    }
};

// Application data
const appData = {
    videos: [
        {
            title: "Day 9 Friday September 4 - All Performances",
            url: "https://youtu.be/m9C-BkvTY7Q",
            videoId: "m9C-BkvTY7Q",
            date: "2025-09-04",
            description: "Complete performances from Day 9 of our community events"
        },
        {
            title: "Day 8 Friday September 3 - Morning Aarti and Performance",
            url: "https://youtu.be/GmpDN48JYn4",
            videoId: "GmpDN48JYn4",
            date: "2025-09-03",
            description: "Morning aarti and cultural performances from Day 8"
        },
        {
            title: "Day 7 Purple Day - Morning Aarti and Housie Game Highlights",
            url: "https://youtu.be/I3_6kmCxVYQ",
            videoId: "I3_6kmCxVYQ",
            date: "2025-09-02",
            description: "Purple day celebrations with morning aarti and housie game"
        },
        {
            title: "Day 4 Evening Games",
            url: "https://youtu.be/AWtFzAvBAmU",
            videoId: "AWtFzAvBAmU",
            date: "2025-08-30",
            description: "Evening games and activities from Day 4"
        },
        {
            title: "August 27th 2025 Event",
            url: "https://youtu.be/F6tJ04NBbcU",
            videoId: "F6tJ04NBbcU",
            date: "2025-08-27",
            description: "Special community event on August 27th"
        },
        {
            title: "15th August 2025 Independence Day",
            url: "https://youtu.be/ABmNSpv51g8",
            videoId: "ABmNSpv51g8",
            date: "2025-08-15",
            description: "Independence Day celebrations"
        },
        {
            title: "Holi 14 March 2025",
            url: "https://youtu.be/TasomD1aKCQ",
            videoId: "TasomD1aKCQ",
            date: "2025-03-14",
            description: "Holi festival celebrations"
        },
        {
            title: "76th Republic Day",
            url: "https://youtu.be/ncIraPMjBr0",
            videoId: "ncIraPMjBr0",
            date: "2025-01-26",
            description: "Republic Day celebrations"
        }
    ],
    photoGalleries: [
        {
            title: "Main Gallery",
            url: "https://drive.google.com/drive/folders/1ljgJXLvvSlVB9KG-YqSOqpIWVeinVP2A",
            date: "2025-09-05",
            description: "Main collection of all photos and videos"
        },
        {
            title: "Day 7 Purple Day",
            url: "https://drive.google.com/drive/folders/1st4hpk_iJ1VNTeQp5s_ZG1D5BGtniO6q",
            date: "2025-09-02",
            description: "Purple day photo collection"
        },
        {
            title: "Day 6 Photos",
            url: "https://drive.google.com/drive/folders/1YfXrZqWIM_ev-TzL0tq_W2e4Ya5SeLBY",
            date: "2025-09-01",
            description: "Day 6 event photos"
        },
        {
            title: "Day 5 Photos",
            url: "https://drive.google.com/drive/folders/1bQN8zzngSZzC48pR-J_vGlZprHdk_84H",
            date: "2025-08-31",
            description: "Day 5 event photos"
        },
        {
            title: "Day 4 Photos",
            url: "https://drive.google.com/drive/folders/1ufckYtTnRJfywkrQ1li6kTL4VzpGUNlL",
            date: "2025-08-30",
            description: "Day 4 event photos"
        },
        {
            title: "15th August 2025 Independence Day Photos",
            url: "https://drive.google.com/drive/folders/1UW26hrSCCn5L_1rlDPcB2WFMOi5z9GOX",
            date: "2025-08-15",
            description: "Independence Day photo collection"
        },
        {
            title: "Holi 2025 Photos",
            url: "https://drive.google.com/drive/folders/1WiZiZNCOqSTAELzl47iblejYPz0yYRaz",
            date: "2025-03-14",
            description: "Holi festival photo collection"
        }
    ],
    timelineEvents: [
        {
            title: "Day 9 - Grand Finale Performances",
            date: "September 4, 2025",
            description: "The spectacular conclusion of our 9-day celebration featuring all community performances and cultural programs.",
            videoUrl: "https://youtu.be/m9C-BkvTY7Q",
            videoId: "m9C-BkvTY7Q",
            icon: "ð­",
            side: "right"
        },
        {
            title: "Day 8 - Morning Aarti & Cultural Show",
            date: "September 3, 2025", 
            description: "Sacred morning prayers followed by beautiful cultural performances by our talented residents.",
            videoUrl: "https://youtu.be/GmpDN48JYn4",
            videoId: "GmpDN48JYn4",
            icon: "ð",
            side: "left"
        },
        {
            title: "Day 7 - Purple Day Celebrations",
            date: "September 2, 2025",
            description: "Special purple-themed day with morning aarti and exciting housie game sessions for all ages.",
            videoUrl: "https://youtu.be/I3_6kmCxVYQ",
            videoId: "I3_6kmCxVYQ",
            icon: "ð",
            side: "right"
        },
        {
            title: "Day 4 - Evening Games Extravaganza",
            date: "August 30, 2025",
            description: "Fun-filled evening with community games, competitions, and entertainment for the whole family.",
            videoUrl: "https://youtu.be/AWtFzAvBAmU",
            videoId: "AWtFzAvBAmU",
            icon: "ð®",
            side: "left"
        },
        {
            title: "Special Community Gathering",
            date: "August 27, 2025",
            description: "A memorable community event bringing neighbors together with food, music, and celebration.",
            videoUrl: "https://youtu.be/F6tJ04NBbcU",
            videoId: "F6tJ04NBbcU",
            icon: "ðª",
            side: "right"
        },
        {
            title: "Independence Day Celebration",
            date: "August 15, 2025",
            description: "Patriotic celebration with flag hoisting, cultural programs, and community spirit.",
            videoUrl: "https://youtu.be/ABmNSpv51g8",
            videoId: "ABmNSpv51g8",
            icon: "ð®ð³",
            side: "left"
        },
        {
            title: "Holi - Festival of Colors",
            date: "March 14, 2025",
            description: "Joyous Holi celebration with colors, music, dance, and traditional festivities.",
            videoUrl: "https://youtu.be/TasomD1aKCQ",
            videoId: "TasomD1aKCQ",
            icon: "ð",
            side: "right"
        },
        {
            title: "76th Republic Day",
            date: "January 26, 2025",
            description: "Celebrating India's Republic Day with pride, patriotic songs, and community unity.",
            videoUrl: "https://youtu.be/ncIraPMjBr0",
            videoId: "ncIraPMjBr0",
            icon: "ðï¸",
            side: "left"
        }
    ]
};

// Utility functions
const utils = {
    formatDate: (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    },

    extractVideoId: (url) => {
        const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/;
        const match = url.match(regex);
        return match ? match[1] : null;
    },

    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// Language management
const languageManager = {
    init() {
        // Set default language from localStorage or default to 'en'
        const savedLanguage = localStorage?.getItem('selectedLanguage') || 'en';
        this.setLanguage(savedLanguage);
        this.bindEvents();
    },

    bindEvents() {
        const languageSelect = document.getElementById('language-select');
        if (languageSelect) {
            languageSelect.addEventListener('click', (e) => {
                e.stopPropagation();
            });

            languageSelect.addEventListener('change', (e) => {
                e.stopPropagation();
                this.setLanguage(e.target.value);
            });
        }
    },

    setLanguage(langCode) {
        appState.currentLanguage = langCode;
        
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('selectedLanguage', langCode);
        }
        
        const languageSelect = document.getElementById('language-select');
        if (languageSelect) {
            languageSelect.value = langCode;
        }

        this.updateContent();
    },

    updateContent() {
        const elements = document.querySelectorAll('[data-lang]');
        const currentTranslations = translations[appState.currentLanguage] || translations.en;

        elements.forEach(element => {
            const key = element.getAttribute('data-lang');
            if (currentTranslations[key]) {
                element.textContent = currentTranslations[key];
            }
        });

        document.documentElement.lang = appState.currentLanguage;

        const loadMoreBtn = document.getElementById('load-more-videos');
        if (loadMoreBtn && !appState.isLoading) {
            loadMoreBtn.textContent = currentTranslations.loadMore || 'Load More Videos';
        }
    }
};

// Sticky Header Manager
const stickyHeaderManager = {
    init() {
        this.header = document.querySelector('.header');
        this.scrollThreshold = 100;
        this.lastScrollTop = 0;
        
        if (this.header) {
            this.bindEvents();
        }
    },

    bindEvents() {
        const handleScroll = utils.throttle(() => {
            this.handleScroll();
        }, 10);

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', utils.debounce(() => {
            this.handleResize();
        }, 250));
    },

    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollDirection = scrollTop > this.lastScrollTop ? 'down' : 'up';
        
        // Add scrolled class for backdrop blur effect
        if (scrollTop > this.scrollThreshold) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }

        // Auto-hide header on scroll down, show on scroll up
        if (scrollTop > this.scrollThreshold * 2) {
            if (scrollDirection === 'down' && scrollTop > this.lastScrollTop + 10) {
                this.header.style.transform = 'translateY(-100%)';
            } else if (scrollDirection === 'up' && scrollTop < this.lastScrollTop - 10) {
                this.header.style.transform = 'translateY(0)';
            }
        } else {
            this.header.style.transform = 'translateY(0)';
        }

        this.lastScrollTop = scrollTop;
    },

    handleResize() {
        // Reset header position on resize
        this.header.style.transform = 'translateY(0)';
    }
};

// Video manager
const videoManager = {
    init() {
        this.loadVideos();
        this.bindEvents();
        this.setupModal();
    },

    bindEvents() {
        const loadMoreBtn = document.getElementById('load-more-videos');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.loadMoreVideos();
            });
        }
    },

    setupModal() {
        const modal = document.getElementById('video-modal');
        const modalOverlay = document.getElementById('modal-overlay');
        const modalClose = document.getElementById('modal-close');

        if (modalClose) {
            modalClose.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.closeVideoModal();
            });
        }

        if (modalOverlay) {
            modalOverlay.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.closeVideoModal();
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
                this.closeVideoModal();
            }
        });
    },

    loadVideos() {
        const videosGrid = document.getElementById('videos-grid');
        if (!videosGrid) return;

        const videosToShow = appData.videos.slice(0, appState.videosLoaded + appState.videosPerPage);
        
        if (appState.videosLoaded === 0) {
            videosGrid.innerHTML = '';
        }

        const newVideos = appData.videos.slice(appState.videosLoaded, appState.videosLoaded + appState.videosPerPage);
        
        newVideos.forEach((video, index) => {
            const videoCard = this.createVideoCard(video);
            videosGrid.appendChild(videoCard);

            setTimeout(() => {
                videoCard.style.opacity = '1';
                videoCard.style.transform = 'translateY(0)';
            }, index * 100);
        });

        appState.videosLoaded = videosToShow.length;

        const loadMoreBtn = document.getElementById('load-more-videos');
        if (loadMoreBtn) {
            if (appState.videosLoaded >= appData.videos.length) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'block';
            }
        }
    },

    createVideoCard(video) {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        card.style.cursor = 'pointer';

        const thumbnailUrl = `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`;
        
        card.innerHTML = `
            <div class="video-thumbnail">
                <img src="${thumbnailUrl}" alt="${video.title}" loading="lazy">
                <button class="video-play-btn" aria-label="Play Video">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                    </svg>
                </button>
            </div>
            <div class="video-card-info">
                <h3>${video.title}</h3>
                <p>${video.description}</p>
                <div class="video-date">${utils.formatDate(video.date)}</div>
            </div>
        `;

        card.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.openVideoModal(video.videoId, video.title);
        });

        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.openVideoModal(video.videoId, video.title);
            }
        });

        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Play video: ${video.title}`);

        return card;
    },

    loadMoreVideos() {
        if (appState.isLoading || appState.videosLoaded >= appData.videos.length) return;
        
        appState.isLoading = true;
        const loadMoreBtn = document.getElementById('load-more-videos');
        const currentTranslations = translations[appState.currentLanguage] || translations.en;
        
        if (loadMoreBtn) {
            loadMoreBtn.textContent = currentTranslations.loading || 'Loading...';
            loadMoreBtn.disabled = true;
        }

        setTimeout(() => {
            this.loadVideos();
            appState.isLoading = false;
            if (loadMoreBtn) {
                loadMoreBtn.textContent = currentTranslations.loadMore || 'Load More Videos';
                loadMoreBtn.disabled = false;
            }
        }, 800);
    },

    openVideoModal(videoId, title) {
        const modal = document.getElementById('video-modal');
        const iframe = document.getElementById('video-iframe');
        
        if (modal && iframe) {
            const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
            
            iframe.src = embedUrl;
            iframe.title = title;
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            
            modal.focus();
        }
    },

    closeVideoModal() {
        const modal = document.getElementById('video-modal');
        const iframe = document.getElementById('video-iframe');
        
        if (modal && iframe) {
            modal.classList.add('hidden');
            iframe.src = '';
            document.body.style.overflow = '';
        }
    }
};

// Gallery manager
const galleryManager = {
    init() {
        this.loadGalleries();
    },

    loadGalleries() {
        const galleriesGrid = document.getElementById('galleries-grid');
        if (!galleriesGrid) return;

        appData.photoGalleries.forEach((gallery, index) => {
            const galleryCard = this.createGalleryCard(gallery);
            galleriesGrid.appendChild(galleryCard);

            setTimeout(() => {
                galleryCard.style.opacity = '1';
                galleryCard.style.transform = 'translateY(0)';
            }, index * 100);
        });
    },

    createGalleryCard(gallery) {
        const card = document.createElement('div');
        card.className = 'gallery-card';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';

        card.innerHTML = `
            <div class="gallery-thumbnail">
                <span>ð¸</span>
            </div>
            <div class="gallery-card-info">
                <h3>${gallery.title}</h3>
                <p>${gallery.description}</p>
                <a href="${gallery.url}" target="_blank" rel="noopener noreferrer" class="gallery-action">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15,3 21,3 21,9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                    View Photos
                </a>
                <div class="video-date">${utils.formatDate(gallery.date)}</div>
            </div>
        `;

        card.addEventListener('click', (e) => {
            if (!e.target.closest('.gallery-action')) {
                window.open(gallery.url, '_blank', 'noopener,noreferrer');
            }
        });

        return card;
    }
};

// Rich Interactive Timeline Manager
const timelineManager = {
    init() {
        this.generateTimeline();
        this.setupScrollAnimations();
    },

    generateTimeline() {
        const timeline = document.getElementById('timeline');
        if (!timeline) return;

        // Use the pre-defined timeline events with rich details
        appData.timelineEvents.forEach((event, index) => {
            const timelineItem = this.createTimelineItem(event, index);
            timeline.appendChild(timelineItem);
        });
    },

    createTimelineItem(event, index) {
        const item = document.createElement('div');
        item.className = `timeline-item ${event.side}`;
        item.setAttribute('data-index', index);

        // Create timeline icon
        const icon = document.createElement('div');
        icon.className = 'timeline-icon';
        icon.textContent = event.icon;

        item.innerHTML = `
            <div class="timeline-card">
                <div class="timeline-date">${event.date}</div>
                <h3 class="timeline-title">${event.title}</h3>
                <p class="timeline-description">${event.description}</p>
                <div class="timeline-links">
                    <button class="timeline-link video-link" data-video-id="${event.videoId}">
                        ð¥ Watch Video
                    </button>
                </div>
            </div>
        `;

        // Add the icon
        item.appendChild(icon);

        // Add click handler for video links
        const videoLink = item.querySelector('.video-link');
        if (videoLink) {
            videoLink.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const videoId = videoLink.getAttribute('data-video-id');
                videoManager.openVideoModal(videoId, event.title);
            });
        }

        return item;
    },

    setupScrollAnimations() {
        if (!('IntersectionObserver' in window)) {
            // Fallback for older browsers - show all items
            const timelineItems = document.querySelectorAll('.timeline-item');
            timelineItems.forEach(item => {
                item.classList.add('animate-in');
            });
            return;
        }

        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -10% 0px'
        };

        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const item = entry.target;
                    const index = parseInt(item.getAttribute('data-index'));
                    
                    // Add staggered animation delay
                    setTimeout(() => {
                        item.classList.add('animate-in');
                    }, index * 200);

                    // Stop observing once animated
                    timelineObserver.unobserve(item);
                }
            });
        }, observerOptions);

        // Observe all timeline items
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            timelineObserver.observe(item);
        });
    }
};

// Navigation manager
const navigationManager = {
    init() {
        this.bindEvents();
        this.handleSmoothScrolling();
    },

    bindEvents() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const navMenu = document.getElementById('nav-menu');

        if (mobileMenuBtn && navMenu) {
            mobileMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                mobileMenuBtn.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            document.addEventListener('click', (e) => {
                if (!mobileMenuBtn.contains(e.target) && !navMenu.contains(e.target)) {
                    mobileMenuBtn.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        }

        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mobileMenuBtn && navMenu) {
                    mobileMenuBtn.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });
    },

    handleSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
};

// Lazy loading manager
const lazyLoadManager = {
    init() {
        if ('IntersectionObserver' in window) {
            this.createObserver();
        } else {
            this.loadAllImages();
        }
    },

    createObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            observer.observe(img);
        });
    },

    loadAllImages() {
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.dataset.src;
            img.classList.add('loaded');
        });
    }
};

// App initialization
const app = {
    init() {
        this.showLoadingScreen();

        // Initialize all managers
        languageManager.init();
        navigationManager.init();
        stickyHeaderManager.init();
        
        setTimeout(() => {
            videoManager.init();
            galleryManager.init();
            timelineManager.init();
            lazyLoadManager.init();
            
            this.hideLoadingScreen();
            this.initFeaturedVideo();
            this.initPerformanceOptimizations();
        }, 1200);
    },

    showLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.remove('hidden');
        }
    },

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                if (loadingScreen) {
                    loadingScreen.style.display = 'none';
                }
            }, 500);
        }
    },

    initFeaturedVideo() {
        const featuredVideo = document.querySelector('.featured-video .video-container');
        if (featuredVideo) {
            const videoId = featuredVideo.dataset.videoId;
            
            if (videoId) {
                featuredVideo.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    videoManager.openVideoModal(videoId, 'Day 9 - All Performances');
                });

                featuredVideo.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        videoManager.openVideoModal(videoId, 'Day 9 - All Performances');
                    }
                });

                featuredVideo.setAttribute('tabindex', '0');
                featuredVideo.setAttribute('role', 'button');
                featuredVideo.setAttribute('aria-label', 'Play featured video');
                featuredVideo.style.cursor = 'pointer';
            }
        }
    },

    initPerformanceOptimizations() {
        // Optimize images with fade-in
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', () => {
                    img.classList.add('loaded');
                });
            }
        });

        // Preload critical resources
        this.preloadCriticalResources();
    },

    preloadCriticalResources() {
        // Preload hero video thumbnail
        const heroImg = new Image();
        heroImg.src = 'https://img.youtube.com/vi/m9C-BkvTY7Q/maxresdefault.jpg';
        
        // Preload first few video thumbnails
        appData.videos.slice(0, 3).forEach(video => {
            const img = new Image();
            img.src = `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`;
        });
    }
};

// Error handling
window.addEventListener('error', (event) => {
    console.error('Application error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
});

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`App loaded in ${loadTime.toFixed(2)}ms`);
    
    // Report Core Web Vitals if available
    if ('web-vitals' in window) {
        getCLS(console.log);
        getFID(console.log);
        getFCP(console.log);
        getLCP(console.log);
        getTTFB(console.log);
    }
});

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => app.init());
} else {
    app.init();
}