class Movie {
    constructor(movieObject) {
        this.id = movieObject.id;
        this.title = movieObject.title;
        this.posterPath = movieObject.poster_path;
        this.rating = movieObject.rating;
        this.audienceRating = movieObject.audience_rating;
        this.language = movieObject.language;
        this.subtitles = movieObject.subtitles;
        this.description = movieObject.description;
        this.genreList = movieObject.genres;

        let hours = Math.floor(movieObject.duration_minutes / 60);
        let minutes = movieObject.duration_minutes % 60;
        let timeMovie = "";
        if (hours > 0) timeMovie += hours + " H ";

        timeMovie += minutes + " MIN";

        this.duration = timeMovie;
    }
}

let movie;

const urlParams = window.location.pathname.slice(-2).match(/\d+/)[0];


let req = new XMLHttpRequest();
req.open('GET', `../getMovie?id=${urlParams}`, true);
req.onreadystatechange = function () {
    if (req.readyState === 4 && req.status === 200) {
        movieResponse = JSON.parse(req.responseText);
        console.log(movieResponse); // DEBUG LOG MOVIE RESPONSE
        movie = new Movie(movieResponse);
        fillWebsite();

    }
}

req.send();

function fillWebsite() {
    
const sectionNode = document.createElement('section');
sectionNode.classList.add('single-movie');

const posterNode = document.createElement('img');
posterNode.classList.add('single-movie__poster');
posterNode.src = `../../${movie.posterPath}`;
sectionNode.appendChild(posterNode);

const titleNode = document.createElement('h1');
titleNode.classList.add('single-movie__title');
const titleText = document.createTextNode(movie.title);
titleNode.appendChild(titleText);
sectionNode.appendChild(titleNode);

const infoNode = document.createElement('ul');
infoNode.classList.add('single-movie__info');
sectionNode.appendChild(infoNode);

const durationNode = document.createElement('li');
durationNode.classList.add('single-movie__info-item');
const durationText = document.createTextNode(movie.duration);
durationNode.appendChild(durationText);
infoNode.appendChild(durationNode);

const audienceRatingNode = document.createElement('li');
audienceRatingNode.classList.add('single-movie__info-item');
const audienceRatingText = document.createTextNode(movie.audienceRating);
audienceRatingNode.appendChild(audienceRatingText);
infoNode.appendChild(audienceRatingNode);

const languageNode = document.createElement('li');
languageNode.classList.add('single-movie__info-item');
const languageText = document.createTextNode(movie.language.toUpperCase());
languageNode.appendChild(languageText);
infoNode.appendChild(languageNode);

const subtitlesNode = document.createElement('li');
subtitlesNode.classList.add('single-movie__info-item');
const subtitlesText = document.createTextNode(movie.subtitles == 1 ? "SUBTITLES" : "NO SUBTITLES");
subtitlesNode.appendChild(subtitlesText);
infoNode.appendChild(subtitlesNode);

const ratingNode = document.createElement('li');
ratingNode.classList.add('single-movie__info-item');
const ratingText = document.createTextNode(movie.rating + "/100");
ratingNode.appendChild(ratingText);
infoNode.appendChild(ratingNode);

const genresListNode = document.createElement('ul');
genresListNode.classList.add('single-movie__genres-list');
infoNode.appendChild(genresListNode);

movie.genreList.forEach(genre => {
  const genreNode = document.createElement('li');
  genreNode.classList.add('single-movie__genre');
  const genreText = document.createTextNode(genre.toUpperCase());
  genreNode.appendChild(genreText);
  genresListNode.appendChild(genreNode);
});

const descriptionNode = document.createElement('p');
descriptionNode.classList.add('single-movie__description');
const descriptionText = document.createTextNode(movie.description);
descriptionNode.appendChild(descriptionText);
sectionNode.appendChild(descriptionNode);

// Finally, add the section to the body
const body = document.querySelector('body');
body.appendChild(sectionNode);
}
