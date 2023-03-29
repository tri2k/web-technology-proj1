const file = "./theatre.db";
const exists = fs.existsSync(file);
if (!exists) {
    fs.openSync(file, "w");
}
const db = new sqlite3.Database(file);
const test = document.createTextNode("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
const body = document.querySelector("body");
body.append(test);
let movies;

db.serialize(function () {
    if(!exists) {
        createTables();
        fillTables();
    }


    db.all('SELECT * FROM movies', [], (err, rows) => {
        if (err) return console.error(err.message);
        // rows.forEach((row) => {
        //     console.log(row);
        // });

        movies = rows;
        addGenresToMovies();
    });
});

// Add genres array to movies
function addGenresToMovies() {
    movies.forEach(movie => {
        db.all(`SELECT genre FROM genres WHERE movie_id = ${movie.id}`, [], (err,rows) => {
            if (err) return console.error(err.message);

            // rows is an array of objects, let's turn it into an array of strings
            for (let i = 0; i < rows.length; i++) {
                rows[i] = rows[i].genre
            }
            movie.genres = rows;
            console.log(movie);
        })
    });
    db.close();
}

movies = main.getMovies;
console.log(movies.length);

const pageButtons = document.querySelectorAll(".page-button");

pageButtons.forEach(button => button.addEventListener("click", pageButtonClicked, true));

function pageButtonClicked(e) {
    console.log('click');
    let pageNumber = e.currentTarget.firstChild.text;

    const pageButtons = document.querySelectorAll(".page-button");
    pageButtons.forEach(button => button.classList.remove(".page-button--active"));
    e.currentTarget.addClass(".page-button--active");

    switchPage(pageNumber);
}

function switchPage(pageNumber) {
    const moviesPerPage = 10;
    let moviesToShow = movies.slice((pageNumber - 1) * moviesPerPage, pageNumber * moviesPerPage);
    let movieSections = document.querySelectorAll(".movie");
    for (i = 0; i < moviesPerPage; i++) {
        changeMovie(moviesToShow[i], movieSections[i])
    }
}

function changeMovie(movie, section) {
    const title = section.querySelectorAll(".movie__title");
    const titleText = title.firstChild;
    titleText = movie.title;
}