// standard module setup. This is the page for the /group41/order paths. /order and /order/make-order are here
var express = require("express");
const sqlite3 = require("sqlite3").verbose();
const file = "./theatre.db";
let session = require('express-session');
let parseUrl = require('body-parser');
var router = express.Router();
const db = new sqlite3.Database(file);

// encoding URL for body-parser
let encodeUrl = parseUrl.urlencoded({ extended: false});

// /group41/order path to make an order
router.get('', function(req, res) {
    if (!req.session.loggedin) res.redirect("/group41/error")
    let movies = [];
    let dates = giveDates();

    // db serialize
    db.serialize(function() {
        // gets all movies to display in order page
        db.all('SELECT * FROM movies', [], (err, rows) => {
            if (err) return console.error(err.message);
            // gets movie class list
            rows.forEach(movie => {
                movies.push(new Movie(movie));
            })
            let user //= true;
            if (req.session.loggedin) user = true
            // renders order list with movies and possible dates
            res.render('order', {movies, dates, user});
        })
    })
})

// group41/order/make-order post request
router.post('/make-order', encodeUrl, function(req,res) {
    // gets movie and date from page
    let movieID = req.body.movie_id;
    let date = req.body.date;
    //console.log("movieID: " + movieID);

    db.serialize(function () {
        db.get('SELECT id FROM users WHERE username = ?', [req.session.username], (err, row) => {
            if (err) return console.error(err.message);

            if (!row) res.redirect('/group41/error') // redirects if there was no row
            if (row) {
                let userID = row.id
                // makes order in orders table
                db.run('INSERT INTO orders(user_id, movie_id, date) VALUES (?, ?, ?)', [userID, movieID, date], err => {
                    if (err) return console.error(err.message);
                    
                    // redirect to orders list after putting in db
                    res.redirect('/group41/user/orders')
                })
            }
        })
    })

})

// generates a very real and not random date list
function giveDates() {
    dateList = [];
    var currentDate = new Date();
    for (i = 1; i < 8; i++) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + i);
        let tomorrowString = tomorrow.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
        tomorrowString += ' ';
        tomorrowString += 16 + (17*i)%6 + ':00';
        dateList.push(tomorrowString);
    }

    return dateList
}

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
        this.durationMinutes = movieObject.duration_minutes;
        this.description = movieObject.description;
        this.genreList = movieObject.genres;
    }
}

module.exports = router;