// Portfolio Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initThemeToggle();
    initMobileMenu();
    initTypingAnimation();
    initProjectFilters();
    initContactForm();
    initScrollEffects();
    initBackToTop();
    initScrollAnimations();
    initSkillBars();
    initLazyLoading();
    initNavigation();
});

// Theme Toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const icon = themeToggle.querySelector('i');

    // Check for saved theme preference or default to dark mode
    const currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'light') {
        html.classList.remove('dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        icon.classList.remove('text-yellow-400');
        icon.classList.add('text-blue-500');
    }

    themeToggle.addEventListener('click', function() {
        html.classList.toggle('dark');

        if (html.classList.contains('dark')) {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            icon.classList.remove('text-blue-500');
            icon.classList.add('text-slate-400');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            icon.classList.remove('text-slate-400');
            icon.classList.add('text-blue-500');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Mobile Menu
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    mobileMenuToggle.addEventListener('click', function() {
        const icon = this.querySelector('i');
        mobileMenu.classList.toggle('hidden');

        if (mobileMenu.classList.contains('hidden')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });

    // Close mobile menu when clicking on a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Typing Animation
function initTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    const texts = [
        'Frontend Developer',
        'React Specialist',
        'UI/UX Designer',
        'Problem Solver',
        'Web Enthusiast'
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeText() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at the end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before typing new text
        }

        setTimeout(typeText, typeSpeed);
    }

    // Start typing animation
    typeText();
}

// Project Filters
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.project-filter');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            // Filter projects
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');

                if (filter === 'all' || categories.includes(filter)) {
                    card.classList.remove('hidden');
                    card.classList.add('visible');
                } else {
                    card.classList.remove('visible');
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contact-form');
    const modal = document.getElementById('success-modal');
    const closeButton = document.getElementById('close-modal');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Validate form
            if (validateForm(formData)) {
                // Here you would normally send the form data to a server
                // For demo purposes, we'll show the success modal
                showSuccessModal();

                // Reset form
                form.reset();
            }
        });
    }

    if (closeButton) {
        closeButton.addEventListener('click', hideSuccessModal);
    }

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            hideSuccessModal();
        }
    });
}

function validateForm(data) {
    const errors = [];

    if (!data.name || data.name.trim().length < 2) {
        errors.push('Please enter your name (at least 2 characters)');
    }

    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }

    if (!data.subject || data.subject.trim().length < 3) {
        errors.push('Please enter a subject (at least 3 characters)');
    }

    if (!data.message || data.message.trim().length < 10) {
        errors.push('Please enter a message (at least 10 characters)');
    }

    if (errors.length > 0) {
        // Create error message with better formatting
        const errorMessage = errors.join('\n• ');
        alert('Please fix the following errors:\n\n• ' + errorMessage);
        return false;
    }

    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showSuccessModal() {
    const modal = document.getElementById('success-modal');
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

function hideSuccessModal() {
    const modal = document.getElementById('success-modal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

// Scroll Effects
function initScrollEffects() {
    const navbar = document.querySelector('nav');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add/remove shadow to navbar
        if (scrollTop > 10) {
            navbar.classList.add('shadow-lg');
        } else {
            navbar.classList.remove('shadow-lg');
        }

        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');

                // Animate skill bars when they come into view
                if (entry.target.classList.contains('skill-bar')) {
                    animateSkillBar(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.project-card, .skill-item, .skill-bar');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Skill Bar Animation
function animateSkillBar(skillBar) {
    const progressBar = skillBar.querySelector('.bg-gradient-to-r');
    if (progressBar && !progressBar.classList.contains('animated')) {
        const targetWidth = progressBar.style.width;
        progressBar.style.width = '0%';
        progressBar.classList.add('animated');

        setTimeout(() => {
            progressBar.style.width = targetWidth;
        }, 200);
    }
}

function initSkillBars() {
    // Initial animation for skill bars that are visible on page load
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            animateSkillBar(bar);
        }
    });
}

// Lazy Loading for Images
function initLazyLoading() {
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

// Active Navigation Link
function initNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                current = sectionId;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility Functions
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

function throttle(func, limit) {
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

// Performance Optimization
const optimizedScroll = throttle(function() {
    // Scroll-based optimizations here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScroll);

// Preload Critical Resources
function preloadCriticalResources() {
    const criticalResources = [
        'assets/images/profile.jpg'
    ];

    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = resource;
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadCriticalResources();

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment the following lines to register a service worker
        /*
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
        */
    });
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // You could send this to an error tracking service here
});

// Performance Monitoring
window.addEventListener('load', function() {
    if ('performance' in window) {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
    }
});