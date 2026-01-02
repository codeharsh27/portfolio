import './style.css'

// Initialize Icons
// Note: Lucide global script in HTML might handle initial load, but we can re-run if needed.
if (window.lucide) {
  window.lucide.createIcons();
}

// Scroll Reveal Animation
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

const animatedElements = document.querySelectorAll('.hero-title, .stat-item, .project-card, .experience-item, .tool-card, .contact-title');
animatedElements.forEach(el => {
  el.classList.add('fade-up-init'); // Add base class for animation
  observer.observe(el);
});


// Navigation Active State
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-item');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href').includes(current)) {
      item.classList.add('active');
    }
  });
});
