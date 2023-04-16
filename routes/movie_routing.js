// movie routes /group41/movies. /, /movie/:id are here

var express = require("express");
const sqlite3 = require("sqlite3").verbose();
const file = "./theatre.db";
let session = require('express-session');
var router = express.Router();
const db = new sqlite3.Database(file);

// setup session
router.use(session({
	secret: 'florisjonathanshady',
	resave: true,
	saveUninitialized: false,
    cookie: { maxAge: 60*60*24*30}

}));
router.use(express.json());

// movies list. Movies are divided into 2 pages
router.get('/', function (req, res) {

    // gets page from URL
    let page = req.query.page
    let user //= true;
    // gets whether user is logged in
    if (req.session.loggedin) user = true
    res.render('movies', {
        page: page,
        user: user
    })
});

// getMovies used in movies to get the list of movies to display
router.get('/getMovies', function(req, res) {
    db.serialize(function() {
        // gets page
        let page = req.query.page;
        // gets the offset used for the db statement
        let offset = (page - 1) * 10;
        let movies;
        // gets either movies 1-10 or 11-20
        db.all('SELECT * FROM movies LIMIT ? OFFSET ?', [page * 10, offset], (err, rows) => {
            if (err) return console.error(err.message);
            // rows.forEach((row) => {
            //     console.log(row);
            // });
            movies = rows;
            // adds genres to movies
            addGenresToMovies(movies);
        })
    })

    // adds genres to movies
    function addGenresToMovies(movies) {
        let i = 0;
        movies.forEach(movie => {
            db.all('SELECT genre FROM genres WHERE movie_id = ?', [movie.id], (err, rows) => {
                if (err) return console.error(err.message);
                
                i++;
                // rows is an array of objects, let's turn it into an array of strings
                for (let i = 0; i < rows.length; i++) {
                    rows[i] = rows[i].genre
                }
                movie.genres = rows;
                //console.log(movie);
                // if last genre added, go to sendMovies to return movies
                if (i == movies.length) {
                    sendMovies(movies);
                }
            })
        })
    }

    // returns movies
    function sendMovies(movies) {
        //console.log(movies); // DEBUG LOG MOVIES
        res.json(movies);
    }
});

// get single movie for /movies/movie
router.get("/getMovie", function (req, res){
    // gets movieID
    let movieID = req.query.id;

    // db serialize
    db.serialize(function() {
        // gets movies
        db.get('SELECT * FROM movies WHERE id = ?', [movieID], (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            // no row => error
            if (!row) res.redirect('/group41/error');
            let movie = row;

            // gets genres for particular movie
            db.all('SELECT genre FROM genres WHERE movie_id = ?', [movieID], (err, rows) => {
                if (err)  {
                    res.redirect('/group41/error');
                    return console.error(err.message);
                }
                // rows is an array of objects, let's turn it into an array of strings
                for (let i = 0; i < rows.length; i++) {
                    rows[i] = rows[i].genre
                }
                movie.genres = rows;
                //console.log(movie);
                // sends movie
                sendMovie(movie);
            })
        })
    })

    // sends movie
    function sendMovie(movie) {
        console.log(movie); // DEBUG LOG MOVIE
        res.json(movie);
    }
})

// gets only movies with numbers as id
router.get(("/movie/:id([0-9]*$)"), (req, res) => {
    db.get(`SELECT * FROM movies WHERE id = ${req.params.id}`, [], (err,row) => {
        if (err) {
            return console.error(err.message)
        } 
        if (!row) {
            res.redirect('/group41/error');
        } else {
            db.all('SELECT genre FROM genres WHERE movie_id = ?', [row.id], (err, rows) => {
                if (err) return console.error(err.message);
                // rows is an array of objects, let's turn it into an array of strings
                for (let i = 0; i < rows.length; i++) {
                    rows[i] = rows[i].genre
                }
                row.genres = rows;
                //console.log(movie); //DEBUG TO SHOW MOVIE
                movie = new Movie(row);
                let user //= true;
                if (req.session.loggedin) user = true
                res.render('movie', {movie, user});
            })
        }
    })
});

// movie class
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
module.exports = router;