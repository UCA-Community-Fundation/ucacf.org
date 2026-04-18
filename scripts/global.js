// Load the header
fetch('header.html')
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.text();
    })
    .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;
        initMobileMenu();
        initHeaderScroll();
    })
    .catch(error => console.error('Error loading header:', error));

// Load the footer
fetch('footer.html')
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.text();
    })
    .then(data => {
        document.getElementById('footer-placeholder').innerHTML = data;
    })
    .catch(error => console.error('Error loading footer:', error));

function initMobileMenu() {
    const header = document.querySelector('.site-header');
    const nav = document.querySelector('.header-center');

    if (!header || !nav) return;

    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '<span class="bar"></span><span class="bar"></span><span class="bar"></span>';

    header.appendChild(hamburger);

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Add dropdown toggles for mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const toggle = document.createElement('span');
        toggle.className = 'dropdown-toggle';
        toggle.textContent = '▶';
        dropdown.appendChild(toggle);

        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropdown.classList.toggle('active');
        });
    });
}

function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const handleScroll = () => {
        if (window.scrollY > window.innerHeight * 0.3) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
}