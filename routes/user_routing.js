var express = require("express");
const sqlite3 = require("sqlite3").verbose();
const file = "./theatre.db";
let session = require('express-session');
let parseUrl = require('body-parser');
var router = express.Router();
const db = new sqlite3.Database(file);

let encodeUrl = parseUrl.urlencoded({ extended: false});

router.use(session({
	secret: 'florisjonathanshady',
	resave: true,
	saveUninitialized: false,
    cookie: { maxAge: 60*60*24*30}

}));
router.use(express.json());

router.get("/register", function(req, res) {


    res.render('register')
})

router.post("/register", encodeUrl, function(req, res) {
    let email = req.body.email;
    let name = req.body.name;
    let username = req.body.username;
    let password = req.body.password;
    let creditCardNum = req.body.credit_card;
    let expirationDate = req.body.expiration_date;
    let address = req.body.address;

    user = new User(email, name, username, password, address, creditCardNum, expirationDate);
    //console.log(user.toList()); // LOG USER INFO FOR DEBUGGING
    db.serialize(function () {
        db.run('INSERT INTO users(email, name, username, password, address, card_number, expiration_date) VALUES (?,?,?,?,?,?,?)', user.toList(), err => {
            if (err) return console.error(err.message);
            else res.redirect('/user');
        })
    })
    req.session.loggedin = true;
    req.session.username = username;
    console.log(req.session.loggedin);

})

router.get("/user", function(req, res) {

})

// router.get("/getUserAndEmail", function(req, res) {

//     const username = req.params.username;
//     const email = req.params.email;

//     db.serialize(function () {
//         db.get('SELECT email FROM users WHERE email = ?', [email], (err, emailRow) => {
//             if (err) return console.error(err.message);

//             db.get('SELECT username FROM users WHERE username = ?', [username], (err, usernameRow) => {
//                 if (err) return console.error(err.message);
    
//                 res.json({username:!!emailRow, email:!!usernameRow});
//             })
//         })
//     })
// })

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