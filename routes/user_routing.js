// Routing for group41/. The list of routes are: /register, /user, /login, /user/orders, and /logout
var express = require("express");
const sqlite3 = require("sqlite3").verbose();
const file = "./theatre.db";
let session = require('express-session');
let parseUrl = require('body-parser');
var router = express.Router();
const db = new sqlite3.Database(file);

// encodeUrl used for post requests in order to retrieve form information
let encodeUrl = parseUrl.urlencoded({ extended: false});

// setup session
router.use(session({
	secret: 'florisjonathanshady',
	resave: true,
	saveUninitialized: false,
    cookie: { maxAge: 60*60*24*30}

}));
router.use(express.json());

// /register page
router.get("/register", function(req, res) {
    // Empty user given so that the page has something to fill the options with. This is how we are handling saving previous input
    let emptyUser = new User('', '', '', '', '', '', '');
    res.render('register', {user: emptyUser})
})

// Post /register to make an account
router.post("/register", encodeUrl, function(req, res) {
    // redirect to error if already logged in
    if (req.session.loggedin) res.redirect('/group41/error');

    // retrieving form data
    let email = req.body.email;
    let name = req.body.name;
    let username = req.body.username;
    let password = req.body.password;
    let creditCardNum = req.body.credit_card;
    let expirationDate = req.body.expiration_date;
    let address = req.body.address;

    // making user
    user = new User(email, name, username, password, address, creditCardNum, expirationDate);

    // checks whether email and username are unique, if not => return to register with an error
    db.serialize(function () {
        // gets email if there is one in db already
        db.get("SELECT email FROM users WHERE email = ?", [email], (err, emailRow) => {
            if (err) return console.error(err.message);
            // same as before but with username
            db.get("SELECT username FROM users WHERE username = ?", [username], (err, usernameRow) => {
                if (err) return console.error(err.message);
    
                // emailRow OR usernameRow => email or username already exists
                if (emailRow || usernameRow) {

                    // Error message generation
                    let error = "The given "
                    if (emailRow) {
                        error += "email "
                        if (usernameRow) {
                            error += "and "
                        }
                    }
                    if (usernameRow) {
                        error += "username "
                    }
                    error += "already exist"
                    if (!(usernameRow && emailRow)) {
                        error += "s"
                    }
                    error += "!"
                    // gives user so that previous form data was not lost
                    res.render('register', {user, error})
                }
                else {
                    //console.log(user.toList()); // LOG USER INFO FOR DEBUGGING

                    // makes user
                    db.run('INSERT INTO users(email, name, username, password, address, card_number, expiration_date) VALUES (?,?,?,?,?,?,?)', user.toList(), err => {
                        if (err) return console.error(err.message);
                        else {
                            // Creates session for user to stay logged in
                            req.session.loggedin = true;
                            req.session.username = username;
                            //console.log("/register req.session.loggedin: " + req.session.loggedin); // DEBUG SHOW SESSION LOGIN    
                            
                            // redirect to homepage
                            res.redirect('/group41/');
                        }
                    })
                }
            })
        })
    })
})

// get /user. To display user information
router.get("/user", function(req, res) {
    if (!req.session.loggedin) res.redirect("/group41/error");
    db.serialize(function () {
        db.get('SELECT * FROM users WHERE username = ?', [req.session.username], (err, row) => {
            if (err) return console.error(err.message);
            //let user = new User('', '', '', '', '', '', '');
            //if (row) {
                let user = new User(row.email, row.name, row.username, row.password, row.address, row.creditCardNum, row.expirationDate);
                //res.render('userinfo', {user})
            //} 
            res.render('userinfo', {user})
        })
    })
})

// login page. If already logged in => error
router.get("/login", function(req, res) {
    if (req.session.loggedin) res.redirect('/group41/error');

    res.render('login')
})

// login post to check if data is correct
router.post("/login", encodeUrl, function(req, res) {
    // form information
    const username = req.body.username;
    const password = req.body.password;

    // db serialize
    db.serialize(function () {
        db.get('SELECT username FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
            if (err) return console.error(err.message);
            // if result (row) found => they successfully logged in!
            if (row) {
                // set session up
                req.session.loggedin = true;
                req.session.username = username;
                // go to homepage
                res.redirect("/group41/");
            } else { // No row? Back to login with username and password still filled in, but now with an error
                res.render('login', {error: 'Invalid username or password.', username, password})
            }
        })
    })
})

// user/orders
router.get('/user/orders', function(req, res) {
    // redirect to error page if not logged in
    if (!req.session.loggedin) res.redirect("/group41/error")

    // db serialize
    db.serialize(function () {
        // gets id from username
        db.get('SELECT id FROM users WHERE username = ?', [req.session.username], (err,row) => {
            if (err) return console.error(err.message);
            // row exists? then output the orders they have along with the movie id and date
            if (row) {
                db.all('SELECT * FROM orders WHERE user_id = ?', [row.id], (err,rows) => {
                    if (err) return console.error(err.message);
                    //console.log(rows);
                    
                    res.render('orders', {orders: rows, user: req.session.loggedin});
                })
            }
        })
    })
})

// Logout get request
router.get('/logout', function(req, res) {
    req.session.loggedin = false;

    // Redirect user back to home page
    res.redirect('/group41/');
  });


  // user class
class User {
    constructor(email, name, username, password, address, creditCardNum, expirationDate) {
        this.email = email;
        this.name = name;
        this.username = username;
        this.password = password;
        this.address = address;
        this.creditCardNum = creditCardNum;
        this.expirationDate = expirationDate;
    }
    // gets list from user data
    toList() {
        let list = [];
        list.push(this.email);
        list.push(this.name);
        list.push(this.username);
        list.push(this.password);
        list.push(this.address);
        list.push(this.creditCardNum);
        list.push(this.expirationDate);

        return list;
    }
}
module.exports = router;