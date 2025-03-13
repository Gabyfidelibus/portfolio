document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Resume download button
    const resumeBtn = document.getElementById('resume-btn');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', function() {
            // You can replace this with an actual path to your resume
            const resumeUrl = 'src/assets/CV Gabriel Web DEV.pdf';
            
            // Create a temporary anchor to trigger the download
            const downloadLink = document.createElement('a');
            downloadLink.href = resumeUrl;
            downloadLink.download = 'Gabriel_Fidelibus_Resume.pdf';
            
            // Append to the document, click, and remove
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        });
    }

    // Project carousels
    const carousels = document.querySelectorAll('.project-carousel');
    
    carousels.forEach(carousel => {
        const container = carousel.querySelector('.carousel-container');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.prev');
        const nextBtn = carousel.querySelector('.next');
        
        let currentIndex = 0;
        const slideWidth = 100; // 100%
        
        // Set initial positions
        updateSlidePositions();
        
        // Previous button click
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
            updateSlidePositions();
        });
        
        // Next button click
        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
            updateSlidePositions();
        });
        
        function updateSlidePositions() {
            container.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
        }
        
        // Auto-slide every 5 seconds
        let slideInterval = setInterval(() => {
            currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
            updateSlidePositions();
        }, 5000);
        
        // Pause auto-slide when hovering over carousel
        carousel.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        // Resume auto-slide when mouse leaves carousel
        carousel.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
                updateSlidePositions();
            }, 5000);
        });
    });

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // You would typically send this data to a server
            // For now, let's just log it and show a success message
            console.log({
                name,
                email,
                subject,
                message
            });
            
            // Here you would implement actual form submission logic
            // Example with EmailJS or similar service would go here
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50, // Account for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Lazy loading images
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        document.querySelectorAll('img').forEach(img => {
            img.setAttribute('loading', 'lazy');
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        // You could implement a custom lazy loading solution here
    }
});