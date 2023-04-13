#!/usr/bin nodejs

// package stuff
const express = require('express');
const path = require("path");
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const movieDatabase = require("./database")
const movieRouter = require("./routes/movie_routing");
const userRouter = require("./routes/user_routing");


// database stuff
movieDatabase();
const file = "./theatre.db";
db = new sqlite3.Database(file);

// server stuff
const app = express();
//const staticPath = path.join(__dirname, "static");
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "pug");

// Allows pug to use files in the Media folder
app.use("/media", express.static(path.join(__dirname, 'media')));
app.use("/scripts", express.static(path.join(__dirname, 'scripts')));


app.use("/movies", movieRouter);
app.use("/", userRouter)


//app.use(express.static(staticPath));

console.log("starting server");

app.get('*', function(req, res) {
    res.send("hi");
});

app.use(logger);
app.listen(8041);

function logger(req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
}