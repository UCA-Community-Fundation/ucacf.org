// Hero image slider: advances every 5 seconds and loops forever.
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.hero-slider');
    if (!slider) return;

    const slides = Array.from(slider.querySelectorAll('.hero-slide'));
    const dotsContainer = slider.querySelector('.hero-dots');
    const INTERVAL = 5000;
    const DURATION = 900; // must match the CSS transition
    let current = 0;
    let timer = null;
    let busy = false;

    if (slides.length < 2) return;

    const dots = slides.map((_, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'hero-dot' + (i === 0 ? ' is-active' : '');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => {
            goTo(i);
            restart();
        });
        dotsContainer.appendChild(dot);
        return dot;
    });

    function goTo(next) {
        if (busy || next === current) return;
        busy = true;

        const from = slides[current];
        const to = slides[next];

        // Place the incoming slide off-screen to the right without animating.
        to.classList.remove('is-animating', 'is-leaving');
        to.classList.remove('is-active');
        void to.offsetWidth; // force reflow

        // Animate: current slides out left, next slides in from the right.
        from.classList.add('is-animating', 'is-leaving');
        from.classList.remove('is-active');
        to.classList.add('is-animating', 'is-active');

        from.setAttribute('aria-hidden', 'true');
        to.removeAttribute('aria-hidden');
        dots[current].classList.remove('is-active');
        dots[next].classList.add('is-active');

        setTimeout(() => {
            from.classList.remove('is-animating', 'is-leaving');
            to.classList.remove('is-animating');
            busy = false;
        }, DURATION);

        current = next;
    }

    function restart() {
        clearInterval(timer);
        timer = setInterval(() => goTo((current + 1) % slides.length), INTERVAL);
    }

    restart();
});
