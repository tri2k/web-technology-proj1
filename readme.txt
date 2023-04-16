group 41

floris dinkelberg 7506035
shady sedhom
jonathan sy

Sorry, I don't know their student numbers. they are unavailable at the moment

http://webtech.science.uu.nl/group41/

A theatre website where you can order movie tickets. Users can login through /login or /register. Movies can be seen in /movies, a single one in /movies/movie/:id
You can order movies using /order and users can see their info with /user and orders with /user/orders.

login:
jack1 jackrules123
bobby jacksucks123

CREATE TABLE movies(id INTEGER PRIMARY KEY, title TEXT, poster_path TEXT, rating INTEGER, audience_rating TEXT, language TEXT, subtitles INTEGER, duration_minutes INTEGER, description TEXT)
CREATE TABLE genres(movie_id INTEGER, genre TEXT, PRIMARY KEY (movie_id, genre), FOREIGN KEY (movie_id) REFERENCES movies (id))
CREATE TABLE users(id INTEGER PRIMARY KEY, email TEXT UNIQUE, name TEXT, username TEXT UNIQUE, password TEXT, address TEXT, card_number, expiration_date)
CREATE TABLE orders(id INTEGER PRIMARY KEY, user_id INTEGER, movie_id INTEGER, date TEXT)