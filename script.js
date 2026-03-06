document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       Set Current Year in Footer
       ========================================== */
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    /* ==========================================
       Navbar Scroll Effect
       ========================================== */
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* ==========================================
       Mobile Menu Toggle
       ========================================== */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li:not(.btn-primary-outline)');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            // Toggle Nav
            navLinks.classList.toggle('active');

            // Toggle Icon
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.replace('ph-list', 'ph-x');
            } else {
                icon.classList.replace('ph-x', 'ph-list');
            }
        });
    }

    // Close menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.replace('ph-x', 'ph-list');
            }
        });
    });

    /* ==========================================
       Scroll Reveal Animation
       ========================================== */
    const reveals = document.querySelectorAll('.reveal');

    const revealElements = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealElements);
    // Trigger once on load
    setTimeout(revealElements, 100);

    /* ==========================================
       Project Filtering (Dummy Logic)
       ========================================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-layout');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projects.forEach(project => {
                if (filterValue === 'all' || project.getAttribute('data-category') === filterValue) {
                    project.style.display = 'flex';
                    // Re-trigger animation by resetting opacity
                    project.style.animation = 'none';
                    project.offsetHeight; /* trigger reflow */
                    project.style.animation = null;

                    setTimeout(() => {
                        project.style.opacity = '1';
                    }, 50);
                } else {
                    project.style.display = 'none';
                    project.style.opacity = '0';
                }
            });
        });
    });
});
