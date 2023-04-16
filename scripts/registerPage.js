// quickly messed around with this when the deadline was still friday

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

// function checkUnique() { // checks whether the username and email inputs are unique
//     emailInput = email.value;
//     usernameInput = username.value;
//     let XMLHttpRequest = xhr;
//     let uniqueEmail = false;
//     let uniqueUsername = false;
//     req.open('GET', `/getUserAndEmail?username=${emailInput}&email=${usernameInput}`, true);
//     req.onreadystatechange = function () {
//     if (req.readyState === 4 && req.status === 200) {
//         userResponse = JSON.parse(req.responseText);
//         console.log(req.responseText);
//         if (userResponse.email === 'false') {
//             uniqueEmail = true;
//         }
//         if (userResponse.username === 'false') {
//             uniqueUsername = true;
//         }
//     }

//     console.log(uniqueEmail);
//     console.log(uniqueUsername);
//     }
// }
