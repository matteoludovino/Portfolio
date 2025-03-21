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