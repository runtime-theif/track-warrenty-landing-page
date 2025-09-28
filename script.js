// TrackWarranty - Premium Website Interactions
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    setupHeroInteractions();
    setupSolutionDemo();
    setupFormHandlers();
    setupAnimations();
    setupReferralTracking();
    setupAdvancedAnalytics();
}

// Navigation
function setupNavigation() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
        
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Hero interactions
function setupHeroInteractions() {
    const ctaButtons = document.querySelectorAll('.hero-cta .btn');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Solution demo
function setupSolutionDemo() {
    const demoSteps = document.querySelectorAll('.demo-step');
    const demoScreens = document.querySelectorAll('.demo-screen');
    let currentStep = 1;
    
    function advanceDemo() {
        demoSteps.forEach(step => step.classList.remove('active'));
        demoScreens.forEach(screen => screen.classList.add('hidden'));
        
        const activeStep = document.querySelector(`[data-step="${currentStep}"]`);
        const activeScreen = document.querySelector(`[data-screen="${currentStep}"]`);
        
        if (activeStep && activeScreen) {
            activeStep.classList.add('active');
            activeScreen.classList.remove('hidden');
        }
        
        currentStep = currentStep >= 4 ? 1 : currentStep + 1;
    }
    
    demoSteps.forEach((step, index) => {
        step.addEventListener('click', function() {
            currentStep = index + 1;
            advanceDemo();
        });
    });
    
    if (demoSteps.length > 0) {
        setInterval(advanceDemo, 4000);
    }
}

// Form handlers
function setupFormHandlers() {
    const signupForms = document.querySelectorAll('.signup-form, .modal-form');
    signupForms.forEach(form => {
        form.addEventListener('submit', handleEarlyAccess);
    });
    
    const contactForms = document.querySelectorAll('.contact-form');
    contactForms.forEach(form => {
        form.addEventListener('submit', handleB2BContact);
    });
}

function handleEarlyAccess(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const submitButton = form.querySelector('button[type="submit"]');
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<span>Joining...</span>';
    submitButton.disabled = true;
    
    setTimeout(() => {
        submitButton.innerHTML = '<span>✅ You\'re In!</span>';
        submitButton.style.background = '#10b981';
        showSuccessModal(email);
        
        setTimeout(() => {
            form.reset();
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            submitButton.style.background = '';
        }, 3000);
    }, 1500);
}

function handleB2BContact(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    
    submitButton.innerHTML = '<span>Sending...</span>';
    submitButton.disabled = true;
    
    setTimeout(() => {
        form.innerHTML = `
            <div class="form-success" style="text-align: center; padding: 2rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">✅</div>
                <h3 style="margin-bottom: 1rem;">Demo Request Received!</h3>
                <p style="margin-bottom: 1.5rem;">
                    Our enterprise team will contact you within 24 hours.
                </p>
                <div style="background: #f3f4f6; padding: 1.5rem; border-radius: 1rem; text-align: left;">
                    <p style="font-weight: 600; margin-bottom: 1rem;">Next Steps:</p>
                    <ul style="line-height: 1.6;">
                        <li>✅ Calendar link to choose your time</li>
                        <li>✅ Pre-demo questionnaire</li>
                        <li>✅ Custom ROI analysis</li>
                    </ul>
                </div>
            </div>
        `;
    }, 1500);
}

function handleEnterpriseInquiry(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Get form data
    const companyName = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const industry = form.querySelector('select').value;
    const useCase = form.querySelector('textarea').value;

    // Format WhatsApp message
    const message = `
*New Partnership Inquiry*
------------------------
*Company:* ${companyName}
*Email:* ${email}
*Industry:* ${industry}
*Use Case:*
${useCase}
------------------------
From TrackWarranty Website
    `.trim();

    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/916207466460?text=${encodedMessage}`;

    // Update button state
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<span>Sending...</span>';
    submitButton.disabled = true;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    setTimeout(() => {
        form.innerHTML = `
            <div class="form-success" style="text-align: center; padding: 2rem; color: white;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🤝</div>
                <h3 style="margin-bottom: 1rem; color: white;">Partnership Inquiry Sent!</h3>
                <p style="margin-bottom: 1.5rem; color: rgba(255,255,255,0.9);">
                    Thank you for your interest in partnering with TrackWarranty.
                    We'll be in touch via WhatsApp shortly to discuss opportunities.
                </p>
                <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 1rem; text-align: left;">
                    <p style="font-weight: 600; margin-bottom: 1rem; color: white;">What's Next:</p>
                    <ul style="line-height: 1.6; color: rgba(255,255,255,0.9);">
                        <li>✅ Check WhatsApp for our message</li>
                        <li>✅ Custom partnership proposal preparation</li>
                        <li>✅ Schedule consultation call within 48 hours</li>
                    </ul>
                </div>
            </div>
        `;
    }, 1500);
}

// Animations
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const animateElements = document.querySelectorAll('.story-card, .testimonial-card, .solution-card');
    animateElements.forEach(el => observer.observe(el));
    
    // Counter animations
    const statNumbers = document.querySelectorAll('.stat-number, .result-metric');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => statsObserver.observe(stat));
}

function animateCounter(element) {
    const text = element.textContent;
    const number = parseFloat(text.replace(/[^\d.]/g, ''));
    
    if (isNaN(number)) return;
    
    const duration = 2000;
    const steps = 60;
    const stepValue = number / steps;
    let currentValue = 0;
    
    const counter = setInterval(() => {
        currentValue += stepValue;
        
        if (currentValue >= number) {
            element.textContent = text;
            clearInterval(counter);
        } else {
            let formattedValue;
            if (text.includes('Cr')) {
                formattedValue = (currentValue).toFixed(1) + 'Cr+';
            } else if (text.includes('K')) {
                formattedValue = Math.floor(currentValue) + 'K+';
            } else if (text.includes('L')) {
                formattedValue = '₹' + (currentValue).toFixed(1) + 'L+';
            } else if (text.includes('%')) {
                formattedValue = Math.floor(currentValue) + '%';
            } else {
                formattedValue = Math.floor(currentValue);
            }
            
            element.textContent = formattedValue;
        }
    }, duration / steps);
}

// Modal functions
function showEarlyAccess() {
    const modal = document.getElementById('early-access-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function showPartnershipModal() {
    const modal = document.getElementById('partnership-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

function showSuccessModal(email) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Welcome to TrackWarranty Beta! 🎉</h3>
                <button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body" style="text-align: center;">
                <div style="font-size: 4rem; margin-bottom: 1.5rem;">🛡️</div>
                <h4 style="margin-bottom: 1rem;">You're officially in!</h4>
                <p style="margin-bottom: 2rem;">
                    Confirmation sent to <strong>${email}</strong>
                </p>
                <div style="background: #eef2ff; padding: 1.5rem; border-radius: 1rem; margin-bottom: 2rem;">
                    <h5 style="color: #4f46e5; margin-bottom: 1rem;">What happens next?</h5>
                    <ul style="text-align: left; line-height: 1.6;">
                        <li>📧 Launch updates via email</li>
                        <li>📱 First access when apps go live</li>
                        <li>💬 Beta community invitation</li>
                        <li>🎁 Free lifetime account (worth ₹999)</li>
                    </ul>
                </div>
                <button class="btn btn-primary" onclick="this.closest('.modal').remove()" style="width: 100%;">
                    Awesome, Thanks!
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        if (document.body.contains(modal)) {
            modal.remove();
            document.body.style.overflow = '';
        }
    }, 10000);
}

// Utility functions
function scrollToDemo() {
    const section = document.getElementById('solution');
    if (section) {
        window.scrollTo({
            top: section.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}

function scrollToSolutions() {
    const section = document.getElementById('solutions');
    if (section) {
        window.scrollTo({
            top: section.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'error' ? '#ef4444' : '#10b981'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 15px rgba(0,0,0,0.1);
        z-index: 10001;
        font-weight: 600;
        max-width: 300px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span>${type === 'error' ? '❌' : '✅'}</span>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.style.transform = 'translateX(0)', 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// WhatsApp Integration Functions
function openWhatsAppChat() {
    const message = "Hi! I'm interested in discussing partnership opportunities with TrackWarranty. Could you please share more information about your API integration and white-label solutions?";
    const phoneNumber = "1234567890"; // Replace with your actual WhatsApp business number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    
    // Track WhatsApp click
    console.log('WhatsApp chat opened for partnership inquiry');
}

function sendFormToWhatsApp() {
    const form = document.getElementById('enterpriseForm');
    const formData = new FormData(form);
    
    // Validate form first
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    // Create WhatsApp message from form data
    const name = formData.get('name');
    const email = formData.get('email');
    const company = formData.get('company');
    const industry = formData.get('industry');
    const message = formData.get('message');
    
    const whatsappMessage = `
🤝 *Partnership Inquiry - TrackWarranty*

👤 *Name:* ${name}
🏢 *Company:* ${company}
📧 *Email:* ${email}
🏭 *Industry:* ${industry}

💬 *Partnership Goals:*
${message}

---
Sent via TrackWarranty Partnership Form
    `.trim();
    
    const phoneNumber = "1234567890"; // Replace with your actual WhatsApp business number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappUrl, '_blank');
    
    // Show success message
    showNotification('Opening WhatsApp with your partnership inquiry...', 'success');
    
    // Track form submission
    console.log('Partnership inquiry sent via WhatsApp:', {
        company: company,
        industry: industry,
        method: 'whatsapp'
    });
}

function validateForm() {
    const form = document.getElementById('enterpriseForm');
    const inputs = form.querySelectorAll('[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        const errorElement = document.getElementById(input.name + 'Error');
        
        if (!input.value.trim()) {
            if (errorElement) {
                errorElement.classList.add('show');
            }
            input.style.borderColor = '#f87171';
            isValid = false;
        } else {
            if (errorElement) {
                errorElement.classList.remove('show');
            }
            input.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        }
        
        // Email validation
        if (input.type === 'email' && input.value) {
            if (!isValidEmail(input.value)) {
                if (errorElement) {
                    errorElement.textContent = 'Please enter a valid email address';
                    errorElement.classList.add('show');
                }
                input.style.borderColor = '#f87171';
                isValid = false;
            }
        }
    });
    
    return isValid;
}

// Referral tracking and smart download links
function setupReferralTracking() {
    // Check for existing referral data
    const referralData = getReferralData();
    
    // Update all download links with referral parameters
    updateDownloadLinks(referralData);
    
    // Track page view with referral context
    trackPageView(referralData);
    
    // Setup download click tracking
    setupDownloadTracking();
    
    // Show referral badge if applicable
    showReferralBadge(referralData);
}

function getReferralData() {
    const urlParams = new URLSearchParams(window.location.search);
    const storedReferral = localStorage.getItem('trackwarranty_referral');
    
    // Priority: URL params > stored data > default
    const referralData = {
        inviteCode: urlParams.get('code') || urlParams.get('invite'),
        referrerName: urlParams.get('ref') || urlParams.get('referrer'),
        utmSource: urlParams.get('utm_source'),
        utmMedium: urlParams.get('utm_medium'),
        utmCampaign: urlParams.get('utm_campaign'),
        timestamp: Date.now()
    };
    
    // Merge with stored data if available
    if (storedReferral) {
        const stored = JSON.parse(storedReferral);
        Object.keys(referralData).forEach(key => {
            if (!referralData[key] && stored[key]) {
                referralData[key] = stored[key];
            }
        });
    }
    
    // Store updated referral data
    if (referralData.inviteCode || referralData.referrerName) {
        localStorage.setItem('trackwarranty_referral', JSON.stringify(referralData));
    }
    
    return referralData;
}

function updateDownloadLinks(referralData) {
    const downloadLinks = document.querySelectorAll('a[href*="apps.apple.com"], a[href*="play.google.com"]');
    
    downloadLinks.forEach(link => {
        const href = link.getAttribute('href');
        const updatedHref = buildReferralUrl(href, referralData);
        link.setAttribute('href', updatedHref);
        
        // Add referral indicator
        if (referralData.inviteCode) {
            link.setAttribute('data-invite-code', referralData.inviteCode);
            link.style.position = 'relative';
            
      
        }
    });
}

function buildReferralUrl(baseUrl, referralData) {
    const url = new URL(baseUrl);
    
    if (url.hostname.includes('apps.apple.com')) {
        // iOS App Store parameters
        if (referralData.inviteCode) {
            url.searchParams.set('code', referralData.inviteCode);
        }
        if (referralData.referrerName) {
            url.searchParams.set('ref', referralData.referrerName);
        }
    } else if (url.hostname.includes('play.google.com')) {
        // Android Play Store with referrer parameters
        const referrerParams = new URLSearchParams();
        if (referralData.inviteCode) referrerParams.set('invite_code', referralData.inviteCode);
        if (referralData.referrerName) referrerParams.set('referrer_name', referralData.referrerName);
        if (referralData.utmSource) referrerParams.set('utm_source', referralData.utmSource);
        referrerParams.set('utm_medium', 'website');
        referrerParams.set('utm_campaign', 'referral_program');
        
        if (referrerParams.toString()) {
            url.searchParams.set('referrer', referrerParams.toString());
        }
    }
    
    return url.toString();
}

function setupDownloadTracking() {
    // Track active download buttons (Play Store only)
    const downloadLinks = document.querySelectorAll('.download-btn-active[href*="play.google.com"]');
    
    downloadLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const platform = 'android'; // Only Android is active
            const inviteCode = this.getAttribute('data-invite-code');
            const section = getContainingSection(this);
            
            trackDownloadClick(platform, inviteCode);
            trackDownloadClickGA(platform, inviteCode, section);
            
            // Show download feedback
            showDownloadFeedback(this, platform);
        });
    });
    
    // Handle clicks on inactive iOS buttons (Coming Soon)
    const inactiveButtons = document.querySelectorAll('.download-btn-inactive');
    inactiveButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showComingSoonMessage();
        });
    });
}

function trackDownloadClick(platform, inviteCode) {
    const eventData = {
        event: 'download_click',
        platform: platform,
        invite_code: inviteCode,
        timestamp: Date.now(),
        page: window.location.pathname,
        referrer: document.referrer
    };
    
    // Store analytics data
    const analytics = JSON.parse(localStorage.getItem('trackwarranty_analytics') || '[]');
    analytics.push(eventData);
    localStorage.setItem('trackwarranty_analytics', JSON.stringify(analytics));
    
    console.log('📱 Download tracked:', eventData);
}

function trackPageView(referralData) {
    const pageData = {
        event: 'page_view',
        page: window.location.pathname,
        invite_code: referralData.inviteCode,
        referrer_name: referralData.referrerName,
        utm_source: referralData.utmSource,
        timestamp: Date.now()
    };
    
    const analytics = JSON.parse(localStorage.getItem('trackwarranty_analytics') || '[]');
    analytics.push(pageData);
    localStorage.setItem('trackwarranty_analytics', JSON.stringify(analytics));
    
    console.log('📊 Page view tracked:', pageData);
}

function showDownloadFeedback(button, platform) {
    const platformName = platform === 'ios' ? 'App Store' : 'Play Store';
    
    // Create feedback overlay
    const feedback = document.createElement('div');
    feedback.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 12px;
        z-index: 10000;
        text-align: center;
        max-width: 300px;
        backdrop-filter: blur(10px);
    `;
    feedback.innerHTML = `
        <div style="font-size: 2rem; margin-bottom: 1rem;">📱</div>
        <div style="font-weight: 600; margin-bottom: 0.5rem;">Opening ${platformName}...</div>
        <div style="opacity: 0.8; font-size: 0.9rem;">Install TrackWarranty to get started!</div>
    `;
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        if (document.body.contains(feedback)) {
            document.body.removeChild(feedback);
        }
    }, 3000);
}

function showComingSoonMessage() {
    // Create coming soon message overlay
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #ef4444, #dc2626);
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 12px;
        z-index: 10000;
        text-align: center;
        max-width: 300px;
        backdrop-filter: blur(10px);
        box-shadow: 0 10px 30px rgba(239, 68, 68, 0.3);
    `;
    message.innerHTML = `
        <div style="font-size: 2rem; margin-bottom: 1rem;">🍎</div>
        <div style="font-weight: 600; margin-bottom: 0.5rem;">iOS App Coming Soon!</div>
        <div style="opacity: 0.9; font-size: 0.9rem;">We're working hard to bring TrackWarranty to the App Store. Stay tuned!</div>
        <div style="margin-top: 1rem; padding: 0.5rem; background: rgba(255,255,255,0.1); border-radius: 8px; font-size: 0.8rem;">
            💚 Android version is available now on Play Store!
        </div>
    `;
    
    document.body.appendChild(message);
    
    // Track coming soon click
    trackGAEvent('ios_coming_soon_clicked', {
        interaction: 'coming_soon_message_shown'
    });
    
    setTimeout(() => {
        if (document.body.contains(message)) {
            document.body.removeChild(message);
        }
    }, 5000);
}

// Platform detection utility
function detectPlatform() {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    
    if (/iPad|iPhone|iPod/.test(userAgent) || 
        (platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
        return 'ios';
    } else if (/Android/.test(userAgent)) {
        return 'android';
    } else {
        return 'desktop';
    }
}

// Deep link attempt for mobile users
function attemptDeepLink(inviteCode, referrerName) {
    const platform = detectPlatform();
    
    if (platform === 'desktop') return;
    
    const params = new URLSearchParams();
    if (inviteCode) params.append('code', inviteCode);
    if (referrerName) params.append('ref', referrerName);
    
    const deepLink = `trackwarranty://invite?${params.toString()}`;
    
    // Try to open app
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = deepLink;
    document.body.appendChild(iframe);
    
    setTimeout(() => {
        document.body.removeChild(iframe);
    }, 1000);
}

function showReferralBadge(referralData) {
    const referralBadge = document.getElementById('referral-badge');
    const referralText = document.getElementById('referral-text');
    
    if (!referralBadge || !referralText) return;
    
    if (referralData.inviteCode || referralData.referrerName) {
        let message = 'Special invite bonus included!';
        
        if (referralData.referrerName) {
            message = `${referralData.referrerName} invited you - bonus included!`;
        } else if (referralData.inviteCode) {
            message = `Invite code ${referralData.inviteCode} - bonus included!`;
        }
        
        referralText.textContent = message;
        referralBadge.style.display = 'block';
        
        // Add subtle animation
        setTimeout(() => {
            referralBadge.style.animation = 'fadeInUp 0.5s ease-out';
        }, 500);
    }
}

// Create sharing utilities for future use
function generateReferralLink(inviteCode, referrerName, utmSource = 'direct') {
    const baseUrl = window.location.origin;
    const params = new URLSearchParams();
    
    if (inviteCode) params.append('code', inviteCode);
    if (referrerName) params.append('ref', referrerName);
    params.append('utm_source', utmSource);
    params.append('utm_medium', 'referral');
    params.append('utm_campaign', 'user_referral');
    
    return `${baseUrl}/invite/${inviteCode}?${params.toString()}`;
}

function shareReferralLink(method, inviteCode, referrerName) {
    const link = generateReferralLink(inviteCode, referrerName, method);
    
    const messages = {
        whatsapp: `🛡️ Never lose a warranty again! I'm using TrackWarranty to track all my warranties and get smart alerts. Join me with code ${inviteCode}: ${link}`,
        instagram: `🛡️ Never lose a warranty again! ✨\n\nJoin me on TrackWarranty with code: ${inviteCode}\n\n${link}\n\n#WarrantyTracker #TechLife #SmartApps`,
        twitter: `🛡️ Never lose money on expired warranties again! Join me on @TrackWarranty with invite code ${inviteCode}: ${link}`,
        email: `Hi!\n\nI've been using TrackWarranty to track all my warranties and it's been amazing - no more lost warranty cards or expired coverage!\n\nYou should try it too. Use my invite code ${inviteCode} to get special bonus features:\n\n${link}\n\nBest regards!`
    };
    
    const message = messages[method] || messages.whatsapp;
    
    switch (method) {
        case 'whatsapp':
            window.open(`https://wa.me/?text=${encodeURIComponent(message)}`);
            break;
        case 'instagram':
        case 'twitter':
            navigator.clipboard.writeText(message).then(() => {
                showNotification('Message copied! Paste it in your post.', 'success');
            });
            break;
        case 'email':
            window.open(`mailto:?subject=Check out TrackWarranty&body=${encodeURIComponent(message)}`);
            break;
        default:
            navigator.clipboard.writeText(link).then(() => {
                showNotification('Referral link copied!', 'success');
            });
    }
    
    // Track sharing event
    trackEvent('referral_shared', {
        method: method,
        invite_code: inviteCode,
        referrer_name: referrerName
    });
}

function trackEvent(eventName, properties = {}) {
    const eventData = {
        event: eventName,
        properties: {
            ...properties,
            timestamp: Date.now(),
            page: window.location.pathname,
            user_agent: navigator.userAgent
        }
    };
    
    const analytics = JSON.parse(localStorage.getItem('trackwarranty_analytics') || '[]');
    analytics.push(eventData);
    localStorage.setItem('trackwarranty_analytics', JSON.stringify(analytics));
    
    console.log('📊 Event tracked:', eventData);
}

// Global functions
window.showEarlyAccess = showEarlyAccess;
window.showPartnershipModal = showPartnershipModal;
window.closeModal = closeModal;
window.scrollToDemo = scrollToDemo;
window.scrollToSolutions = scrollToSolutions;
window.handleEarlyAccess = handleEarlyAccess;
window.handleB2BContact = handleB2BContact;
window.handleEnterpriseInquiry = handleEnterpriseInquiry;
window.openWhatsAppChat = openWhatsAppChat;
window.sendFormToWhatsApp = sendFormToWhatsApp;
window.validateForm = validateForm;
window.getReferralData = getReferralData;
window.trackDownloadClick = trackDownloadClick;
window.detectPlatform = detectPlatform;

// Advanced Google Analytics Tracking
function setupAdvancedAnalytics() {
    console.log('📊 Setting up advanced analytics tracking...');
    
    // Track initial page load
    trackGAEvent('page_view', {
        page_title: document.title,
        page_location: window.location.href,
        content_group1: 'Landing Page'
    });
    
    // Setup scroll depth tracking
    setupScrollDepthTracking();
    
    // Setup click tracking for all buttons and links
    setupClickTracking();
    
    // Setup form interaction tracking
    setupFormAnalytics();
    
    // Setup section view tracking
    setupSectionViewTracking();
    
    // Setup engagement time tracking
    setupEngagementTracking();
}

// Scroll Depth Tracking
function setupScrollDepthTracking() {
    const scrollDepthMarkers = [25, 50, 75, 90, 100];
    const trackedDepths = new Set();
    
    function trackScrollDepth() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.round((scrollTop / docHeight) * 100);
        
        scrollDepthMarkers.forEach(marker => {
            if (scrollPercent >= marker && !trackedDepths.has(marker)) {
                trackedDepths.add(marker);
                trackGAEvent('scroll', {
                    scroll_depth: marker,
                    engagement_time_msec: Date.now() - pageStartTime
                });
                console.log(`📊 Scroll depth: ${marker}%`);
            }
        });
    }
    
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(trackScrollDepth, 100);
    });
}

// Click Tracking for All Interactive Elements
function setupClickTracking() {
    // Track all button clicks
    document.addEventListener('click', (e) => {
        const target = e.target;
        const button = target.closest('button, a, .btn, .hero-app-btn, .app-store-btn, .nav-link');
        
        if (button) {
            const buttonText = button.textContent?.trim() || button.getAttribute('alt') || 'Unknown';
            const buttonType = getButtonType(button);
            const section = getContainingSection(button);
            
            trackGAEvent('click', {
                click_text: buttonText,
                click_type: buttonType,
                click_section: section,
                click_url: button.href || '',
                outbound: button.href && !button.href.includes(window.location.hostname)
            });
            
            console.log(`🎯 Click tracked: ${buttonText} in ${section}`);
        }
    });
}

// Enhanced Form Analytics
function setupFormAnalytics() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach((form, index) => {
        const formName = form.id || form.className || `form_${index}`;
        
        // Track form start (first interaction)
        let formStarted = false;
        form.addEventListener('input', () => {
            if (!formStarted) {
                formStarted = true;
                trackGAEvent('form_start', {
                    form_name: formName,
                    form_location: getContainingSection(form)
                });
            }
        });
        
        // Track form submission attempts
        form.addEventListener('submit', () => {
            trackGAEvent('form_submit', {
                form_name: formName,
                form_location: getContainingSection(form)
            });
        });
        
        // Track individual field interactions
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach((input) => {
            input.addEventListener('focus', () => {
                trackGAEvent('form_field_focus', {
                    form_name: formName,
                    field_name: input.name || input.type,
                    field_type: input.type
                });
            });
        });
    });
}

// Section View Tracking (when sections come into viewport)
function setupSectionViewTracking() {
    const sections = document.querySelectorAll('section, .hero, .problem-section, .solution-section, .social-proof, .enterprise-section, .download-section');
    const viewedSections = new Set();
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                const sectionName = getSectionName(entry.target);
                
                if (!viewedSections.has(sectionName)) {
                    viewedSections.add(sectionName);
                    trackGAEvent('section_view', {
                        section_name: sectionName,
                        view_time: Date.now() - pageStartTime
                    });
                    console.log(`👁️ Section viewed: ${sectionName}`);
                }
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => sectionObserver.observe(section));
}

// Engagement Time Tracking
function setupEngagementTracking() {
    let engagementStartTime = Date.now();
    let isEngaged = true;
    
    // Track when user becomes inactive
    let inactivityTimer;
    function resetInactivityTimer() {
        clearTimeout(inactivityTimer);
        
        if (!isEngaged) {
            isEngaged = true;
            engagementStartTime = Date.now();
        }
        
        inactivityTimer = setTimeout(() => {
            if (isEngaged) {
                const engagementTime = Date.now() - engagementStartTime;
                trackGAEvent('user_engagement', {
                    engagement_time_msec: engagementTime
                });
                isEngaged = false;
            }
        }, 30000); // 30 seconds of inactivity
    }
    
    // Track user activity
    ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
        document.addEventListener(event, resetInactivityTimer, true);
    });
    
    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && isEngaged) {
            const engagementTime = Date.now() - engagementStartTime;
            trackGAEvent('user_engagement', {
                engagement_time_msec: engagementTime,
                visibility_state: 'hidden'
            });
        } else if (!document.hidden) {
            engagementStartTime = Date.now();
            isEngaged = true;
        }
    });
}

// Enhanced Download Tracking
function trackDownloadClickGA(platform, inviteCode, section = 'unknown') {
    trackGAEvent('download_click', {
        platform: platform,
        invite_code: inviteCode || '',
        click_section: section,
        app_status: platform === 'ios' ? 'coming_soon' : 'available'
    });
    
    // Track as conversion event
    trackGAEvent('generate_lead', {
        currency: 'USD',
        value: 0, // Free app
        lead_type: 'app_download_intent',
        platform: platform
    });
}

// Utility Functions
function getButtonType(button) {
    if (button.href) {
        if (button.href.includes('apps.apple.com') || button.href.includes('play.google.com')) {
            return 'app_download';
        } else if (button.href.includes('wa.me')) {
            return 'whatsapp_contact';
        } else if (button.href.startsWith('mailto:')) {
            return 'email_contact';
        } else if (button.href.includes(window.location.hostname)) {
            return 'internal_link';
        } else {
            return 'external_link';
        }
    } else if (button.type === 'submit') {
        return 'form_submit';
    } else {
        return 'button';
    }
}

function getContainingSection(element) {
    const section = element.closest('section, .hero, .navbar, .footer');
    if (!section) return 'unknown';
    
    return getSectionName(section);
}

function getSectionName(section) {
    if (section.id) return section.id;
    if (section.className.includes('hero')) return 'hero';
    if (section.className.includes('problem')) return 'problem';
    if (section.className.includes('solution')) return 'solution';
    if (section.className.includes('social-proof')) return 'social_proof';
    if (section.className.includes('enterprise')) return 'enterprise';
    if (section.className.includes('download')) return 'download';
    if (section.className.includes('navbar')) return 'navigation';
    if (section.className.includes('footer')) return 'footer';
    return section.tagName.toLowerCase();
}

// Google Analytics Event Tracking
function trackGAEvent(eventName, parameters = {}) {
    // Check if gtag is available
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            custom_parameter_1: 'trackwarranty_website',
            ...parameters
        });
        console.log(`📊 GA Event: ${eventName}`, parameters);
    } else {
        // Fallback: store in localStorage for debugging
        const analyticsData = {
            event: eventName,
            parameters: parameters,
            timestamp: Date.now()
        };
        
        const existingData = JSON.parse(localStorage.getItem('ga_fallback_events') || '[]');
        existingData.push(analyticsData);
        localStorage.setItem('ga_fallback_events', JSON.stringify(existingData.slice(-50))); // Keep last 50 events
        
        console.log(`📊 GA Event (fallback): ${eventName}`, parameters);
    }
}

// Enhanced referral tracking with GA
function trackReferralGA(action, data = {}) {
    trackGAEvent('referral_' + action, {
        invite_code: data.invite_code || '',
        referrer_name: data.referrer_name || '',
        utm_source: data.utm_source || '',
        utm_medium: data.utm_medium || '',
        utm_campaign: data.utm_campaign || ''
    });
}

// Page start time for engagement tracking
const pageStartTime = Date.now();

console.log('🛡️ TrackWarranty website loaded successfully!');