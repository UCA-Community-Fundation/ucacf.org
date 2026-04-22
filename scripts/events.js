document.addEventListener('DOMContentLoaded', () => {
    const showMoreBtn = document.getElementById('showMoreBtn');
    const showLessBtn = document.getElementById('showLessBtn');
    const newsCards = document.querySelectorAll('.news-card');
    const newsGrid = document.getElementById('newsGrid');
    
    // Number of cards to display initially
    const INITIAL_CARDS = 3;

    function initGrid() {
        newsCards.forEach((card, index) => {
            if (index >= INITIAL_CARDS) {
                card.classList.add('hidden');
            }
        });
        
        if (newsCards.length > INITIAL_CARDS) {
            showMoreBtn.style.display = 'inline-block';
            showLessBtn.style.display = 'none';
        }
    }

    if (showMoreBtn && showLessBtn) {
        initGrid();

        showMoreBtn.addEventListener('click', () => {
            newsCards.forEach(card => card.classList.remove('hidden'));
            showMoreBtn.style.display = 'none';
            showLessBtn.style.display = 'inline-block';
        });

        showLessBtn.addEventListener('click', () => {
            initGrid();
            // Smoothly scroll back to the top of the grid to prevent visual jumping
            newsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
});