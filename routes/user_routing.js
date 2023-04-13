var express = require("express");
const sqlite3 = require("sqlite3").verbose();
const file = "./theatre.db";
var router = express.Router();
const db = new sqlite3.Database(file);

router.get("/register", function(req, res) {

    
    res.render('register')
})

module.exports = router;