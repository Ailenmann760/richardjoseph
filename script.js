document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll("a") : [];
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav a");
    const fadeElements = document.querySelectorAll(".fade-up");
    const year = document.getElementById("year");

    if (year) {
        year.textContent = String(new Date().getFullYear());
    }

    if (menuButton && mobileMenu) {
        menuButton.addEventListener("click", () => {
            mobileMenu.classList.toggle("open");
        });

        mobileLinks.forEach((link) => {
            link.addEventListener("click", () => {
                mobileMenu.classList.remove("open");
            });
        });
    }

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
    }, { threshold: 0.16 });

    fadeElements.forEach((element) => fadeObserver.observe(element));

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
    }, { rootMargin: "-35% 0px -55% 0px", threshold: 0.1 });

    sections.forEach((section) => sectionObserver.observe(section));
});
