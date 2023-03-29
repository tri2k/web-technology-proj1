const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();

const file = "./theatre.db";
const exists = fs.existsSync(file);
if (!exists) {
    fs.openSync(file, "w");
}
const db = new sqlite3.Database(file);

db.serialize(function () {
    if (!exists) {
        createTables();
        fillTables();
    }
});

let movies = 1;
movies = queryMovies();

function queryMovies() {
    db.all('SELECT * FROM movies', [], (err, rows) => {
        if (err) return console.error(err.message);
        // rows.forEach((row) => {
        //     console.log(row);
        // });

        return addGenresToMovies(rows);
    });
}

function getMovies() {
    return movies;
}

// Add genres array to movies
function addGenresToMovies(movieList) {
    movieList.forEach(movie => {
        db.all(`SELECT genre FROM genres WHERE movie_id = ${movie.id}`, [], (err, rows) => {
            if (err) return console.error(err.message);

            // rows is an array of objects, let's turn it into an array of strings
            for (let i = 0; i < rows.length; i++) {
                rows[i] = rows[i].genre
            }
            movie.genres = rows;
            console.log(movie);
        })
    });
    db.close();
    return movieList
}

function createTables() {
    tableStatements = [];
    tableStatements.push('CREATE TABLE movies(id INTEGER PRIMARY KEY, title TEXT, poster_path TEXT, rating INTEGER, audience_rating TEXT, language TEXT, subtitles INTEGER, duration_minutes INTEGER, description TEXT)');
    tableStatements.push('CREATE TABLE genres(movie_id INTEGER, genre TEXT, PRIMARY KEY (movie_id, genre), FOREIGN KEY (movie_id) REFERENCES movies (id))')

    tableStatements.forEach(statement => dbRunStatement(statement));
}

function fillTables() {
    movieStatement = 'INSERT INTO movies(title, poster_path, rating, audience_rating, language, subtitles, duration_minutes, description) VALUES (?,?,?,?,?,?,?,?)';
    genreStatement = 'INSERT INTO genres(movie_id, genre) VALUES (?,?)';

    movieData = [];
    genreData = [];

    movieData.push(["Avatar: The Way of Water", "media/avatar.jpg", , "PG13", "English", 0, 192, "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home."]);
    genreData.push([1, "Action"]);
    genreData.push([1, "Adventure"]);
    genreData.push([1, "Fantasy"]);

    movieData.push(["Shazam! Fury Of The Gods", "media/shazam.jpg", , "PG13", "English", 0, 130, "The film continues the story of teenage Billy Batson who, upon reciting the magic word \"SHAZAM!\" is transformed into his adult Super Hero alter ego, Shazam."]);
    genreData.push([2, "Action"]);
    genreData.push([2, "Adventure"]);
    genreData.push([2, "Comedy"]);

    movieData.push(["Ant-Man and the Wasp: Quantumania", "media/ant-man.jpg", , "PG13", "English", 0, 125, "Scott Lang and Hope Van Dyne, along with Hank Pym and Janet Van Dyne, explore the Quantum Realm, where they interact with strange creatures and embark on an adventure that goes beyond the limits of what they thought was possible."]);
    genreData.push([3, "Action"]);
    genreData.push([3, "Adventure"]);
    genreData.push([3, "Comedy"]);

    movieData.push(["Creed III", "media/creed.jpg", , "PG13", "English", 0, 116, "Adonis has been thriving in both his career and family life, but when a childhood friend and former boxing prodigy resurfaces, the face-off is more than just a fight."]);
    genreData.push([4, "Drama"]);
    genreData.push([4, "Sport"]);

    movieData.push(["Puss in Boots: The Last Wish", "media/boots.jpg", 94, "PG", "English", 1, 102, "When Puss in Boots discovers that his passion for adventure has taken its toll and he has burned through eight of his nine lives, he launches an epic journey to restore them by finding the mythical Last Wish."]);
    genreData.push([5, "Animation"]);
    genreData.push([5, "Adventure"]);
    genreData.push([5, "Comedy"]);

    movieData.push(["65", "media/65.jpg", 64, "PG13", "English", 0, 93, "After a catastrophic crash on an unknown planet, pilot Mills (Adam Driver) quickly discovers he's actually stranded on Earth…65 million years ago. Now, with only one chance at rescue, Mills and the only other survivor, Koa (Ariana Greenblatt), must make their way across an unknown terrain riddled with dangerous prehistoric creatures in an epic fight to survive."]);
    genreData.push([6, "Action"]);
    genreData.push([6, "Adventure"]);
    genreData.push([6, "Drama"]);

    movieData.push(["Everything Everywhere All At Once", "media/everything.jpg", 86, "R", "English", 0, 140, "A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence by exploring other universes and connecting with the lives she could have led."]);
    genreData.push([7, "Action"]);
    genreData.push([7, "Adventure"]);
    genreData.push([7, "Comedy"]);


    movieData.push(["Scream VI", "media/scream.jpg", 92, "R", "English", 0, 122, "In the next installment, the survivors of the Ghostface killings leave Woodsboro behind and start a fresh chapter in New York City."]);
    genreData.push([8, "Horror"]);
    genreData.push([8, "Mystery"]);
    genreData.push([8, "Thriller"]);

    movieData.push(["Cocaine Bear", "media/cocaine.jpg", 71, "R", "English", 0, 95, "An oddball group of cops, criminals, tourists and teens converge on a Georgia forest where a huge black bear goes on a murderous rampage after unintentionally ingesting cocaine."]);
    genreData.push([9, "Comedy"]);
    genreData.push([9, "Thriller"]);

    movieData.push(["A Good Person", "media/person.jpg", 64, "R", "English", 1, 129, "Allison (Florence Pugh) is a young woman with a bright future - a wonderful fiance, a blossoming career, and supportive family and friends. But her world crumbles in the blink of an eye when she survives an unimaginable tragedy and emerges from recovery with an opioid addiction and unresolved grief."]);
    genreData.push([10, "Drama"]);

    movieData.push(["Champions", "media/champions.jpg", 95, "PG13", "English", 1, 124, "A former minor-league basketball coach is ordered by the court to manage a team of players with intellectual disabilities. He soon realizes that despite his doubts, together, this team can go further than they ever imagined."]);
    genreData.push([11, "Comedy"]);
    genreData.push([11, "Drama"]);
    genreData.push([11, "Sport"]);

    movieData.push(["Inside", "media/inside.jpg", 42, "R", "English", 0, 105, "Nemo, a high-end art thief, is trapped in a New York penthouse after his heist doesn't go as planned. Locked inside with nothing but priceless works of art, he must use all his cunning and invention to survive."]);
    genreData.push([12, "Drama"]);
    genreData.push([12, "Thriller"]);

    movieData.push(["Moving on", "media/moving.jpg", 70, "R", "English", 0, 85, "Jane Fonda and Lily Tomlin star as estranged friends who reunite to seek revenge on the petulant widower (Malcolm McDowell) of their recently deceased best friend. Along the way, Fonda's character reunites with her great love (Richard Roundtree) as each woman learns to make peace with the past and each other."]);
    genreData.push([13, "Comedy"]);

    movieData.push(["Demon Slayer: Kimetsu No Yaiba - To The Swordsmith Village", "media/demon.jpg", 67, "R", "Japanese", 1, 110, "After his family is viciously murdered, a kind-hearted boy named Tanjiro Kamado resolves to become a Demon Slayer in hopes of turning his younger sister Nezuko back into a human. Together with his comrades, Zenitsu and Inosuke, along with one of the top-ranking members of the Demon Slayer Corps, Tengen Uzui, Tanjiro embarks on a mission within the Entertainment District, where they encounter the formidable, high-ranking demons, Daki and Gyutaro."]);
    genreData.push([14, "Animation"]);
    genreData.push([14, "Action"]);
    genreData.push([14, "Adventure"]);

    movieData.push(["Full River Red", "media/river.jpg", 64, "R", "Mandarin", 1, 159, "12th century China, during the Song Dynasty, set against a brewing rebellion by the Jin people against the Imperial Court. Two hours before a crucial diplomatic meeting between the Song Prime Minister Qin Hui and a high level Jin delegation, the Jin Ambassador is murdered. An important letter destined for the Emperor is stolen from him. As the search for the letter unfolds, alliances are formed, secrets are revealed, and no one can stop the truth that is destined to leave its mark in history."]);
    genreData.push([15, "Action"]);
    genreData.push([15, "Comedy"]);

    movieData.push(["Mummies", "media/mummies.jpg", 85, "PG", "English", 1, 88, "It follows three mummies as they end up in present-day London and embark on a journey in search of an old ring belonging to the Royal Family, stolen by the ambitious archaeologist Lord Carnaby."]);
    genreData.push([16, "Animation"]);
    genreData.push([16, "Comedy"]);
    genreData.push([16, "Family"]);

    movieData.push(["John Wick: Chapter 4", "media/john.jpg", 95, "R", "English", 0, 169, "John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes."]);
    genreData.push([17, "Action"]);
    genreData.push([17, "Crime"]);
    genreData.push([17, "Thriller"]);

    movieData.push(["The Whale", "media/whale.jpg", 91, "R", "English", 0, 117, "A reclusive English teacher suffering from severe obesity attempts to reconnect with his estranged teenage daughter for one last chance at redemption."]);
    genreData.push([18, "Drama"]);

    movieData.push(["Luther: The Fallen Sun", "media/luther.jpg", 85, "R", "English", 0, 129, "Brilliant but disgraced detective John Luther breaks out of prison to hunt down a sadistic serial killer who is terrorising London."]);
    genreData.push([19, "Crime"]);
    genreData.push([19, "Drama"]);
    genreData.push([19, "Mystery"]);

    movieData.push(["All Quiet on the Western Front", "media/front.jpg", 90, "R", "English", 1, 148, "All Quiet on the Western Front tells the gripping story of a young German soldier on the Western Front of World War I. Paul and his comrades experience first-hand how the initial euphoria of war turns into desperation and fear as they fight for their lives, and each other, in the trenches. The film from director Edward Berger is based on the world renowned bestseller of the same name by Erich Maria Remarque."]);
    genreData.push([20, "Action"]);
    genreData.push([20, "Drama"]);
    genreData.push([20, "War"]);


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

module.exports = getMovies;
module.exports = movies;