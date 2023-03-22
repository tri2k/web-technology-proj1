#!/usr/bin nodejs

// package stuff
const express = require('express');
const path = require("path");
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();

// database stuff
const file = "./theatre.db";
const exists = fs.existsSync(file);
if (!exists) {
    fs.openSync(file, "w");
}
const db = new sqlite3.Database(file);
let movies;
let genres;

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
        })
    });
    db.close();
}
// server stuff
const app = express();
//const staticPath = path.join(__dirname, "static");
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "pug");

// Allows pug to use files in the Media folder
app.use("/media", express.static(path.join(__dirname, 'media')));
//app.use(express.static(staticPath));


console.log("starting server");
app.get('/', function (req,res) {
    //res.sendFile(path.join(__dirname, 'static', 'home.html'));
    res.render('index', { movies: movies, genres: genres })
});
app.use(logger);
app.listen(8041);


function createTables() {
    tableStatements = [];
    tableStatements.push('CREATE TABLE movies(id INTEGER PRIMARY KEY, title STRING, poster_path STRING, description STRING)');
    tableStatements.push('CREATE TABLE genres(movie_id INTEGER, genre STRING, PRIMARY KEY (movie_id, genre), FOREIGN KEY (movie_id) REFERENCES movies (id))')

    tableStatements.forEach(statement => dbRunStatement(statement));
}

function fillTables() {
    movieStatement = 'INSERT INTO movies(title, poster_path, description) VALUES (?,?,?)';
    genreStatement = 'INSERT INTO genres(movie_id, genre) VALUES (?,?)';

    movieData = [];
    genreData = [];
    movieData.push(["Avatar: The Way of Water", "Media/avatar.jpg", "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home."]);
    genreData.push([1, "Action"]);
    genreData.push([1, "Adventure"]);
    genreData.push([1, "Fantasy"]);
    movieData.push(["Avatar 2", "Media/curtis.png", "MOVIE INFORMATION WOOOOOOOOOOOOOOOOOOOOO"]);
    genreData.push([2, "Action"]);
    genreData.push([2, "Adventure"]);
    genreData.push([2, "Fantasy"]);
    movieData.push(["Avatar 3", "Media/curtis.png", "MOVIE INFORMATION WOOOOOOOOOOOOOOOOOOOOO"]);
    genreData.push([3, "Action"]);
    genreData.push([3, "Adventure"]);
    genreData.push([3, "Fantasy"]);
    movieData.push(["Avatar 4", "Media/curtis.png", "MOVIE INFORMATION WOOOOOOOOOOOOOOOOOOOOO"]);
    genreData.push([4, "Action"]);
    genreData.push([4, "Adventure"]);
    genreData.push([4, "Fantasy"]);

    movieData.forEach(params => dbRunStatement(movieStatement, params));
    genreData.forEach(params => dbRunStatement(genreStatement, params));
}

function dbRunStatement(statement, params) {
/*     console.log(statement);
    console.log(params); */
    db.run(statement, params, err => {
        if (err) return console.error(err.message);
    })
}

function logger(req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
}