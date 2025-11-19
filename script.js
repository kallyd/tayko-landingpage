// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(254, 241, 123, 0.2)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(254, 241, 123, 0.1)';
    }
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Animated counter for stats
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate counters when stats section is visible
            if (entry.target.id === 'about') {
                const counters = document.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    if (!counter.classList.contains('animated')) {
                        counter.classList.add('animated');
                        animateCounter(counter);
                    }
                });
            }
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});


// Add parallax effect to hero section (space depth effect)
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    const particles = document.querySelectorAll('.particles');
    const shapes = document.querySelectorAll('.shape');
    const stars = document.querySelectorAll('.stars');
    
    if (heroSection) {
        heroSection.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
    
    // Parallax for stars (background layer - slower)
    stars.forEach(star => {
        star.style.transform = `translateY(${scrolled * 0.1}px)`;
    });
    
    // Parallax for particles (middle layer)
    particles.forEach(particle => {
        particle.style.transform = `translateY(${scrolled * 0.15}px)`;
    });
    
    // Parallax for planets (foreground layer - faster)
    shapes.forEach((shape, index) => {
        const speed = 0.2 + (index * 0.08);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Create dynamic space particles (meteors and stardust)
function createParticles() {
    const particlesContainer = document.querySelectorAll('.particles');
    
    particlesContainer.forEach(container => {
        // Create meteors (fast moving particles)
        for (let i = 0; i < 8; i++) {
            const meteor = document.createElement('div');
            const startX = Math.random() * 100;
            const startY = -10;
            const endX = startX + (Math.random() * 200 - 100);
            const endY = 110;
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 5;
            const size = Math.random() * 2 + 1;
            
            meteor.className = 'meteor';
            meteor.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size * 20}px;
                background: linear-gradient(180deg, var(--primary-color), transparent);
                border-radius: 50% 50% 0 0;
                left: ${startX}%;
                top: ${startY}%;
                opacity: 0.8;
                animation: meteorFall ${duration}s linear infinite;
                animation-delay: ${delay}s;
                box-shadow: 0 0 ${size * 3}px var(--primary-color);
                transform: rotate(45deg);
                --end-x: ${endX}%;
                --end-y: ${endY}%;
            `;
            container.appendChild(meteor);
        }
        
        // Create stardust (slow floating particles)
        for (let i = 0; i < 15; i++) {
            const stardust = document.createElement('div');
            const moveX = Math.random() * 200 - 100;
            const moveY = Math.random() * 200 - 100;
            const size = Math.random() * 2 + 0.5;
            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * 5;
            
            stardust.className = 'stardust';
            stardust.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: var(--primary-color);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: ${Math.random() * 0.4 + 0.2};
                animation: stardustFloat ${duration}s ease-in-out infinite;
                animation-delay: ${delay}s;
                box-shadow: 0 0 ${size * 2}px var(--primary-color);
                --move-x: ${moveX}px;
                --move-y: ${moveY}px;
            `;
            container.appendChild(stardust);
        }
    });
}

// Add space particle animations
const style = document.createElement('style');
style.textContent = `
    @keyframes meteorFall {
        0% {
            transform: translate(0, 0) rotate(45deg) scale(1);
            opacity: 0;
        }
        5% {
            opacity: 1;
        }
        95% {
            opacity: 1;
        }
        100% {
            transform: translate(200px, 600px) rotate(45deg) scale(0.3);
            opacity: 0;
        }
    }
    
    @keyframes stardustFloat {
        0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
        }
        25% {
            transform: translate(calc(var(--move-x, 30px) * 0.5), calc(var(--move-y, -30px) * 0.5)) scale(1.2);
            opacity: 0.6;
        }
        50% {
            transform: translate(var(--move-x, 30px), var(--move-y, -30px)) scale(1.5);
            opacity: 0.8;
        }
        75% {
            transform: translate(calc(var(--move-x, 30px) * 0.5), calc(var(--move-y, -30px) * 0.5)) scale(1.2);
            opacity: 0.6;
        }
    }
    
    @keyframes shipFly {
        0% {
            transform: translateX(-100px) translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateX(calc(100vw + 100px)) translateY(-50px) rotate(5deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Create flying ships animation
function createFlyingShips() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance to spawn a ship
            const ship = document.createElement('div');
            const shipSize = Math.random() * 20 + 15;
            const topPosition = Math.random() * 50 + 10;
            const duration = Math.random() * 8 + 6;
            const delay = Math.random() * 2;
            
            ship.style.cssText = `
                position: absolute;
                width: ${shipSize}px;
                height: ${shipSize * 0.6}px;
                background: linear-gradient(135deg, rgba(254, 241, 123, 0.8), rgba(254, 241, 123, 0.4));
                border: 1px solid var(--primary-color);
                border-radius: 4px;
                top: ${topPosition}%;
                left: -50px;
                opacity: 0;
                animation: shipFly ${duration}s linear;
                animation-delay: ${delay}s;
                box-shadow: 0 0 15px rgba(254, 241, 123, 0.6), 
                            ${shipSize * 0.8}px 0 10px rgba(254, 241, 123, 0.3);
                z-index: 5;
                pointer-events: none;
            `;
            
            // Add ship details
            ship.innerHTML = `
                <div style="position: absolute; width: 30%; height: 30%; background: rgba(254, 241, 123, 0.9); border-radius: 2px; top: 35%; left: 10%;"></div>
                <div style="position: absolute; width: 40%; height: 2px; background: var(--primary-color); bottom: 20%; left: 30%; box-shadow: 0 0 5px var(--primary-color);"></div>
            `;
            
            heroSection.appendChild(ship);
            
            setTimeout(() => {
                ship.remove();
            }, (duration + delay) * 1000);
        }
    }, 3000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Create space particles (meteors and stardust)
    createParticles();
    
    // Create flying ships
    createFlyingShips();
    
    // Add hover effect to service cards
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
    
    // Add scan line effect periodically (radar scan)
    setInterval(() => {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const scanLine = section.querySelector('.scan-line');
            if (!scanLine) {
                const newScanLine = document.createElement('div');
                newScanLine.className = 'scan-line';
                section.appendChild(newScanLine);
                setTimeout(() => {
                    newScanLine.remove();
                }, 4000);
            }
        });
    }, 6000);
});

