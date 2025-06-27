/**
 * Vigaza Farm Main JavaScript File
 * Includes:
 * - Navbar scroll effect
 * - Mobile menu toggle
 * - Counter animation
 * - Scroll animations
 * - Other interactive elements
 */

document.addEventListener('DOMContentLoaded', function () {
    // ==================== NAVBAR SCROLL EFFECT ====================
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Initialize navbar state on page load
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }

    // Mobile detection for parallax fallback
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        document.querySelector('.parallax-background').style.backgroundAttachment = 'scroll';
    }

    // ==================== MOBILE MENU TOGGLE ====================
    const hamburger = document.getElementById('nav-icon3');
    const popupMenu = document.getElementById('popupMenu');

    if (hamburger && popupMenu) {
        hamburger.addEventListener('click', function () {
            this.classList.toggle('open');
            popupMenu.classList.toggle('show');
        });

        // Close menu when clicking on links
        const menuLinks = popupMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                popupMenu.classList.remove('show');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!hamburger.contains(e.target) && !popupMenu.contains(e.target)) {
                hamburger.classList.remove('open');
                popupMenu.classList.remove('show');
            }
        });
    }

    // ==================== COUNTER ANIMATION ====================
    const animateCounter = (element, target, duration = 1500) => {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                current = target;
            }
            element.textContent = Math.floor(current) === current ? current : current.toFixed(1);
        }, 16);
    };

    const setupCounters = () => {
        const statNumbers = document.querySelectorAll('.stat-number');

        statNumbers.forEach(number => {
            const target = parseFloat(number.getAttribute('data-count'));
            animateCounter(number, target);
        });
    };

    // ==================== INTERSECTION OBSERVER ====================
    const setupIntersectionObserver = () => {
        // For counter animation
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setupCounters();
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        const statsSection = document.querySelector('.stats-container');
        if (statsSection) {
            counterObserver.observe(statsSection);
        }

        // For general scroll animations
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('section').forEach(section => {
            sectionObserver.observe(section);
        });
    };

    // ==================== FLOATING ANIMATION ====================
    const setupFloatingAnimations = () => {
        const floatingElements = document.querySelectorAll('.floating-animation');

        floatingElements.forEach(el => {
            el.style.willChange = 'transform';
        });
    };

    // ==================== INITIALIZE ALL FUNCTIONS ====================
    setupIntersectionObserver();
    setupFloatingAnimations();

    // ==================== SOCIAL ICONS HOVER EFFECT ====================
    const socialIcons = document.querySelectorAll('.social-icons a');

    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'translateY(-5px)';
        });

        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'translateY(0)';
        });
    });

    // ==================== HOVER EFFECTS FOR CARDS ====================
    const setupCardHoverEffects = () => {
        const cards = document.querySelectorAll('.card');

        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '';
            });
        });
    };

    setupCardHoverEffects();
});

// ==================== WINDOW LOAD EVENT ====================
window.addEventListener('load', function () {
    // Additional load-time optimizations can go here
    console.log('Page fully loaded');
});