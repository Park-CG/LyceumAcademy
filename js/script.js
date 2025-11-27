document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Number Counter Animation
                if (entry.target.querySelector('.stat-number')) {
                    const numbers = entry.target.querySelectorAll('.stat-number');
                    numbers.forEach(num => {
                        const target = +num.getAttribute('data-target');
                        const duration = 2000; // ms
                        const increment = target / (duration / 16);

                        let current = 0;
                        const updateNumber = () => {
                            current += increment;
                            if (current < target) {
                                num.innerText = Math.ceil(current);
                                requestAnimationFrame(updateNumber);
                            } else {
                                num.innerText = target;
                            }
                        };
                        updateNumber();
                    });
                }

                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.fade-up, .reveal-left, .reveal-right, .reveal-up, .reveal-zoom');
    revealElements.forEach(el => observer.observe(el));

    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initial Hero Animation Trigger
    setTimeout(() => {
        document.querySelectorAll('.hero .fade-up').forEach(el => {
            el.classList.add('active');
        });
    }, 100);
});
