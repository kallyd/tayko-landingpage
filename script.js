// Wait for DOM to be ready
(function() {
    'use strict';
    
    // Natural scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'auto'
                });
            }
        });
    });

    // Cache DOM elements once
    let navbar = null;
    let sections = null;
    let navLinks = null;
    let historySection = null;
    
    // Initialize DOM cache
    function initDOMElements() {
        navbar = document.querySelector('.navbar');
        sections = document.querySelectorAll('section[id]');
        navLinks = document.querySelectorAll('.nav-link');
        historySection = document.getElementById('history');
    }
    
    // Optimized scroll handler - minimal work to prevent blocking
    let lastScrollY = 0;
    let scrollTimeout = null;
    let currentActiveSection = '';

    // MINIMAL scroll handler - only essential updates
    window.addEventListener('scroll', function() {
        // Use requestIdleCallback to avoid blocking scroll
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                const scrollY = window.pageYOffset || window.scrollY;
                
                // Navbar background - minimal update
                if (navbar) {
                    if (scrollY > 50) {
                        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
                    } else {
                        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
                    }
                }
                
                // Active nav link - only update when section changes
                if (sections && navLinks) {
                    let current = '';
                    for (let i = sections.length - 1; i >= 0; i--) {
                        const section = sections[i];
                        if (scrollY >= (section.offsetTop - 100)) {
                            current = section.getAttribute('id');
                            break;
                        }
                    }
                    
                    if (current !== currentActiveSection) {
                        currentActiveSection = current;
                        navLinks.forEach(link => {
                            if (link.getAttribute('href') === `#${current}`) {
                                navLinks.forEach(l => l.classList.remove('active'));
                                link.classList.add('active');
                            } else {
                                link.classList.remove('active');
                            }
                        });
                    }
                }
            }, { timeout: 100 });
        } else {
            // Fallback - use setTimeout with longer delay
            if (scrollTimeout) clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const scrollY = window.pageYOffset || window.scrollY;
                if (navbar) {
                    navbar.style.background = scrollY > 50 ? 'rgba(0, 0, 0, 0.98)' : 'rgba(0, 0, 0, 0.95)';
                }
            }, 100);
        }
    }, { passive: true, capture: false });

    // Animated counter for stats (optimized with requestAnimationFrame)
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target')) || 0;
        if (target === 0) return;
        
        const duration = 2000;
        const startTime = performance.now();
        let current = 0;

        function updateCounter(timestamp) {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            current = Math.floor(target * progress);
            
            element.textContent = current + '+';
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + '+';
            }
        }
        
        requestAnimationFrame(updateCounter);
    }

    // DISABLED Intersection Observer - was causing scroll blocking
    // All sections are now visible by default
    const observer = null;

    // Initialize on DOM ready
    function init() {
        initDOMElements();
        
        // Make ALL sections visible immediately - NO animations to prevent scroll blocking
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('visible');
            // Make all timeline items visible
            section.querySelectorAll('.timeline-item').forEach(item => {
                item.classList.add('visible');
            });
        });
        
        // Animate counters when about section is visible (delayed to not block scroll)
        setTimeout(() => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                const counters = aboutSection.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    if (!counter.classList.contains('animated')) {
                        counter.classList.add('animated');
                        animateCounter(counter);
                    }
                });
            }
        }, 500);
        
        // Create particles (skip history section)
        createParticles();
        
        // Add hover effects to service cards
        setupServiceCards();
    }

    // DISABLED particles - were causing scroll blocking
    function createParticles() {
        // Particles disabled to prevent scroll blocking
        return;
    }

    // Add particle animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleMove {
            0% {
                transform: translate(0, 0) scale(1);
                opacity: 0.1;
            }
            50% {
                transform: translate(var(--move-x, 30px), var(--move-y, -30px)) scale(1.2);
                opacity: 0.5;
            }
            100% {
                transform: translate(0, 0) scale(1);
                opacity: 0.1;
            }
        }
    `;
    document.head.appendChild(style);

    // Setup service cards hover effects
    function setupServiceCards() {
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.borderColor = 'rgba(254, 241, 123, 0.6)';
                this.style.boxShadow = '0 15px 40px rgba(254, 241, 123, 0.3)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.borderColor = 'rgba(254, 241, 123, 0.2)';
                this.style.boxShadow = 'none';
            });
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // DOM is already ready
        init();
    }
})();
