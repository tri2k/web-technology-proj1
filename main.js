
// package stuff
const express = require('express');
const path = require("path");
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const movieDatabase = require("./database")
let session = require('express-session');
const movieRouter = require("./routes/movie_routing");
const userRouter = require("./routes/user_routing");
const orderRouter = require("./routes/order_routing");


// database stuff
movieDatabase();
const file = "./theatre.db";
db = new sqlite3.Database(file);

// server stuff
const app = express();


app.use(logger);

// setup session
app.use(session({
	secret: 'florisjonathanshady',
	resave: true,
	saveUninitialized: false,
    cookie: { maxAge: 60*60*24*30}

}));
app.use(express.json());
//const staticPath = path.join(__dirname, "static");
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "pug");

// Allows pug to use files in the Media folder
app.use("/media", express.static(path.join(__dirname, 'media')));
app.use("/scripts", express.static(path.join(__dirname, 'scripts')));


app.use("/movies", movieRouter);
app.use("/", userRouter);
app.use("/order", orderRouter);


//app.use(express.static(staticPath));

console.log("starting server");

app.get('/', function(req, res) {
    let user //= true;
    if (req.session.loggedin) user = true
    res.render('index', {user});
})

app.get('/error', function(req, res) {
    let user //= true;
    if (req.session.loggedin) user = true
    res.render('error', {})
})

app.get('*', function(req, res) {
    let user //= true;
    if (req.session.loggedin) user = true
    res.render('index', {})
});


function logger(req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
}

app.listen(8041);