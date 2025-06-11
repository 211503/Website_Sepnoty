// ===== MAIN JAVASCRIPT FOR SEPNOTY TECHNOLOGIES =====

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initializePreloader();
    initializeNavigation();
    initializeChatbot();
    initializeSearchPopup();
    initializeScrollAnimations();
    initializeIconsAndInteractions();
    initializeSmoothScrolling();
    initializeTestimonialSlider();
});

// ===== PRELOADER =====
function initializePreloader() {
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            if (preloader) {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }
        }, 1000);
    });
}

// ===== NAVIGATION =====
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Mobile menu toggle
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Create mobile menu styles if not exists
            if (!document.querySelector('#mobile-menu-styles')) {
                const mobileStyles = document.createElement('style');
                mobileStyles.id = 'mobile-menu-styles';
                mobileStyles.innerHTML = `
                    @media (max-width: 768px) {
                        .nav-links {
                            position: fixed;
                            top: 70px;
                            left: -100%;
                            width: 100%;
                            background: white;
                            flex-direction: column;
                            padding: 20px;
                            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                            transition: left 0.3s ease;
                        }
                        .nav-links.active {
                            left: 0;
                        }
                        .nav-links li {
                            margin: 10px 0;
                        }
                    }
                `;
                document.head.appendChild(mobileStyles);
            }
        });
    }
    
    // Active link highlighting
    const navLinksArray = document.querySelectorAll('.nav-links a');
    navLinksArray.forEach(link => {
        link.addEventListener('click', function() {
            navLinksArray.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// ===== CHATBOT =====
function initializeChatbot() {
    const chatbotButton = document.getElementById('chatbot-button');
    const chatbotWidget = document.getElementById('chatbot-widget');
    const chatbotMessage = document.getElementById('chatbot-message');
    const chatbotBody = document.getElementById('chatbot-body');
    
    // Chatbot responses
    const responses = {
        'hello': 'Hello! Welcome to Sepnoty Technologies. How can I help you today?',
        'hi': 'Hi there! I\'m here to help you learn about Sepnoty Technologies.',
        'services': 'We offer Software Development, Web Development, App Development, UI/UX Design, BPO Services, AI-Powered Solutions, and Digital Product Innovation.',
        'about': 'Sepnoty Technologies is a leading IT company focused on innovative digital solutions and AI-powered applications.',
        'contact': 'You can reach us at support@sepnoty.in or call +918455807965. We\'re based in Bengaluru, Karnataka.',
        'tepnoty': 'Tepnoty is our innovation lab focused on incubating digital ideas, AI research, and product-based learning.',
        'club': 'Sepnoty Club offers learning plans from Free to Enterprise levels with mentorship and exclusive projects.',
        'default': 'I\'m here to help! Ask me about our services, company, or anything else about Sepnoty Technologies.'
    };
    
    if (chatbotButton && chatbotWidget) {
        chatbotButton.addEventListener('click', toggleChatbot);
        
        // Send message function
        window.sendChatMessage = function() {
            const message = chatbotMessage.value.trim().toLowerCase();
            if (message) {
                // Add user message
                addChatMessage('You', chatbotMessage.value, 'user');
                
                // Generate response
                let response = responses.default;
                for (let key in responses) {
                    if (message.includes(key)) {
                        response = responses[key];
                        break;
                    }
                }
                
                // Add bot response with delay
                setTimeout(() => {
                    addChatMessage('Sepnoty Assistant', response, 'bot');
                }, 500);
                
                chatbotMessage.value = '';
            }
        };
        
        // Enter key support
        chatbotMessage.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }
    
    function addChatMessage(sender, message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${type}`;
        messageDiv.innerHTML = `
            <div class="message-content" style="
                background: ${type === 'user' ? '#ff6600' : '#f0f0f0'};
                color: ${type === 'user' ? 'white' : '#333'};
                padding: 10px 15px;
                border-radius: 15px;
                margin: 5px 0;
                ${type === 'user' ? 'margin-left: 20px;' : 'margin-right: 20px;'}
                animation: slideIn 0.3s ease;
            ">
                <strong>${sender}:</strong> ${message}
            </div>
        `;
        chatbotBody.appendChild(messageDiv);
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }
}

// Toggle chatbot visibility
function toggleChatbot() {
    const chatbotWidget = document.getElementById('chatbot-widget');
    if (chatbotWidget) {
        chatbotWidget.style.display = chatbotWidget.style.display === 'block' ? 'none' : 'block';
    }
}

// ===== SEARCH POPUP =====
function initializeSearchPopup() {
    const searchIcon = document.querySelector('[data-lucide="search"]');
    const searchPopup = document.querySelector('.search-popup');
    const overlay = document.querySelector('.sotcox-overlay');
    const closeSearch = document.querySelector('.close-search');
    const searchForm = document.querySelector('.search-popup form');
    
    if (searchIcon && searchPopup && overlay) {
        searchIcon.addEventListener('click', function() {
            searchPopup.style.display = 'flex';
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Focus on search input
            const searchInput = document.querySelector('.search-popup input');
            if (searchInput) {
                setTimeout(() => searchInput.focus(), 100);
            }
        });
        
        // Close search popup
        function closeSearchPopup() {
            searchPopup.style.display = 'none';
            overlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        
        if (closeSearch) {
            closeSearch.addEventListener('click', closeSearchPopup);
        }
        
        overlay.addEventListener('click', closeSearchPopup);
        
        // Handle search form submission
        if (searchForm) {
            searchForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const searchTerm = this.querySelector('input').value;
                if (searchTerm.trim()) {
                    // Here you can implement actual search functionality
                    alert(`Searching for: ${searchTerm}`);
                    closeSearchPopup();
                }
            });
        }
    }
}

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }
    
    // Custom scroll animations
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    function checkAnimations() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    }
    
    window.addEventListener('scroll', checkAnimations);
    checkAnimations(); // Run on load
}

// ===== ICONS AND INTERACTIONS =====
function initializeIconsAndInteractions() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.about div[style*="background: #f2f4fa"]');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.1)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Add interactive effects to pricing cards
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
        });
    });
    
    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn, .btn-outline, .btn-signup, .btn-signup-alt');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation CSS
    if (!document.querySelector('#ripple-animation')) {
        const rippleStyles = document.createElement('style');
        rippleStyles.id = 'ripple-animation';
        rippleStyles.innerHTML = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyles);
    }
}

// ===== SMOOTH SCROLLING =====
function initializeSmoothScrolling() {
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to top functionality
    const backToTopLink = document.querySelector('a[href="#top"]');
    if (backToTopLink) {
        backToTopLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===== TESTIMONIAL SLIDER =====
function initializeTestimonialSlider() {
    const testimonialWrapper = document.querySelector('.sotcox-testimonial-wrapper');
    
    if (testimonialWrapper) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        // Mouse events for desktop
        testimonialWrapper.addEventListener('mousedown', (e) => {
            isDown = true;
            testimonialWrapper.classList.add('active');
            startX = e.pageX - testimonialWrapper.offsetLeft;
            scrollLeft = testimonialWrapper.scrollLeft;
            testimonialWrapper.style.cursor = 'grabbing';
        });
        
        testimonialWrapper.addEventListener('mouseleave', () => {
            isDown = false;
            testimonialWrapper.classList.remove('active');
            testimonialWrapper.style.cursor = 'grab';
        });
        
        testimonialWrapper.addEventListener('mouseup', () => {
            isDown = false;
            testimonialWrapper.classList.remove('active');
            testimonialWrapper.style.cursor = 'grab';
        });
        
        testimonialWrapper.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - testimonialWrapper.offsetLeft;
            const walk = (x - startX) * 2;
            testimonialWrapper.scrollLeft = scrollLeft - walk;
        });
        
        // Touch events for mobile
        testimonialWrapper.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX - testimonialWrapper.offsetLeft;
            scrollLeft = testimonialWrapper.scrollLeft;
        });
        
        testimonialWrapper.addEventListener('touchmove', (e) => {
            if (!startX) return;
            const x = e.touches[0].pageX - testimonialWrapper.offsetLeft;
            const walk = (x - startX) * 2;
            testimonialWrapper.scrollLeft = scrollLeft - walk;
        });
        
        // Auto-scroll functionality
        let autoScrollInterval;
        
        function startAutoScroll() {
            autoScrollInterval = setInterval(() => {
                const maxScroll = testimonialWrapper.scrollWidth - testimonialWrapper.clientWidth;
                if (testimonialWrapper.scrollLeft >= maxScroll) {
                    testimonialWrapper.scrollLeft = 0;
                } else {
                    testimonialWrapper.scrollLeft += 350; // Width of one testimonial
                }
            }, 5000);
        }
        
        function stopAutoScroll() {
            clearInterval(autoScrollInterval);
        }
        
        // Start auto-scroll
        startAutoScroll();
        
        // Pause auto-scroll on hover
        testimonialWrapper.addEventListener('mouseenter', stopAutoScroll);
        testimonialWrapper.addEventListener('mouseleave', startAutoScroll);
        
        // Set cursor style
        testimonialWrapper.style.cursor = 'grab';
    }
}

// ===== FORM HANDLING =====
function initializeFormHandling() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading state
            const submitButton = this.querySelector('button[type="submit"]');
            if (submitButton) {
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    submitButton.textContent = 'Sent!';
                    setTimeout(() => {
                        submitButton.textContent = originalText;
                        submitButton.disabled = false;
                        this.reset();
                    }, 2000);
                }, 1000);
            }
        });
    });
}

// ===== UTILITY FUNCTIONS =====

// Throttle function for performance
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ===== PERFORMANCE OPTIMIZATIONS =====

// Lazy load images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Optimize scroll events
const optimizedScroll = throttle(() => {
    // Any scroll-based functionality goes here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScroll);

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
    // You can add error reporting here
});

// ===== INITIALIZATION =====
// Make sure all functions are called after DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    try {
        initializeFormHandling();
        initializeLazyLoading();
        
        // Add custom styles for better interactions
        const customStyles = document.createElement('style');
        customStyles.innerHTML = `
            .chat-message {
                animation: slideIn 0.3s ease;
            }
            
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .sotcox-testimonial-wrapper {
                scrollbar-width: none;
                -ms-overflow-style: none;
            }
            
            .sotcox-testimonial-wrapper::-webkit-scrollbar {
                display: none;
            }
            
            .loading-spinner {
                display: inline-block;
                width: 20px;
                height: 20px;
                border: 2px solid #f3f3f3;
                border-top: 2px solid #ff6600;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(customStyles);
        
        console.log('Sepnoty Technologies website initialized successfully!');
    } catch (error) {
        console.error('Error initializing website:', error);
    }
});

// ===== EXPORT FUNCTIONS FOR GLOBAL ACCESS =====
window.toggleChatbot = toggleChatbot;
window.sendChatMessage = function() {
    const chatbotMessage = document.getElementById('chatbot-message');
    const chatbotBody = document.getElementById('chatbot-body');
    
    if (chatbotMessage && chatbotBody) {
        const message = chatbotMessage.value.trim().toLowerCase();
        if (message) {
            const responses = {
                'hello': 'Hello! Welcome to Sepnoty Technologies. How can I help you today?',
                'hi': 'Hi there! I\'m here to help you learn about Sepnoty Technologies.',
                'services': 'We offer Software Development, Web Development, App Development, UI/UX Design, BPO Services, AI-Powered Solutions, and Digital Product Innovation.',
                'about': 'Sepnoty Technologies is a leading IT company focused on innovative digital solutions and AI-powered applications.',
                'contact': 'You can reach us at support@sepnoty.in or call +918455807965. We\'re based in Bengaluru, Karnataka.',
                'tepnoty': 'Tepnoty is our innovation lab focused on incubating digital ideas, AI research, and product-based learning.',
                'club': 'Sepnoty Club offers learning plans from Free to Enterprise levels with mentorship and exclusive projects.',
                'default': 'I\'m here to help! Ask me about our services, company, or anything else about Sepnoty Technologies.'
            };
            
            // Add user message
            const userMessageDiv = document.createElement('div');
            userMessageDiv.className = 'chat-message user';
            userMessageDiv.innerHTML = `
                <div class="message-content" style="
                    background: #ff6600;
                    color: white;
                    padding: 10px 15px;
                    border-radius: 15px;
                    margin: 5px 0;
                    margin-left: 20px;
                    animation: slideIn 0.3s ease;
                ">
                    <strong>You:</strong> ${chatbotMessage.value}
                </div>
            `;
            chatbotBody.appendChild(userMessageDiv);
            
            // Generate response
            let response = responses.default;
            for (let key in responses) {
                if (message.includes(key)) {
                    response = responses[key];
                    break;
                }
            }
            
            // Add bot response with delay
            setTimeout(() => {
                const botMessageDiv = document.createElement('div');
                botMessageDiv.className = 'chat-message bot';
                botMessageDiv.innerHTML = `
                    <div class="message-content" style="
                        background: #f0f0f0;
                        color: #333;
                        padding: 10px 15px;
                        border-radius: 15px;
                        margin: 5px 0;
                        margin-right: 20px;
                        animation: slideIn 0.3s ease;
                    ">
                        <strong>Sepnoty Assistant:</strong> ${response}
                    </div>
                `;
                chatbotBody.appendChild(botMessageDiv);
                chatbotBody.scrollTop = chatbotBody.scrollHeight;
            }, 500);
            
            chatbotMessage.value = '';
            chatbotBody.scrollTop = chatbotBody.scrollHeight;
        }
    }
};