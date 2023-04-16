// 

const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#password-2');
const button = document.querySelector('.register-section__button');
const email = document.querySelector('#email');
const username = document.querySelector('#username');
const form = document.querySelector('#form');


button.addEventListener('click', checkPasswords, true);

function checkPasswords(e) {
    if (confirmPassword.value !== password.value) {
        confirmPassword.setCustomValidity('Passwords must match');
    } else {
        confirmPassword.setCustomValidity('');
    }
}
