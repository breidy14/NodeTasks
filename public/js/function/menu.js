const btnMenu = document.querySelector('.toggle-btn');
let menu = document.querySelector('.wrapper');

btnMenu.addEventListener('click', e => {
    menu.classList.toggle('aparecer');
})