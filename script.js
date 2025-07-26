
// B. K. DE & Co. Website JavaScript
// ICAI Compliant Interactive Features

document.addEventListener('DOMContentLoaded', function() {

    // Services Section Toggle (Pull Model Implementation)
    const servicesLink = document.querySelector('.services-link');
    const servicesSection = document.getElementById('services');

    if (servicesLink && servicesSection) {
        servicesLink.addEventListener('click', function(e) {
            e.preventDefault();

            // Toggle services section visibility (Pull model)
            if (servicesSection.style.display === 'none' || servicesSection.style.display === '') {
                servicesSection.style.display = 'block';
                servicesSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                servicesSection.style.display = 'none';
            }
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#services') {
                // Handle services link separately (already handled above)
                return;
            }

            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };

            // Basic validation
            if (!data.name.trim() || !data.email.trim() || !data.subject.trim() || !data.message.trim()) {
                alert('Please fill in all required fields.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Simulate form submission (replace with actual submission logic)
            alert('Thank you for your message. We will get back to you soon.');

            // Reset form
            this.reset();
        });
    }

    // Add active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav a[href^="#"]');

    function highlightNavigation() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + current) {
                item.classList.add('active');
            }
        });
    }

    // Throttled scroll event for navigation highlighting
    let ticking = false;
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(function() {
                highlightNavigation();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', handleScroll);

    // Mobile menu toggle (if needed for responsive design)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav ul');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }

    // Add CSS for active navigation
    const style = document.createElement('style');
    style.textContent = `
        .nav a.active {
            background-color: rgba(255,255,255,0.3);
            border-radius: 4px;
        }

        /* Mobile menu styles */
        @media (max-width: 768px) {
            .nav ul {
                display: none;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: #1e3c72;
                padding: 1rem;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }

            .nav ul.show {
                display: flex;
            }

            .mobile-menu-toggle {
                display: block;
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
            }
        }

        .mobile-menu-toggle {
            display: none;
        }
    `;
    document.head.appendChild(style);

    // Lazy loading for images (if any are added)
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

    // Add animations on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .partner-card, .news-item');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    };

    // Add CSS for animations
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .service-card, .partner-card, .news-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .service-card.animate, .partner-card.animate, .news-item.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(animationStyle);

    // Initialize animations
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load

    // Professional notification system for ICAI compliance
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    // Add notification styles
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #2a5298;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 4px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        }

        .notification-info {
            background: #2a5298;
        }

        .notification-success {
            background: #4caf50;
        }

        .notification-warning {
            background: #ff9800;
        }

        .notification-error {
            background: #f44336;
        }

        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(notificationStyle);

    // Initialize website with ICAI compliance message
    setTimeout(() => {
        showNotification('Website designed in compliance with ICAI guidelines', 'info');
    }, 2000);

    console.log('B. K. DE & Co. website initialized successfully');
    console.log('ICAI compliance features activated');
});

// Utility functions for professional website management
const WebsiteUtils = {
    // Format phone numbers for Indian format
    formatPhoneNumber: function(phone) {
        return phone.replace(/(\+91)(\d{5})(\d{5})/, '$1-$2-$3');
    },

    // Validate Indian mobile numbers
    validateIndianMobile: function(mobile) {
        const indianMobileRegex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
        return indianMobileRegex.test(mobile);
    },

    // Professional email template generator
    generateEmailTemplate: function(name, subject, message) {
        return `
            Dear Team,

            New inquiry received through website:

            Name: ${name}
            Subject: ${subject}
            Message: ${message}

            Please respond within 24 hours as per professional standards.

            Best regards,
            Website Contact System
        `;
    }
};

// Export utilities for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WebsiteUtils;
}
