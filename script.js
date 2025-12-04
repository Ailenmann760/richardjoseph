document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('#mobile-menu .nav-link');

    const toggleMenu = () => mobileMenu.classList.toggle('hidden');

    menuBtn.addEventListener('click', toggleMenu);
    navLinks.forEach(link => link.addEventListener('click', toggleMenu));

    // --- Typing Animation ---
    if (document.getElementById('typing-effect')) {
        const options = {
            strings: ['Web3 Educator.', 'Blockchain Architect.', 'Strategic Partner.', 'Ecosystem Builder.'],
            typeSpeed: 40,
            backSpeed: 30,
            backDelay: 2000,
            startDelay: 500,
            loop: true,
        };
        new Typed('#typing-effect', options);
    }

    // --- Fade-in on Scroll Animation ---
    const fadeElements = document.querySelectorAll('.fade-up');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => entry.target.classList.add('visible'), delay);
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    fadeElements.forEach(el => fadeObserver.observe(el));

    // --- Active Nav Link on Scroll (Scroll Spy) ---
    const sections = document.querySelectorAll('section[id]');
    const headerNavLinks = document.querySelectorAll('header nav a.nav-link');

    const activateNavLink = (id) => {
        headerNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
            }
        });
    };

    const scrollSpyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activateNavLink(entry.target.id);
            }
        });
    }, { rootMargin: '-30% 0px -70% 0px' });

    sections.forEach(sec => scrollSpyObserver.observe(sec));

    // --- Smooth Scroll for All Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.length > 1 && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Counter Animation for Stats ---
    const statNumbers = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.innerText;
                const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                const suffix = finalValue.replace(/[0-9]/g, '');

                let current = 0;
                const increment = numericValue / 40;
                const duration = 1500;
                const stepTime = duration / 40;

                const counter = setInterval(() => {
                    current += increment;
                    if (current >= numericValue) {
                        target.innerText = numericValue + suffix;
                        clearInterval(counter);
                    } else {
                        target.innerText = Math.floor(current) + suffix;
                    }
                }, stepTime);

                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => counterObserver.observe(stat));
});
