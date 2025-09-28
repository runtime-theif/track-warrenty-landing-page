// TrackWarranty Invite Handler
// Handles referral links, platform detection, and smart redirects

class InviteHandler {
    constructor() {
        this.inviteCode = null;
        this.referrerName = null;
        this.utmParams = {};
        this.platform = null;
        this.appStoreLinks = {
            ios: 'https://apps.apple.com/app/trackwarranty',
            android: 'https://play.google.com/store/apps/details?id=app.trackwarranty'
        };
        this.deepLinkScheme = 'trackwarranty://';
        
        this.init();
    }
    
    init() {
        this.parseUrl();
        this.detectPlatform();
        this.updateUI();
        this.setupEventHandlers();
        this.attemptAppOpen();
    }
    
    parseUrl() {
        const urlPath = window.location.pathname;
        const urlParams = new URLSearchParams(window.location.search);
        
        // Extract invite code from URL path (/invite/CODE) or query param
        const pathMatch = urlPath.match(/\/invite\/([A-Z0-9]+)/i);
        if (pathMatch) {
            this.inviteCode = pathMatch[1];
        } else {
            this.inviteCode = urlParams.get('code') || urlParams.get('invite') || 'WELCOME';
        }
        
        // Extract referrer info
        this.referrerName = urlParams.get('ref') || urlParams.get('referrer');
        
        // Extract UTM parameters for analytics
        this.utmParams = {
            source: urlParams.get('utm_source'),
            medium: urlParams.get('utm_medium'),
            campaign: urlParams.get('utm_campaign'),
            content: urlParams.get('utm_content'),
            term: urlParams.get('utm_term')
        };
        
        // Store referral data in localStorage for tracking
        const referralData = {
            inviteCode: this.inviteCode,
            referrerName: this.referrerName,
            utmParams: this.utmParams,
            timestamp: Date.now(),
            landingUrl: window.location.href
        };
        
        localStorage.setItem('trackwarranty_referral', JSON.stringify(referralData));
        
        console.log('📋 Parsed referral data:', referralData);
    }
    
    detectPlatform() {
        const userAgent = navigator.userAgent;
        const platform = navigator.platform;
        
        // iOS Detection
        if (/iPad|iPhone|iPod/.test(userAgent) || 
            (platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
            this.platform = 'ios';
        }
        // Android Detection
        else if (/Android/.test(userAgent)) {
            this.platform = 'android';
        }
        // Desktop/Other
        else {
            this.platform = 'desktop';
        }
        
        console.log('📱 Detected platform:', this.platform);
    }
    
    updateUI() {
        // Update invite code display
        const inviteCodeElement = document.getElementById('inviteCode');
        const inviteCodeDisplay = document.getElementById('inviteCodeDisplay');
        
        if (inviteCodeElement && this.inviteCode) {
            inviteCodeElement.textContent = this.inviteCode;
            inviteCodeDisplay.style.display = 'block';
        }
        
        // Update referrer info
        if (this.referrerName) {
            const referrerInfo = document.getElementById('referrerInfo');
            const referrerName = document.getElementById('referrerName');
            const referrerAvatar = document.getElementById('referrerAvatar');
            
            if (referrerInfo && referrerName) {
                referrerName.textContent = `${this.referrerName} invited you`;
                referrerAvatar.textContent = this.referrerName.charAt(0).toUpperCase();
                referrerInfo.style.display = 'block';
            }
        }
        
        // Update download buttons based on platform
        this.updateDownloadButtons();
        
        // Update detection status
        const detectionStatus = document.getElementById('detectionStatus');
        if (detectionStatus) {
            const platformNames = {
                ios: 'iOS device detected - Preparing App Store link',
                android: 'Android device detected - Preparing Play Store link',
                desktop: 'Desktop detected - Showing all download options'
            };
            detectionStatus.textContent = platformNames[this.platform] || 'Preparing download options';
        }
    }
    
    updateDownloadButtons() {
        const downloadButtons = document.getElementById('downloadButtons');
        const loadingSpinner = document.getElementById('loadingSpinner');
        
        if (!downloadButtons) return;
        
        // Show loading initially
        loadingSpinner.style.display = 'block';
        
        setTimeout(() => {
            loadingSpinner.style.display = 'none';
            
            if (this.platform === 'ios') {
                downloadButtons.innerHTML = this.getIOSDownloadButton();
            } else if (this.platform === 'android') {
                downloadButtons.innerHTML = this.getAndroidDownloadButton();
            } else {
                downloadButtons.innerHTML = this.getAllDownloadButtons();
            }
        }, 1000);
    }
    
    getIOSDownloadButton() {
        return `
            <div class="download-btn-inactive">
                <img src="app-store.svg" alt="Coming Soon on App Store" class="store-badge-native disabled">
                <div class="download-status-badge inactive">Coming Soon</div>
            </div>
        `;
    }
    
    getAndroidDownloadButton() {
        const playStoreUrl = this.buildAppStoreUrl('android');
        return `
            <a href="${playStoreUrl}" class="download-btn-active" onclick="trackDownload('android')">
                <img src="playstore.svg" alt="Get it on Google Play" class="store-badge-native">
                <div class="download-status-badge active">Available Now</div>
            </a>
        `;
    }
    
    getAllDownloadButtons() {
        const androidUrl = this.buildAppStoreUrl('android');
        
        return `
            <a href="${androidUrl}" class="download-btn-active" onclick="trackDownload('android')">
                <img src="playstore.svg" alt="Get it on Google Play" class="store-badge-native">
                <div class="download-status-badge active">Available Now</div>
            </a>
            <div class="download-btn-inactive">
                <img src="app-store.svg" alt="Coming Soon on App Store" class="store-badge-native disabled">
                <div class="download-status-badge inactive">Coming Soon</div>
            </div>
        `;
    }
    
    buildAppStoreUrl(platform) {
        const baseUrl = this.appStoreLinks[platform];
        const params = new URLSearchParams();
        
        if (platform === 'ios') {
            // iOS App Store with custom parameters
            if (this.inviteCode) {
                params.append('code', this.inviteCode);
            }
            if (this.referrerName) {
                params.append('ref', this.referrerName);
            }
            return `${baseUrl}?${params.toString()}`;
        } else if (platform === 'android') {
            // Android Play Store with referrer data
            const referrerData = {
                utm_source: this.utmParams.source || 'referral',
                utm_medium: 'invite_link',
                utm_campaign: 'referral_program',
                utm_content: this.inviteCode,
                invite_code: this.inviteCode,
                referrer_name: this.referrerName
            };
            
            const referrerString = new URLSearchParams(referrerData).toString();
            return `${baseUrl}&referrer=${encodeURIComponent(referrerString)}`;
        }
        
        return baseUrl;
    }
    
    attemptAppOpen() {
        // Only attempt app opening on mobile platforms
        if (this.platform === 'desktop') return;
        
        // Attempt to open the app with deep link
        const deepLink = this.buildDeepLink();
        console.log('🔗 Attempting deep link:', deepLink);
        
        // Create hidden iframe to attempt app opening
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = deepLink;
        document.body.appendChild(iframe);
        
        // Remove iframe after attempt
        setTimeout(() => {
            document.body.removeChild(iframe);
        }, 1000);
        
        // If app doesn't open in 2.5 seconds, we assume it's not installed
        setTimeout(() => {
            console.log('📱 App not detected, user will use store links');
        }, 2500);
    }
    
    buildDeepLink() {
        const params = new URLSearchParams();
        if (this.inviteCode) params.append('code', this.inviteCode);
        if (this.referrerName) params.append('ref', this.referrerName);
        
        return `${this.deepLinkScheme}invite?${params.toString()}`;
    }
    
    setupEventHandlers() {
        // Track page view
        this.trackEvent('invite_page_view', {
            invite_code: this.inviteCode,
            referrer_name: this.referrerName,
            platform: this.platform,
            utm_source: this.utmParams.source
        });
        
        // Handle visibility change (user switched tabs/apps)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.trackEvent('page_hidden', { 
                    invite_code: this.inviteCode,
                    platform: this.platform 
                });
            }
        });
        
        // Track clicks on download buttons
        window.trackDownload = (platform) => {
            this.trackEvent('download_clicked', {
                invite_code: this.inviteCode,
                platform: platform,
                referrer_name: this.referrerName,
                utm_source: this.utmParams.source
            });
            
            console.log(`📥 Download tracked for ${platform}`);
        };
    }
    
    trackEvent(eventName, properties = {}) {
        // Store analytics data for later reporting
        const analyticsData = {
            event: eventName,
            properties: {
                ...properties,
                timestamp: Date.now(),
                user_agent: navigator.userAgent,
                referrer: document.referrer,
                url: window.location.href
            }
        };
        
        // Store in localStorage for now (in production, send to analytics service)
        const existingAnalytics = JSON.parse(localStorage.getItem('trackwarranty_analytics') || '[]');
        existingAnalytics.push(analyticsData);
        localStorage.setItem('trackwarranty_analytics', JSON.stringify(existingAnalytics));
        
        console.log('📊 Event tracked:', analyticsData);
        
        // TODO: Send to actual analytics service in production
        // sendToAnalytics(analyticsData);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🛡️ TrackWarranty Invite Handler starting...');
    new InviteHandler();
});

// GitHub Pages compatible URL handling
function handleSpecialUrls() {
    const path = window.location.pathname;
    const search = window.location.search;
    
    console.log('🔗 Handling URL - Path:', path, 'Search:', search);
    
    // For GitHub Pages, /invite/CODE URLs will be handled by 404.html
    // This function handles any remaining edge cases
    
    // If we're on invite.html but have a path-based code, extract it
    if (path === '/invite.html') {
        const urlParams = new URLSearchParams(search);
        const pathCode = urlParams.get('path_code');
        
        if (pathCode && !urlParams.get('code')) {
            urlParams.set('code', pathCode);
            urlParams.delete('path_code');
            
            const newUrl = `${path}?${urlParams.toString()}`;
            console.log('🔄 Cleaning up URL to:', newUrl);
            window.history.replaceState({}, '', newUrl);
        }
    }
}

// Run URL handling
handleSpecialUrls();

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InviteHandler;
}
