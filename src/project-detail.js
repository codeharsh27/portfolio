document.addEventListener('DOMContentLoaded', () => {
    // Lightbox Functionality
    // Select the container .gallery-item instead of img to avoid overlay click blocking
    const galleryItems = document.querySelectorAll('.gallery-item');
    const body = document.body;

    // Create Lightbox Elements
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';

    const lightboxContent = document.createElement('div');
    lightboxContent.className = 'lightbox-content';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-close';
    // Using simple SVG for X icon
    closeBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18"/>
            <path d="m6 6 18 18"/>
        </svg>
    `;

    const prevBtn = document.createElement('button');
    prevBtn.className = 'lightbox-nav prev';
    prevBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m15 18-6-6 6-6"/>
        </svg>
    `;

    const nextBtn = document.createElement('button');
    nextBtn.className = 'lightbox-nav next';
    nextBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m9 18 6-6-6-6"/>
        </svg>
    `;

    const lightboxImg = document.createElement('img');
    lightboxImg.className = 'lightbox-img';

    lightboxContent.appendChild(lightboxImg);
    lightbox.appendChild(closeBtn);
    lightbox.appendChild(prevBtn);
    lightbox.appendChild(nextBtn);
    lightbox.appendChild(lightboxContent);
    body.appendChild(lightbox);

    let currentIndex = 0;

    function showImage(index) {
        if (index >= galleryItems.length) currentIndex = 0;
        else if (index < 0) currentIndex = galleryItems.length - 1;
        else currentIndex = index;

        // Find the image inside the gallery item
        const img = galleryItems[currentIndex].querySelector('img');
        if (img) {
            lightboxImg.src = img.src;
        }
    }

    function openLightbox(index) {
        lightbox.classList.add('active');
        body.style.overflow = 'hidden'; // Disable scroll
        showImage(index);
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        body.style.overflow = ''; // Enable scroll
    }

    // Event Listeners
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            openLightbox(index);
        });
    });

    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLightbox();
    });

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === lightboxContent) closeLightbox();
    });

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showImage(currentIndex - 1);
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showImage(currentIndex + 1);
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
        if (e.key === 'ArrowRight') showImage(currentIndex + 1);
    });
});

// Project Showcase Slider Logic
document.addEventListener('DOMContentLoaded', () => {
    const showcaseContainer = document.querySelector('.project-showcase');

    // Only run if showcase exists
    if (showcaseContainer) {
        const slides = showcaseContainer.querySelectorAll('.showcase-slide');
        if (slides.length === 0) return;

        let currentSlide = 0;
        const totalSlides = slides.length;
        const intervalTime = 5000; // 5 seconds per slide
        let slideInterval;

        // Create Indicators
        const indicatorsContainer = document.createElement('div');
        indicatorsContainer.className = 'showcase-indicators';
        slides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
        showcaseContainer.appendChild(indicatorsContainer);

        const indicators = indicatorsContainer.querySelectorAll('.indicator');

        function nextSlide() {
            goToSlide((currentSlide + 1) % totalSlides);
        }

        function goToSlide(n) {
            // Reset animations for current slide
            slides[currentSlide].classList.remove('active');
            indicators[currentSlide].classList.remove('active');

            currentSlide = n;

            // Trigger animations for new slide
            slides[currentSlide].classList.add('active');
            indicators[currentSlide].classList.add('active');

            // Reset Timer
            resetTimer();
        }

        function resetTimer() {
            clearInterval(slideInterval);
            // Re-trigger progress animation
            indicators.forEach(ind => {
                ind.style.animation = 'none';
                ind.offsetHeight; /* trigger reflow */
                if (ind.classList.contains('active')) {
                    ind.style.animation = `progress ${intervalTime / 1000}s linear forwards`;
                }
            });
            slideInterval = setInterval(nextSlide, intervalTime);
        }

        // Initialize Timer
        resetTimer();

        // Pause on Hover
        showcaseContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        showcaseContainer.addEventListener('mouseleave', () => {
            resetTimer();
        });
    }
});
