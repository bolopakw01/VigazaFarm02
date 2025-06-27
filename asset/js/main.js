/**
 * Vigaza Farm Main JavaScript File - Optimized Version
 * Features:
 * - Modular design with reusable functions
 * - Better event delegation
 * - Optimized performance
 * - Cleaner code structure
 */

document.addEventListener('DOMContentLoaded', function() {
    // ==================== MODULAR FUNCTIONS ====================
    const NavbarManager = {
        init: function() {
            this.navbar = document.querySelector('.navbar');
            this.setupScrollEffect();
            this.handleMobileFallback();
            this.checkInitialScroll();
        },
        
        setupScrollEffect: function() {
            window.addEventListener('scroll', () => {
                this.navbar.classList.toggle('scrolled', window.scrollY > 50);
            });
        },
        
        checkInitialScroll: function() {
            if (window.scrollY > 50) {
                this.navbar.classList.add('scrolled');
            }
        },
        
        handleMobileFallback: function() {
            if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                const parallaxBg = document.querySelector('.parallax-background');
                if (parallaxBg) {
                    parallaxBg.style.backgroundAttachment = 'scroll';
                }
            }
        }
    };

    const MobileMenu = {
        init: function() {
            this.hamburger = document.getElementById('nav-icon3');
            this.popupMenu = document.getElementById('popupMenu');
            
            if (!this.hamburger || !this.popupMenu) return;
            
            this.setupEventListeners();
        },
        
        setupEventListeners: function() {
            this.hamburger.addEventListener('click', this.toggleMenu.bind(this));
            
            // Event delegation for menu links
            this.popupMenu.addEventListener('click', (e) => {
                if (e.target.tagName === 'A') {
                    this.closeMenu();
                }
            });
            
            document.addEventListener('click', (e) => {
                if (!this.hamburger.contains(e.target) && !this.popupMenu.contains(e.target)) {
                    this.closeMenu();
                }
            });
        },
        
        toggleMenu: function() {
            this.hamburger.classList.toggle('open');
            this.popupMenu.classList.toggle('show');
        },
        
        closeMenu: function() {
            this.hamburger.classList.remove('open');
            this.popupMenu.classList.remove('show');
        }
    };

    const CounterAnimation = {
        init: function() {
            this.observer = new IntersectionObserver(this.handleIntersection.bind(this), 
                { threshold: 0.3 }
            );
            
            const statsSection = document.querySelector('.stats-container');
            if (statsSection) {
                this.observer.observe(statsSection);
            }
        },
        
        handleIntersection: function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateAllCounters();
                    this.observer.unobserve(entry.target);
                }
            });
        },
        
        animateAllCounters: function() {
            document.querySelectorAll('.stat-number').forEach(number => {
                const target = parseFloat(number.dataset.count);
                this.animateCounter(number, target);
            });
        },
        
        animateCounter: function(element, target, duration = 1500) {
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    clearInterval(timer);
                    current = target;
                }
                element.textContent = Math.floor(current) === current ? 
                    current : current.toFixed(1);
            }, 16);
        }
    };

    const ScrollAnimations = {
        init: function() {
            this.observer = new IntersectionObserver(this.handleSections.bind(this), 
                { threshold: 0.1 }
            );
            
            document.querySelectorAll('section').forEach(section => {
                this.observer.observe(section);
            });
        },
        
        handleSections: function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }
    };

    const HoverEffects = {
        init: function() {
            this.setupSocialIcons();
            this.setupCardHovers();
            this.setupFloatingElements();
        },
        
        setupSocialIcons: function() {
            // Event delegation for social icons
            document.querySelector('.social-icons')?.addEventListener('mouseover', (e) => {
                const icon = e.target.closest('a');
                if (icon) {
                    icon.style.transform = 'translateY(-5px)';
                }
            });
            
            document.querySelector('.social-icons')?.addEventListener('mouseout', (e) => {
                const icon = e.target.closest('a');
                if (icon) {
                    icon.style.transform = 'translateY(0)';
                }
            });
        },
        
        setupCardHovers: function() {
            // Event delegation for cards
            document.addEventListener('mouseover', (e) => {
                const card = e.target.closest('.card');
                if (card) {
                    card.style.transform = 'translateY(-5px)';
                    card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
                }
            });
            
            document.addEventListener('mouseout', (e) => {
                const card = e.target.closest('.card');
                if (card) {
                    card.style.transform = 'translateY(0)';
                    card.style.boxShadow = '';
                }
            });
        },
        
        setupFloatingElements: function() {
            document.querySelectorAll('.floating-animation').forEach(el => {
                el.style.willChange = 'transform';
            });
        }
    };

    // ==================== INITIALIZE ALL MODULES ====================
    NavbarManager.init();
    MobileMenu.init();
    CounterAnimation.init();
    ScrollAnimations.init();
    HoverEffects.init();
});

// Clean window load event
window.addEventListener('load', function() {
    // Performance tracking or additional optimizations
    if (window.performance) {
        console.log('Page fully loaded in', 
            performance.now().toFixed(2), 'ms');
    }
});