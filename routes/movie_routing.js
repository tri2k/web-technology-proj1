var express = require("express");

const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const file = "./theatre.db";
const exists = fs.existsSync(file);
if (!exists) {
    fs.openSync(file, "w");
}
const db = new sqlite3.Database(file);
var router = express.Router();
let movie = "hi";
router.get(("/:id"), (req, res) => {
    console.log(req.params.id);
    db.get(`SELECT * FROM movies WHERE id = ${req.params.id}`, [], (err,row) => {
        if (err) return console.error(err.message);
        movie = row;
        res.send(row);
    })
});

module.exports = router;