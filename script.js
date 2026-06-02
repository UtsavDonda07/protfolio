document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       STICKY HEADER ON SCROLL
       ========================================================================== */
    const header = document.querySelector('.header');
    const scrollThreshold = 50;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    /* ==========================================================================
       MOBILE NAVIGATION MENU
       ========================================================================== */
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    function toggleMobileMenu() {
        mobileNavToggle.classList.toggle('open');
        mobileNavOverlay.classList.toggle('open');
        document.body.classList.toggle('no-scroll');
    }

    mobileNavToggle.addEventListener('click', toggleMobileMenu);

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNavOverlay.classList.contains('open')) {
                toggleMobileMenu();
            }
        });
    });


    /* ==========================================================================
       TYPEWRITER ANIMATION (HERO)
       ========================================================================== */
    const typewriterElement = document.querySelector('.typewriter-text');
    if (typewriterElement) {
        const words = JSON.parse(typewriterElement.getAttribute('data-words'));
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let delay = 100;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                delay = 50; // Speed up deletion
            } else {
                typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                delay = 100; // Normal typing speed
            }

            // Word completed typing
            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                delay = 1500; // Pause at full word
            } 
            // Word completely deleted
            else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                delay = 500; // Pause before starting new word
            }

            setTimeout(type, delay);
        }

        // Start typewriter
        setTimeout(type, 500);
    }


    /* ==========================================================================
       SCROLL REVEAL (INTERSECTION OBSERVER)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* ==========================================================================
       NAVBAR LINK ACTIVE HIGHLIGHT (INTERSECTION OBSERVER)
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const navObserverOptions = {
        threshold: 0.3,
        rootMargin: '-20% 0px -40% 0px' // Adjust bounds to ensure correct section triggers active tag
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => {
        navObserver.observe(section);
    });


    /* ==========================================================================
       CONTACT FORM HANDLING (SIMULATED API)
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const submitBtn = contactForm.querySelector('.btn-submit');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Front-end Checks (HTML5 handles required fields, we can do extra validation if needed)
        const nameVal = document.getElementById('name').value.trim();
        const emailVal = document.getElementById('email').value.trim();
        const subjectVal = document.getElementById('subject').value.trim();
        const messageVal = document.getElementById('message').value.trim();

        if (!nameVal || !emailVal || !subjectVal || !messageVal) {
            alert('Please fill out all fields before submitting.');
            return;
        }

        // Trigger Loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Simulate API post request delay (e.g., Formspree or EmailJS endpoint)
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.classList.add('success');

            // Reset form fields after brief delay
            setTimeout(() => {
                contactForm.reset();
                submitBtn.classList.remove('success');
                submitBtn.disabled = false;
            }, 3000);

        }, 2000);
    });

});
