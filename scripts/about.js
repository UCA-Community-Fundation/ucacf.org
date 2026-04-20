document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('sliderTrack');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    const totalSlides = slides.length;
    let slideInterval;

    const updateSliderPosition = () => {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    const goToNextSlide = () => {
        currentIndex = (currentIndex === totalSlides - 1) ? 0 : currentIndex + 1;
        updateSliderPosition();
    };

    const goToPrevSlide = () => {
        currentIndex = (currentIndex === 0) ? totalSlides - 1 : currentIndex - 1;
        updateSliderPosition();
    };

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