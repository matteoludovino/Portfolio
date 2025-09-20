const toggleThemeBtn = document.getElementById('toggle-theme-btn');
const body = document.body;
const menu = document.querySelector('.menu');
const NavMenu = document.querySelector('.nav-menu');

const storedTheme = localStorage.getItem('theme');
if (storedTheme) {
    body.classList.add(storedTheme);
} else {
    body.classList.add('dark-theme');
}

toggleThemeBtn.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
        body.classList.replace('dark-theme', 'light-theme');
        localStorage.setItem('theme', 'light-theme');
    } else {
        body.classList.replace('light-theme', 'dark-theme');
        localStorage.setItem('theme', 'dark-theme');
    }
});

menu.addEventListener('click', () => {
    menu.classList.toggle('ativo');
    NavMenu.classList.toggle('ativo');
})

document.addEventListener('DOMContentLoaded', function () {
    const carrossel = document.querySelector('.carrossel');
    const cards = document.querySelectorAll('.project-card');
    const prevBtn = document.querySelector('.carrossel-btn.prev');
    const nextBtn = document.querySelector('.carrossel-btn.next');
    const dotsContainer = document.querySelector('.carrossel-dots');

    let currentIndex = 0;
    const cardsPerView = window.innerWidth < 968 ? 1 : 2;

    for (let i = 0; i < Math.ceil(cards.length / cardsPerView); i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(i);
        });
        dotsContainer.appendChild(dot);
    }

    const dots = document.querySelectorAll('.dot');

    function updateCarrossel() {
        const cardWidth = cards[0].offsetWidth + 40; // Largura do card + margem
        const translateX = -currentIndex * cardWidth * cardsPerView;
        carrossel.style.transform = `translateX(${translateX}px)`;

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarrossel();
    }

    function nextSlide() {
        const maxIndex = Math.ceil(cards.length / cardsPerView) - 1;
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarrossel();
        }
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarrossel();
        }
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    window.addEventListener('resize', () => {
        const newCardsPerView = window.innerWidth < 968 ? 1 : 2;
        if (newCardsPerView !== cardsPerView) {
            dotsContainer.innerHTML = '';
            for (let i = 0; i < Math.ceil(cards.length / newCardsPerView); i++) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (i === currentIndex) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    goToSlide(i);
                });
                dotsContainer.appendChild(dot);
            }

            updateCarrossel();
        }
    });

    updateCarrossel();
});