var express = require("express");

// const fs = require("fs");
// const sqlite3 = require("sqlite3").verbose();
// const file = "./theatre.db";
// const exists = fs.existsSync(file);
// if (!exists) {
//     fs.openSync(file, "w");
// }
// const db = new sqlite3.Database(file);

var router = express.Router();

router.get("test"), function(req, res) {
    // db.get("SELECT * FROM movies WHERE movie_id =", 1, [], (err,row) => {
    //     if (err) return console.error(err.message);
    //     movie = row;
    // })
    res.send("hi");
}

module.exports = router;