// ICAI-Compliant Website JavaScript for B. K. DE & Co., Chartered Accountants

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');

            // Animate hamburger menu
            const spans = navToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                span.style.transform = navMenu.classList.contains('active') ? 
                    `rotate(${index === 1 ? 0 : index === 0 ? 45 : -45}deg) translateY(${index === 1 ? 0 : index === 0 ? 7 : -7}px)` : 
                    'none';
            });
        });
    }

    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                });
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
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ICAI Compliant Pull-Model for Services Section
    const showServicesBtn = document.getElementById('show-services');
    const servicesContent = document.getElementById('services-content');

    if (showServicesBtn && servicesContent) {
        showServicesBtn.addEventListener('click', function() {
            if (servicesContent.style.display === 'none' || servicesContent.style.display === '') {
                // Show services with animation
                servicesContent.style.display = 'block';
                servicesContent.style.opacity = '0';
                servicesContent.style.transform = 'translateY(20px)';

                // Animate in
                setTimeout(() => {
                    servicesContent.style.transition = 'all 0.5s ease';
                    servicesContent.style.opacity = '1';
                    servicesContent.style.transform = 'translateY(0)';
                }, 10);

                // Update button text
                this.textContent = 'Hide Services';
                this.style.background = '#6b7280';

                // Add ICAI compliance note
                if (!document.querySelector('.services-note')) {
                    const note = document.createElement('p');
                    note.className = 'services-note';
                    note.style.cssText = 'text-align: center; font-size: 0.9rem; color: #6b7280; font-style: italic; margin-top: 1rem;';
                    note.textContent = 'Services information displayed as per user request (ICAI Pull-Model Compliance)';
                    servicesContent.appendChild(note);
                }

                // Scroll to services content
                setTimeout(() => {
                    servicesContent.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }, 600);

            } else {
                // Hide services with animation
                servicesContent.style.transition = 'all 0.3s ease';
                servicesContent.style.opacity = '0';
                servicesContent.style.transform = 'translateY(-20px)';

                setTimeout(() => {
                    servicesContent.style.display = 'none';
                }, 300);

                // Update button text
                this.textContent = 'View Our Services';
                this.style.background = '#1e3a8a';

                // Remove compliance note
                const note = document.querySelector('.services-note');
                if (note) {
                    note.remove();
                }
            }
        });
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const formValues = {};

            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }

            // Basic form validation
            const requiredFields = ['name', 'email', 'subject', 'message'];
            let isValid = true;
            let firstErrorField = null;

            requiredFields.forEach(field => {
                const fieldElement = document.getElementById(field);
                const value = formValues[field];

                if (!value || value.trim() === '') {
                    isValid = false;
                    fieldElement.style.borderColor = '#ef4444';
                    if (!firstErrorField) {
                        firstErrorField = fieldElement;
                    }
                } else {
                    fieldElement.style.borderColor = '#e5e7eb';
                }
            });

            // Email validation
            const emailField = document.getElementById('email');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (formValues.email && !emailPattern.test(formValues.email)) {
                isValid = false;
                emailField.style.borderColor = '#ef4444';
                if (!firstErrorField) {
                    firstErrorField = emailField;
                }
            }

            if (!isValid) {
                // Show error message
                showFormMessage('Please fill in all required fields correctly.', 'error');
                if (firstErrorField) {
                    firstErrorField.focus();
                    firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return;
            }

            // Show success message
            showFormMessage('Thank you for your message. We will get back to you soon.', 'success');

            // Reset form
            this.reset();
        });

        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && (!this.value || this.value.trim() === '')) {
                    this.style.borderColor = '#ef4444';
                } else if (this.type === 'email' && this.value) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    this.style.borderColor = emailPattern.test(this.value) ? '#e5e7eb' : '#ef4444';
                } else {
                    this.style.borderColor = '#e5e7eb';
                }
            });

            input.addEventListener('focus', function() {
                this.style.borderColor = '#1e3a8a';
            });
        });
    }

    // Form message display function
    function showFormMessage(message, type) {
        // Remove existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.textContent = message;

        // Style the message
        messageElement.style.cssText = `
            padding: 1rem;
            margin: 1rem 0;
            border-radius: 5px;
            font-weight: 600;
            text-align: center;
            background-color: ${type === 'success' ? '#d1fae5' : '#fee2e2'};
            color: ${type === 'success' ? '#065f46' : '#991b1b'};
            border: 1px solid ${type === 'success' ? '#a7f3d0' : '#fecaca'};
            animation: slideIn 0.3s ease;
        `;

        // Insert message after form title
        const formTitle = contactForm.querySelector('h3');
        formTitle.parentNode.insertBefore(messageElement, formTitle.nextSibling);

        // Auto-remove message after 5 seconds
        setTimeout(() => {
            if (messageElement && messageElement.parentNode) {
                messageElement.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => {
                    messageElement.remove();
                }, 300);
            }
        }, 5000);
    }

    // Active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        let currentSection = '';
        const scrollPosition = window.scrollY + 100; // Offset for header

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Scroll event listener
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        // Debounce scroll events
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateActiveNavLink, 10);
    });

    // Initial call
    updateActiveNavLink();

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.stat, .detail-group, .service-category, .partner-card, .job-card');
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Add CSS animation styles dynamically
    const animationStyles = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes slideOut {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(-10px);
            }
        }

        .animate-in {
            animation: slideIn 0.6s ease forwards;
        }

        .nav-link.active {
            color: #d4af37 !important;
            border-bottom-color: #d4af37 !important;
        }
    `;

    // Add animation styles to head
    const styleSheet = document.createElement('style');
    styleSheet.textContent = animationStyles;
    document.head.appendChild(styleSheet);

    // Professional loading behavior
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');

         // Add fade-in effect for main content
        const mainContent = document.querySelector('main');
        if (mainContent) {
            mainContent.style.opacity = '0';
            mainContent.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                mainContent.style.opacity = '1';
            }, 100);
        }
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
            });
        }

        // Enter key on show services button
        if (e.key === 'Enter' && document.activeElement === showServicesBtn) {
            showServicesBtn.click();
        }
    });

    // Print functionality
    window.addEventListener('beforeprint', function() {
        // Ensure services are visible when printing
        if (servicesContent && servicesContent.style.display === 'none') {
            servicesContent.style.display = 'block';
            servicesContent.style.opacity = '1';
        }
    });

    // Error handling for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.log(`Image failed to load: ${this.src}`);
        });
    });

    // ICAI Compliance Check
    function icaiComplianceCheck() {
        const prohibitedElements = [
            'testimonial',
            'client-logo',
            'fee-info',
            'promotional-claim',
            'best-firm',
            'leading-firm',
            'award',
            'media-coverage'
        ];

        let complianceIssues = [];

        prohibitedElements.forEach(element => {
            const found = document.querySelector(`.${element}, #${element}, [data-${element}]`);
            if (found) {
                complianceIssues.push(`Prohibited element found: ${element}`);
            }
        });

        if (complianceIssues.length === 0) {
            console.log('✅ ICAI Compliance Check Passed');
        } else {
            console.warn('⚠️ ICAI Compliance Issues:', complianceIssues);
        }
    }

    // Run compliance check in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        icaiComplianceCheck();
    }

    console.log('🏢 B. K. DE & Co., Chartered Accountants - Website Loaded Successfully');
    console.log('📋 ICAI Compliance: Pull-model services implementation active');
});

// Service Worker Registration (for future PWA support)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Commented out for now - uncomment when PWA features are needed
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}