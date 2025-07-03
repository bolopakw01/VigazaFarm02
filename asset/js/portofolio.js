        
        // Animated Counting Function
        function animateCount(elementId, targetNumber, duration = 2000) {
            const element = document.getElementById(elementId);
            const startNumber = 0;
            const increment = targetNumber / (duration / 16); // 60fps
            
            let currentNumber = startNumber;
            const timer = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= targetNumber) {
                    clearInterval(timer);
                    currentNumber = targetNumber;
                }
                element.textContent = Math.floor(currentNumber) + "+";
            }, 16);
        }
        
        // Function to check if element is in viewport
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
        
        // Run counting animation when stats section is visible
        function checkStatsVisibility() {
            const statsSection = document.querySelector('.portfolio-stats');
            if (isInViewport(statsSection) && !statsSection.classList.contains('animated')) {
                statsSection.classList.add('animated');
                
                // Animate each counter
                animateCount('sertifikat-count', 25);
                animateCount('penghargaan-count', 15);
                animateCount('pencapaian-count', 50);
                animateCount('artikel-count', 30);
            }
        }
        
        // Check on scroll and on load
        window.addEventListener('scroll', checkStatsVisibility);
        window.addEventListener('load', checkStatsVisibility);
        
        // Portfolio Filter
        const filterButtons = document.querySelectorAll(".btn-filter");
        const portfolioItems = document.querySelectorAll(".portfolio-item");

        filterButtons.forEach((button) => {
            button.addEventListener("click", function () {
                // Remove active class from all buttons
                filterButtons.forEach((btn) => btn.classList.remove("active"));

                // Add active class to clicked button
                this.classList.add("active");

                const filterValue = this.getAttribute("data-filter");

                // Filter portfolio items
                portfolioItems.forEach((item) => {
                    if (filterValue === "all") {
                        item.style.display = "block";
                        item.classList.remove("hide");
                    } else if (item.getAttribute("data-category") === filterValue) {
                        item.style.display = "block";
                        item.classList.remove("hide");
                    } else {
                        item.style.display = "none";
                        item.classList.add("hide");
                    }
                });

                // Reinitialize AOS for newly shown items
                AOS.refresh();
            });
        });

        // Initialize lightbox
        if (typeof FsLightbox !== "undefined") {
            const lightbox = new FsLightbox();
            lightbox.props.sources = Array.from(
                document.querySelectorAll("[data-fslightbox]")
            ).map((el) => el.getAttribute("href"));
        }