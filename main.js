#!/usr/bin nodejs

// package stuff
const express = require('express');
const path = require("path");
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const movieRouter = require("./routes/movie_routing");

// database stuff
const file = "./theatre.db";
const exists = fs.existsSync(file);
if (!exists) {
    fs.openSync(file, "w");
}
const db = new sqlite3.Database(file);
let movies;

// server stuff
const app = express();
//const staticPath = path.join(__dirname, "static");
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "pug");

// Allows pug to use files in the Media folder
app.use("/media", express.static(path.join(__dirname, 'media')));
app.use("/scripts", express.static(path.join(__dirname, 'scripts')));


app.use("/movie", movieRouter);


//app.use(express.static(staticPath));

console.log("starting server");
app.get('/', function (req, res) {

    let page = req.query.page

    res.render('index', {
        // movies: movies.slice((page - 1) * 10, page * 10),
        page: page
    })
});

app.get('/getMovies', function(req, res) {
    db.serialize(function() {

        db.all('SELECT * FROM movies', [], (err, rows) => {
            if (err) return console.error(err.message);
            // rows.forEach((row) => {
            //     console.log(row);
            // });
            movies = rows;
            addGenresToMovies();
        })
    })

    res.json(movies);
})

app.use(logger);
app.listen(8041);

function logger(req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
}

function getMovies() {
    return movies;
}

function addGenresToMovies () {
    movies.forEach(movie => {
        db.all(`SELECT genre FROM genres WHERE movie_id = ${movie.id}`, [], (err, rows) => {
            if (err) return console.error(err.message);

            // rows is an array of objects, let's turn it into an array of strings
            for (let i = 0; i < rows.length; i++) {
                rows[i] = rows[i].genre
            }
            movie.genres = rows;
            //console.log(movie);
        })
    })
}

function getMovieData() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM movies', [], (err, rows) => {
            if (err) return console.error(err.message);
            // rows.forEach((row) => {
            //     console.log(row);
            // });
            movies = rows;
            rows.forEach(movie => {
                db.all(`SELECT genre FROM genres WHERE movie_id = ${movie.id}`, [], (err, rows) => {
                    if (err) return console.error(err.message);

                    // rows is an array of objects, let's turn it into an array of strings
                    for (let i = 0; i < rows.length; i++) {
                        rows[i] = rows[i].genre
                    }
                    movie.genres = rows;
                    //console.log(movie);
                })
            });
        });
    });
}

module.exports = getMovies();