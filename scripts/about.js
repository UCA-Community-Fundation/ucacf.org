document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('sliderTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (!track) return;

    const originalSlides = Array.from(track.querySelectorAll('.slide'));
    const totalSlides = originalSlides.length;

    if (totalSlides === 0) return;

    // Clone the first and last slides so the track has a slide to land on
    // just past each end, then snap invisibly back to the real slide once
    // the animation finishes — this makes the loop look continuous.
    const firstClone = originalSlides[0].cloneNode(true);
    const lastClone = originalSlides[totalSlides - 1].cloneNode(true);
    firstClone.setAttribute('aria-hidden', 'true');
    lastClone.setAttribute('aria-hidden', 'true');

    track.appendChild(firstClone);
    track.insertBefore(lastClone, originalSlides[0]);

    let currentIndex = 1; // index 0 is the prepended lastClone
    let slideInterval;
    let isSnapping = false;

    const updateSliderPosition = (withTransition = true) => {
        track.style.transition = withTransition ? 'transform 0.5s ease-in-out' : 'none';
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    // Position on the first real slide without animating on page load
    updateSliderPosition(false);
    track.offsetHeight; // force reflow so the "none" transition takes effect

    const goToNextSlide = () => {
        if (isSnapping) return;
        currentIndex++;
        updateSliderPosition(true);
    };

    const goToPrevSlide = () => {
        if (isSnapping) return;
        currentIndex--;
        updateSliderPosition(true);
    };

    track.addEventListener('transitionend', (e) => {
        if (e.propertyName !== 'transform') return;

        if (currentIndex === totalSlides + 1) {
            // Landed on the cloned first slide — snap back to the real one
            isSnapping = true;
            currentIndex = 1;
            updateSliderPosition(false);
            track.offsetHeight;
            isSnapping = false;
        } else if (currentIndex === 0) {
            // Landed on the cloned last slide — snap back to the real one
            isSnapping = true;
            currentIndex = totalSlides;
            updateSliderPosition(false);
            track.offsetHeight;
            isSnapping = false;
        }
    });

    // Button Event Listeners
    nextBtn.addEventListener('click', () => {
        goToNextSlide();
        resetInterval();
    });

    prevBtn.addEventListener('click', () => {
        goToPrevSlide();
        resetInterval();
    });

    // Auto-slide functionality (changes every 5 seconds)
    const startInterval = () => { slideInterval = setInterval(goToNextSlide, 5000); };
    const resetInterval = () => { clearInterval(slideInterval); startInterval(); };

    // Initialize auto-slide
    startInterval();
});
