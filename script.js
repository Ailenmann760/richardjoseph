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
            strings: ['Web3 Educator.', 'Solidity Developer.', 'Blockchain Architect.', 'Entrepreneur.'],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            startDelay: 500,
            loop: true,
        };
        new Typed('#typing-effect', options);
    }

    // --- Fade-in on Scroll Animation ---
    const fadeInElements = document.querySelectorAll('.fade-in');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => entry.target.classList.add('is-visible'), delay);
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    fadeInElements.forEach(el => fadeObserver.observe(el));
    
    // --- Active Nav Link on Scroll (Scroll Spy) ---
    const sections = document.querySelectorAll('section');
    const headerNavLinks = document.querySelectorAll('#main-header .nav-link');

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
    }, { rootMargin: '-30% 0px -70% 0px' }); // Activates when section is in the middle 40% of the viewport

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
});
