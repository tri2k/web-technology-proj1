class Movie {
    constructor(movieObject) {
        this.id = movieObject.id;
        this.title = movieObject.title;
        this.posterPath = movieObject.poster_path;
        this.rating = movieObject.rating;
        this.audienceRating = movieObject.audience_rating;
        this.language = movieObject.language;
        this.subtitles = movieObject.subtitles;
        this.durationMinutes = movieObject.duration_minutes;
        this.description = movieObject.description;
        this.genreList = movieObject.genres;
    }
}

let movieList = [];

const urlParams = new URLSearchParams(window.location.search);
let currentPage = urlParams.get('page');
if (currentPage != 2) {
  currentPage = 1;
}

let req = new XMLHttpRequest();
req.open('GET', `movies/getMovies?page=${currentPage}`, true);
req.onreadystatechange = function () {
    if (req.readyState === 4 && req.status === 200) {
        movieListResponse = JSON.parse(req.responseText);
        console.log(movieListResponse);
        for (let i = 0; i < movieListResponse.length; i++) {
            movieList.push(new Movie(movieListResponse[i]));
            console.log(movieList);
        }
        //console.log(movieList);

        fillWebsite();

    }
}

req.send();

const movieListElement = document.querySelector('.movies-list');

function fillWebsite() {
    movieList.forEach(movie => addMovie(movie));
}

function addMovie(movie) {
    const movieElement = document.createElement('a');
    movieElement.classList.add('movies-list__movie');
    movieElement.href = `/movies/movie/${movie.id}`;

    const titleElement = document.createElement('h2');
    titleElement.classList.add('movie__title');
    titleElement.textContent = movie.title;

    const posterElement = document.createElement('img');
    posterElement.classList.add('movie__poster');
    posterElement.src = "../" + movie.posterPath;

    movieElement.appendChild(titleElement);
    movieElement.appendChild(posterElement);
    movieListElement.appendChild(movieElement);
}