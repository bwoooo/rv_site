// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact form functionality
const helpBtn = document.getElementById('help-btn');
const contactFormSection = document.getElementById('contact-form');
const closeFormBtn = document.getElementById('close-form');
const contactForm = document.getElementById('contact-form-element');
const formSuccess = document.getElementById('form-success');

// Show form
helpBtn.addEventListener('click', () => {
    contactFormSection.classList.add('active');
    // Smooth scroll to form
    setTimeout(() => {
        contactFormSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }, 100);
});

// Hide form
closeFormBtn.addEventListener('click', () => {
    contactFormSection.classList.remove('active');
    formSuccess.style.display = 'none';
    contactForm.style.display = 'grid';
    contactForm.reset();
});

// Form submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    
    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            // Show success message
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';
            
            // Auto-close form after 5 seconds
            setTimeout(() => {
                contactFormSection.classList.remove('active');
                formSuccess.style.display = 'none';
                contactForm.style.display = 'grid';
                contactForm.reset();
            }, 5000);
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        alert('Sorry, there was an error sending your message. Please try again or call us directly.');
    }
});

// Close form when clicking outside
contactFormSection.addEventListener('click', (e) => {
    if (e.target === contactFormSection) {
        contactFormSection.classList.remove('active');
        formSuccess.style.display = 'none';
        contactForm.style.display = 'grid';
        contactForm.reset();
    }
});