/**
 * Vigaza Farm Main JavaScript File - Optimized Version
 * Features:
 * - Modular design with reusable functions
 * - Better event delegation
 * - Optimized performance
 * - Cleaner code structure
 * - Accessibility improvements
 */

document.addEventListener("DOMContentLoaded", function () {
    // ==================== MODULAR FUNCTIONS ====================

    const NavbarManager = {
        init() {
            this.navbar = document.querySelector(".navbar");
            this.setupScrollEffect();
            this.handleMobileFallback();
            this.checkInitialScroll();
        },

        setupScrollEffect() {
            window.addEventListener("scroll", () => {
                this.navbar.classList.toggle("scrolled", window.scrollY > 50);
            });
        },

        checkInitialScroll() {
            if (window.scrollY > 50) {
                this.navbar.classList.add("scrolled");
            }
        },

        handleMobileFallback() {
            if (
                /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                    navigator.userAgent
                )
            ) {
                const parallaxBg = document.querySelector(".parallax-background");
                if (parallaxBg) {
                    parallaxBg.style.backgroundAttachment = "scroll";
                }
            }
        },
    };

    const MobileMenu = {
        init() {
            this.hamburger = document.getElementById("nav-icon3");
            this.popupMenu = document.getElementById("popupMenu");

            if (!this.hamburger || !this.popupMenu) return;

            this.setupEventListeners();
        },

        setupEventListeners() {
            this.hamburger.addEventListener("click", () => {
                this.toggleMenu();
                // Update aria-expanded attribute
                const isExpanded =
                    this.hamburger.getAttribute("aria-expanded") === "true";
                this.hamburger.setAttribute("aria-expanded", !isExpanded);
            });

            this.popupMenu.addEventListener("click", (e) => {
                if (e.target.tagName === "A") {
                    this.closeMenu();
                    this.hamburger.setAttribute("aria-expanded", "false");
                }
            });

            document.addEventListener("click", (e) => {
                if (
                    !this.hamburger.contains(e.target) &&
                    !this.popupMenu.contains(e.target)
                ) {
                    this.closeMenu();
                    this.hamburger.setAttribute("aria-expanded", "false");
                }
            });

            // Close menu when pressing Escape key
            document.addEventListener("keydown", (e) => {
                if (e.key === "Escape") {
                    this.closeMenu();
                    this.hamburger.setAttribute("aria-expanded", "false");
                }
            });
        },

        toggleMenu() {
            this.hamburger.classList.toggle("open");
            this.popupMenu.classList.toggle("show");

            // Toggle body scroll when menu is open
            if (this.popupMenu.classList.contains("show")) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "";
            }
        },

        closeMenu() {
            this.hamburger.classList.remove("open");
            this.popupMenu.classList.remove("show");
            document.body.style.overflow = "";
        },
    };

    const CounterAnimation = {
        init() {
            this.observer = new IntersectionObserver(
                this.handleIntersection.bind(this),
                {
                    threshold: 0.3,
                    rootMargin: "0px 0px -50px 0px",
                }
            );

            const statsSection = document.querySelector(".stats-container");
            if (statsSection) {
                this.observer.observe(statsSection);
            }
        },

        handleIntersection(entries) {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    this.animateAllCounters();
                    this.observer.unobserve(entry.target);
                }
            });
        },

        animateAllCounters() {
            document.querySelectorAll(".stat-number").forEach((number) => {
                const target = parseFloat(number.dataset.count);
                this.animateCounter(number, target);
            });
        },

        animateCounter(element, target, duration = 1500) {
            const start = 0;
            const startTime = performance.now();

            const animate = (timestamp) => {
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const current = progress * target;

                element.textContent =
                    Math.floor(current) === current ? current : current.toFixed(1);

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    element.textContent = target;
                }
            };

            requestAnimationFrame(animate);
        },
    };

    const ScrollAnimations = {
        init() {
            this.observer = new IntersectionObserver(this.handleSections.bind(this), {
                threshold: 0.1,
                rootMargin: "0px 0px -100px 0px",
            });

            document.querySelectorAll("section").forEach((section) => {
                this.observer.observe(section);
            });
        },

        handleSections(entries) {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in-view");
                }
            });
        },
    };

    const HoverEffects = {
        init() {
            this.setupSocialIcons();
            this.setupCardHovers();
            this.setupFloatingElements();
        },

        setupSocialIcons() {
            document
                .querySelector(".social-icons")
                ?.addEventListener("mouseover", (e) => {
                    const icon = e.target.closest("a");
                    if (icon) icon.style.transform = "translateY(-5px)";
                });

            document
                .querySelector(".social-icons")
                ?.addEventListener("mouseout", (e) => {
                    const icon = e.target.closest("a");
                    if (icon) icon.style.transform = "translateY(0)";
                });
        },

        setupCardHovers() {
            document.addEventListener("mouseover", (e) => {
                const card = e.target.closest(".card");
                if (card) {
                    card.style.transform = "translateY(-5px)";
                    card.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.1)";
                }
            });

            document.addEventListener("mouseout", (e) => {
                const card = e.target.closest(".card");
                if (card) {
                    card.style.transform = "translateY(0)";
                    card.style.boxShadow = "";
                }
            });
        },

        setupFloatingElements() {
            document.querySelectorAll(".floating-animation").forEach((el) => {
                el.style.willChange = "transform";
            });
        },
    };

    const DropdownMenu = {
        init() {
            const toggle = document.getElementById("serviceDropdown");
            const menu = toggle?.nextElementSibling;

            if (!toggle || !menu) return;

            // Toggle on click
            toggle.addEventListener("click", function (e) {
                e.preventDefault();
                e.stopPropagation();
                menu.classList.toggle("show");

                // Update aria-expanded attribute
                const isExpanded = this.getAttribute("aria-expanded") === "true";
                this.setAttribute("aria-expanded", !isExpanded);

                // Close other open dropdowns
                document
                    .querySelectorAll(".dropdown-menu.show")
                    .forEach((otherMenu) => {
                        if (otherMenu !== menu) {
                            otherMenu.classList.remove("show");
                            otherMenu.previousElementSibling?.setAttribute(
                                "aria-expanded",
                                "false"
                            );
                        }
                    });
            });

            // Close when clicking outside
            document.addEventListener("click", function (e) {
                if (!toggle.contains(e.target) && !menu.contains(e.target)) {
                    menu.classList.remove("show");
                    toggle.setAttribute("aria-expanded", "false");
                }
            });

            // Close when pressing Escape key
            document.addEventListener("keydown", function (e) {
                if (e.key === "Escape") {
                    menu.classList.remove("show");
                    toggle.setAttribute("aria-expanded", "false");
                }
            });
        },
    };

    // ==================== INITIALIZE ALL MODULES ====================
    NavbarManager.init();
    MobileMenu.init();
    CounterAnimation.init();
    ScrollAnimations.init();
    HoverEffects.init();
    DropdownMenu.init();
});

// ==================== BACK TO TOP FUNCTIONALITY ====================
const backToTopBtn = document.getElementById("backToTopBtn");

if (backToTopBtn) {
    window.addEventListener("scroll", () => {
        backToTopBtn.classList.toggle("visible", window.scrollY > 300);
    });

    backToTopBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        backToTopBtn.blur();
    });

    backToTopBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    });
}

// ==================== WINDOW LOAD OPTIMIZATION ====================
window.addEventListener("load", function () {
    // Load any non-critical resources here
    if (window.performance) {
        console.log("Page fully loaded in", performance.now().toFixed(2), "ms");
    }

    // Set loaded class for any fade-in effects
    document.body.classList.add("loaded");
});

