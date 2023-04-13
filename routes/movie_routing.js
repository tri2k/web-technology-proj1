var express = require("express");
const sqlite3 = require("sqlite3").verbose();
const file = "./theatre.db";
var router = express.Router();
const db = new sqlite3.Database(file);

router.get('/', function (req, res) {

    let page = req.query.page

    res.render('movies', {
        page: page
    })
});

router.get('/getMovies', function(req, res) {
    db.serialize(function() {
        let page = req.query.page;
        let offset = (page - 1) * 10;
        let movies;
        db.all('SELECT * FROM movies LIMIT ? OFFSET ?', [page * 10, offset], (err, rows) => {
            if (err) return console.error(err.message);
            // rows.forEach((row) => {
            //     console.log(row);
            // });
            movies = rows;
            addGenresToMovies(movies);
        })
    })

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
                if (i == movies.length) {
                    sendMovies(movies);
                }
            })
        })
    }


    function sendMovies(movies) {
        console.log(movies);
        res.json(movies);
    }
})

router.get(("/movie/:id([0-9]*$)"), (req, res, next) => {
    db.get(`SELECT * FROM movies WHERE id = ${req.params.id}`, [], (err,row) => {
        if (err) return console.error(err.message);

        if (!row)
            {
                next();
            }
        else {
            db.all('SELECT genre FROM genres WHERE movie_id = ?', [row.id], (err, rows) => {
                if (err) return console.error(err.message);
                // rows is an array of objects, let's turn it into an array of strings
                for (let i = 0; i < rows.length; i++) {
                    rows[i] = rows[i].genre
                }
                row.genres = rows;
                //console.log(movie);
                movie = new Movie(row);
                res.render('movie', {movie});
            })
        }
    })
});

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