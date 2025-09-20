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

console.log('🛡️ TrackWarranty website loaded successfully!');