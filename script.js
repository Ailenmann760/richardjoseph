document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll("a") : [];
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");
    const fadeElements = document.querySelectorAll(".fade-up");
    const year = document.getElementById("year");

    // Set current year in footer
    if (year) {
        year.textContent = String(new Date().getFullYear());
    }

    // Mobile Menu Toggle
    if (menuButton && mobileMenu) {
        menuButton.addEventListener("click", () => {
            mobileMenu.classList.toggle("open");
            const icon = menuButton.querySelector("i");
            if (mobileMenu.classList.contains("open")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-times");
            } else {
                icon.classList.remove("fa-times");
                icon.classList.add("fa-bars");
            }
        });

        mobileLinks.forEach((link) => {
            link.addEventListener("click", () => {
                mobileMenu.classList.remove("open");
                const icon = menuButton.querySelector("i");
                icon.classList.remove("fa-times");
                icon.classList.add("fa-bars");
            });
        });
    }

    // Scroll Animations
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            const delay = Number(entry.target.dataset.delay || 0);
            window.setTimeout(() => {
                entry.target.classList.add("visible");
            }, delay);

            fadeObserver.unobserve(entry.target);
        });
    }, { threshold: 0.1 });

    fadeElements.forEach((element) => fadeObserver.observe(element));

    // Active Link Highlighting
    const setActiveLink = (id) => {
        navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setActiveLink(entry.target.id);
            }
        });
    }, { rootMargin: "-20% 0px -75% 0px", threshold: 0 });

    sections.forEach((section) => sectionObserver.observe(section));
});
