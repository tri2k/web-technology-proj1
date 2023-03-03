/*Class Movie will hold the structural representation of the entire film.
Class Artist will describe any person involved in the movie industry; it should specify at least the name and the year of birth.
Class Director will extend the class Artist; it can add a list of movies that this person has directed before.
Class Writer will extend the class Artist; it can add a list of books that this person has written before.
Class Actor will extend the class Artist; it can add a list of movies, in which this person starred before, and a link to his/her photo.*/
// Movie: title (String), genre (String), year (Number), director (Director), writer(s) - array of Writers, stars - array of Actors (you do not have to specify the entire cast), poster (link to an image), trailer (link to a video), plot (String)


class Movie {
    constructor(title, genre, year, director, writers, stars, poster, trailer, plot) { // insert amazing movie constructor here
        
    }
}

class Artist {
    constructor(name, yearOfBirth) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
    }
}

class Director extends Artist {
    constructor(name, yearOfBirth, movies) {
        super(name, yearOfBirth);
        this.movies = movies;
    }
}

class Writer extends Artist {
    constructor(name, yearOfBirth, books) {
        super(name, yearOfBirth);
        this.books = books;
    }
}

class Actor extends Artist {
    constructor(name, yearOfBirth, movies, linkPhoto) {
        super(name, yearOfBirth);
        this.movies = movies;
        this.linkPhoto = linkPhoto;
    }
}