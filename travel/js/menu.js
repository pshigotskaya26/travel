let headerBurger = document.querySelector('.header__burger');
let navigationBurgerClose = document.querySelector('.navigation__burger');
let headerNav = document.querySelector('.header__navigation');
let navigationLink = document.querySelectorAll('.navigation__link a');
let bodyPage = document.querySelector('body');
let bodyHidden = document.querySelector('.body-hidden');
let butLogin = document.querySelector('.header__button button');
let butInForm = document.querySelector('.modal-login__form button');
let modalLogin = document.querySelector('.modal-login');
let popup = document.querySelector('.popup');
let modalLinksItem = document.querySelectorAll('.modal-links__item');
let toggleInnerText = function(element, text) {
    element.innerHTML = text;
};

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

        if (navigationLink[i].innerHTML === 'Account') {
            modalLogin.classList.add('active');
            popup.classList.toggle('hidden');
            bodyPage.classList.add('lock');
        }
    });
}

butLogin.addEventListener('click', function() {
    modalLogin.classList.add('active');
    popup.classList.toggle('hidden');
    bodyPage.classList.add('lock');
});

popup.addEventListener('click', function() {
    popup.classList.toggle('hidden');
    bodyPage.classList.toggle('lock');
    modalLogin.classList.toggle('active');
});

butInForm.addEventListener('click', function() {
    let valFromEmailInput= document.querySelector('.form__email input').value;
    let valFromPassInput= document.querySelector('.form__password input').value;

    if (!valFromEmailInput || !valFromPassInput) {
        alert('Заполните все поля');
    }
    else {
        alert('E-mail: ' + valFromEmailInput + '\n' + 'Password: ' + valFromPassInput);
    }  
});

modalLinksItem[1].addEventListener('click', function() {
    let modalLinksItemVal1 = modalLinksItem[1].innerHTML;
    let parentModLinksItem1 = modalLinksItem[1].parentNode;
    let modalLoginAccountH4 = document.querySelector('.modal-login__account h4');
    let modalLoginAccount = document.querySelector('.modal-login__account');
    let modalLoginForm = document.querySelector('.modal-login__form');
    modalLoginAccount.classList.toggle('login');
    modalLoginForm.classList.toggle('login');
    
    if (modalLinksItemVal1 === 'Register') {
        toggleInnerText(modalLinksItem[1], 'Log in');
        parentModLinksItem1.firstChild.nodeValue = 'Already have an account? ';
        toggleInnerText(modalLoginAccount.children[0], 'Create account');
        modalLoginAccount.children[1].classList.add('hidden');
        modalLoginAccount.children[2].classList.add('hidden');
        modalLogin.querySelector('.separator').classList.add('hidden');
        toggleInnerText(modalLogin.querySelector('.button'), 'Sign Up');
        modalLogin.querySelectorAll('.modal-links__item')[0].classList.add('hidden');
    }

    if (modalLinksItemVal1 === 'Log in') {
        toggleInnerText(modalLinksItem[1], 'Register');
        parentModLinksItem1.firstChild.nodeValue = 'Don’t have an account? ';
        toggleInnerText(modalLoginAccount.children[0], 'Log in to your account');
        modalLoginAccount.children[1].classList.remove('hidden');
        modalLoginAccount.children[2].classList.remove('hidden');
        modalLogin.querySelector('.separator').classList.remove('hidden');
        toggleInnerText(modalLogin.querySelector('.button'), 'Sign In');
        modalLogin.querySelectorAll('.modal-links__item')[0].classList.remove('hidden');
    }
});








