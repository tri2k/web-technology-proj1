const movieButton = document.querySelector('#movie-button');
const dateButton = document.querySelector('#date-button');
const confirmationButton = document.querySelector('#confirm-button');

const movieSelect = document.querySelector('#movie-select');
const dateSelect = document.querySelector('#date-select');

const movieSection = document.querySelector('.order__movie');
const dateSection = document.querySelector('.order__date');
const confirmationSection = document.querySelector('.order__confirm');

const movieInput = document.querySelector('#movie_id');
const dateInput = document.querySelector('#date');

const message = document.querySelector('.order__message');

movieButton.addEventListener('click', movieClicked, true);
dateButton.addEventListener('click', dateClicked, true);

let movieTitle;

function movieClicked (e) {
    movieSection.classList.add('order--hidden')
    dateSection.classList.remove('order--hidden');
    movieInput.value = movieSelect.value;
}

function dateClicked (e) {
    dateSection.classList.add('order--hidden')
    confirmationSection.classList.remove('order--hidden');
    dateInput.value = dateSelect.value;

    message.textContent += "You are about to purchase a ticket at the date " + dateSelect.value + ".";

    sendData();
}

function sendData() {
    let req = new XMLHttpRequest();
    req.open("POST", "/group41/order/make-order" , true);
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {

        }
    }
    //req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify({movie_id: movieInput.value, date: dateInput.value}));
}