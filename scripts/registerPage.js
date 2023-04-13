// quickly messed around with this when the deadline was still friday

const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#password-2');
const button = document.querySelector('.register-section__button');

button.addEventListener('click', buttonClicked, true);

function buttonClicked(e) {
    checkPasswords();
    checkUnique();
}

function checkPasswords() {
    if (confirmPassword.value !== password.value) {
        confirmPassword.setCustomValidity('Passwords must match');
    } else {
        confirmPassword.setCustomValidity('');
    }
}

function checkUnique() { // checks whether the username and email inputs are unique
    let XMLHttpRequest
}

