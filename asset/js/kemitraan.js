document.addEventListener("DOMContentLoaded", function () {
    // Initialize AOS animation
    AOS.init({
        duration: 800,
        easing: "ease-in-out",
        once: true,
        mirror: false,
    });

    // Back to top button
    const backToTopButton = document.getElementById("backToTop");

    window.addEventListener("scroll", function () {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = "flex";
        } else {
            backToTopButton.style.display = "none";
        }
    });

    backToTopButton.addEventListener("click", function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });

    // Form submission handler
    const kemitraanForm = document.getElementById("kemitraanForm");
    if (kemitraanForm) {
        kemitraanForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());

            // Here you would typically send data to server
            console.log("Form data submitted:", data);

            // Show success message
            const modal = bootstrap.Modal.getInstance(
                document.getElementById("kemitraanModal")
            );
            modal.hide();

            // Create and show success alert
            const alertDiv = document.createElement("div");
            alertDiv.className =
                "alert alert-success alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3";
            alertDiv.style.zIndex = "9999";
            alertDiv.innerHTML = `
        <strong>Berhasil!</strong> Pendaftaran Anda telah kami terima. Tim kami akan menghubungi dalam 1x24 jam.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      `;

            document.body.appendChild(alertDiv);

            // Auto close alert after 5 seconds
            setTimeout(() => {
                const bsAlert = new bootstrap.Alert(alertDiv);
                bsAlert.close();
            }, 5000);

            // Reset form
            this.reset();
        });
    }

    // Add floating animation delay to elements
    const floatingElements = document.querySelectorAll(".floating-animation");
    floatingElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.3}s`;
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                });
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener("scroll", function () {
        const navbar = document.querySelector(".navbar");
        if (window.scrollY > 50) {
            navbar.classList.add("navbar-scrolled");
        } else {
            navbar.classList.remove("navbar-scrolled");
        }
    });
});

// Form Validation Script
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('kemitraanForm');

    if (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }

            form.classList.add('was-validated');

            if (form.checkValidity()) {
                // Form submission logic here
                alert('Terima kasih! Pendaftaran Anda berhasil dikirim.');
                const modal = bootstrap.Modal.getInstance(document.getElementById('kemitraanModal'));
                modal.hide();
            }
        }, false);
    }
});
