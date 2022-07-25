let headerBurger = document.querySelector('.header__burger');

let navigationBurgerClose = document.querySelector('.navigation__burger');

let headerNav = document.querySelector('.header__navigation');

let navigationLink = document.querySelectorAll('.navigation__link a');

let bodyPage = document.querySelector('body');

let bodyHidden = document.querySelector('.body-hidden');

headerBurger.addEventListener('click', function(e) {
    headerNav.classList.add('active');
    bodyPage.classList.add('lock');
    bodyHidden.classList.add('body-hidden_active');
});

navigationBurgerClose.addEventListener('click', function(e) {
    headerNav.classList.remove('active');
    bodyPage.classList.remove('lock');
    bodyHidden.classList.remove('body-hidden_active');
});

bodyHidden.addEventListener('click', function(e) {
    headerNav.classList.remove('active');
    bodyPage.classList.remove('lock');
    bodyHidden.classList.remove('body-hidden_active');
});

for (let i = 0; i < navigationLink.length; i++) {
    navigationLink[i].addEventListener('click', function(e) {
        headerNav.classList.remove('active');
        bodyPage.classList.remove('lock');
        bodyHidden.classList.remove('body-hidden_active');
    });
}



