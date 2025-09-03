document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Function to toggle menu visibility
    const toggleMenu = () => {
        mobileMenu.classList.toggle('hidden');
    };

    menuBtn.addEventListener('click', toggleMenu);

    // Close mobile menu when a navigation link is clicked
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (!mobileMenu.classList.contains('hidden')) {
                toggleMenu();
            }
        });
    });

    // --- Typing Animation ---
    // Check if the typing element exists before initializing
    if (document.getElementById('typing-effect')) {
        const options = {
            strings: ['Web3 Educator.', 'Solidity Developer.', 'Blockchain Architect.', 'Entrepreneur.'],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            startDelay: 500,
            loop: true,
        };
        const typed = new Typed('#typing-effect', options);
    }

    // --- Fade-in on Scroll Animation using Intersection Observer ---
    const fadeInElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a delay based on the data-delay attribute for a staggered effect
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, delay);
                
                // Stop observing the element once it's visible
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    fadeInElements.forEach(el => {
        observer.observe(el);
    });
    
    // --- Smooth Scroll for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Ensure the link is a valid anchor link
            if (this.getAttribute('href').length > 1 && document.querySelector(this.getAttribute('href'))) {
               e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                }); 
            }
        });
    });

});
