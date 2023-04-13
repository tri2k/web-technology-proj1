class Movie {
    constructor(movieObject) {
        this.id = movieObject.id;
        this.title = movieObject.title;
        this.posterPath = movieObject.poster_path;
        this.rating = movieObject.rating;
        this.audienceRating = movieObject.audience_rating;
        this.language = movieObject.language;
        this.subtitles = movieObject.subtitles;
        this.durationMinutes = movieObject.duration_minutes;
        this.description = movieObject.description;
        this.genreList = movieObject.genres;
    }
}

module.exports = Movie;