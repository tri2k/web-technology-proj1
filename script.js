class Movie {
    constructor(title, genre, year, director, writers, stars, 
        poster, trailer, plot) {
            this._title = title;
            this._genre = genre;
            this._year = year;
            this._director = director;
            this._writers = writers;
            this._stars = stars;
            this._poster = poster;
            this._trailer = trailer;
            this._plot = plot;
        }
}

class Artist {
    constructor(name, yearOfBirth) {
        this._name = name;
        this._yearOfBirth = yearOfBirth;
    }
}

class Director extends Artist {
    addMovieList(movieList) {
        this._movieList = movieList;
    }
}

class Writer extends Artist {
    addBookList(bookList) {
        this._bookList = bookList;
    }
}

class Actor extends Artist {
    addMovieList(movieList) {
        this._movieList = movieList;
    }

    addPictureLink(pictureLink) {
        this._pictureLink = pictureLink;
    }
}

// Making the director object:

const jamesCameron = new Director('James Cameron', 1954);
jamesCameron.addMovieList(['Avatar: The Way of Water', ' Toruk: The First Flight', ' Titanic: Deleted Scenes ', ' Avatar', ' Aliens of the Deep']);

// Making the writer objects:

const rickJaffa = new Writer('Rick Jaffa', 1956);
rickJaffa.addBookList(['Avatar: The Way of Water Screenplay' ,' Rise of the Planet of the Apes Screenplay', ' Dawn of the Planet of the Apes Screenplay', ' Jurrassic World Screenplay']);

const amandaSilver = new Writer('Amanda Silver', 1963);
amandaSilver.addBookList(['Avatar: The Way of Water Screenplay', ' Rise of the Planet of the Apes Screenplay', ' Dawn of the Planet of the Apes Screenplay', ' Jurrassic World Screenplay']);

const joshFriedman = new Writer('Josh Friedman', 1967);
joshFriedman.addBookList(['Avatar: The Way of Water Screenplay', ' Terminator: The Sarah Connor Chronicles Screenplay', ' Terminator: Dark Fate Screenplay', ' The Dark Dahlia']);

const shaneSalerno = new Writer('Shane Salerno', 1972);
shaneSalerno.addBookList(['Avatar: The Way of Water Screenplay', ' Armageddon Screenplay', ' Savages Screenplay', ' Shaft Screenplay', ' Hawaii Five-O Screenplay']);

// Making the star objects:

const samWorthington = new Actor('Sam Worthington', 1976);
samWorthington.addPictureLink('Media/worthington.png');
samWorthington.addMovieList(['Transfusion', ' Avatar: The Way of Water', ' 9 Bullets', ' Fires', ' The Last Son']);

const zoeSaldana = new Actor('Zoe Saldana', 1978);
zoeSaldana.addPictureLink('Media/saldana.png');
zoeSaldana.addMovieList(['Avatar: The Way of Water', ' From Scratch', ' Amsterdam', ' Guardians of the Galaxy: Cosmic Rewind', ' The Adam Project']);

const sigourneyWeaver = new Actor('Sigourney Weaver', 1949);
sigourneyWeaver.addPictureLink('Media/weaver.png');
sigourneyWeaver.addMovieList(['Avatar: The Way of Water', ' Master Gardener', ' Call Jane', ' Ghostbusters: Afterlife', ' The Good House']);

const stephenLang = new Actor('Stephen Lang', 1952);
stephenLang.addPictureLink('Media/lang.png');
stephenLang.addMovieList(['Avatar: The Way of Water', ' The Independent', ' Old Man', ' Mid-Century', ' The Lost City']);

const kateWinslet = new Actor('Kate Winslet', 1975);
kateWinslet.addPictureLink('Media/winslet.png');
kateWinslet.addMovieList(['Avatar: The Way of Water', ' Blackbird', ' Manou the Swift', ' Wonder Wheel', ' The Mountain Between Us']);

const cliffCurtis = new Actor('Cliff Curtis', 1968);
cliffCurtis.addPictureLink('Media/curtis.png');
cliffCurtis.addMovieList(['True Spirit', ' Avatar: The Way of Water', ' Muru', ' Reminiscence', ' Doctor Sleep', ' The Meg']);

const jamesFlatters = new Actor('James Flatters', 2000);
jamesFlatters.addPictureLink('Media/flatters.png');
jamesFlatters.addMovieList(['Avatar: The Way of Water', ' The School for Good and Evil', ' Tuesday', ' Close to Me', ' Liar']);

const britainDalton = new Actor('Britain Dalton', 2001);
britainDalton.addPictureLink('Media/dalton.png');
britainDalton.addMovieList(['Avatar: The Way of Water', ' Urchin', ' Ready Player One', ' Thumper', ' Actors Anonymous']);

// Creating the structural representation

const Avatar = new Movie('Avatar: The Way Of Water', 'Action, Adventure, Fantasy, Sci-Fi', 2022, jamesCameron, [rickJaffa, amandaSilver, joshFriedman, shaneSalerno], [samWorthington, zoeSaldana, sigourneyWeaver, stephenLang, kateWinslet, cliffCurtis, jamesFlatters, britainDalton], "https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_FMjpg_UX1000_.jpg", 'Media/avatar_the_way_of_water_trailer.mp4', "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home.");

// Building and styling up the info page 

const body = document.body;
body.style = 'background: linear-gradient(#000080,#00FFC5); background-attachment: fixed; height: auto; margin: 0 auto; horizontal-align: middle';

// Creating the logo element

const logo = document.createElement('img');
logo.src = 'Media/logo.png';
logo.style = 'padding: 20px; height: 80px; float: left; margin-top: -20px;';

// Creation of the header menu list

const unorderedList = document.createElement('ul');
unorderedList.style = 'float: right; margin-right: 25px; margin-top: 0px; justify-self: flex-end;';

// Creation of the menu list items / links

addPageLink("Home", "home.html");
addPageLink("Plot Summary", "plotsummary.html");
addPageLink("Cast", "cast.html");
addPageLink("Reviews", "reviews.html");
addPageLink("Fun Facts", "funfacts.html");
addPageLink("Info", "info.html");


// Styling and adding the links

function addPageLink(textName, fileName) {
    const listItem = document.createElement('li');
    listItem.style = ' display: inline-block; line-height: 30px; margin: 0 15px;';
    const link = document.createElement('a');
    link.style = "position: relative; color: #5BC0EB; font-family: 'Montserrat', sans-serif; font-weight: bold; text-transform: uppercase; padding: 5px 0";
    link.href = fileName;
    link.text = textName;

    listItem.append(link);
    unorderedList.append(listItem);
}

// Creating the navigation bar

const navbar = document.getElementById("navbar");
navbar.style = 'height: auto; width: 100%; top: 0; left: 0; z-index: 10; position: fixed; background: rgba(0, 0, 0, 0.7); box-sizing: border-box; border-bottom: 2px solid #000080; display:flex; align-items:center; flex-wrap: wrap; justify-content: flex-end;';
navbar.append(logo);
navbar.append(unorderedList);




//////////////////// 


// Creation of titles

const title = document.createElement('h1');
title.textContent = Avatar._title;
title.style = "font-family: 'Montserrat', serif; font-size: 40px; line-height: 40px; margin-left: auto; margin-right: auto; text-align: center; color: #00FFC5; text-shadow: rgb(49, 58, 231) 3px 2px; margin-top: 120px;";

const genreAndYear = document.createElement('h2');
genreAndYear.textContent = "Genres: " + Avatar._genre + " | Year: " + Avatar._year;
genreAndYear.style = "font-family: 'Varela Round', sans-serif; font-size: 20px; text-align: center; font-weight: bold; color: aliceblue";

const directorTitle = document.createElement('h2');
directorTitle.textContent = 'Director';
directorTitle.style = "font-family: 'Varela Round', sans-serif; font-size: 20px; text-align: center; font-weight: bold; color: aliceblue";


const director = document.createElement('h2');
director.textContent = Avatar._director._name + " | Year of Birth: " + Avatar._director._yearOfBirth;
director.style = "font-family: 'Varela Round', sans-serif; font-size: 20px; text-align: center; font-weight: bold; color: #00FFC5; text-transform: uppercase; margin-top: 30px; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px  1px 0 #000, 1px  1px 0 #000";
director.title = Avatar._director._movieList;

const writersTitle = document.createElement('h2');
writersTitle.textContent = 'Writers';
writersTitle.style = "font-family: 'Varela Round', sans-serif; font-size: 20px; text-align: center; font-weight: bold; color: aliceblue";

// Adding what we built

body.append(title, genreAndYear, directorTitle, director, writersTitle);

// Looping through writers array to add tooltip
Avatar._writers.forEach(i => {
    const item = document.createElement('h2');
    item.textContent = i._name + " - Born In " + i._yearOfBirth;
    item.style = "font-family: 'Varela Round', sans-serif; font-size: 20px; text-align: center; font-weight: bold; color: #00FFC5; text-transform: uppercase; margin-top: 30px; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px  1px 0 #000, 1px  1px 0 #000";
    item.title = i._bookList;
    body.append(item);
});

const actorsTitle = document.createElement('h2');
actorsTitle.textContent = 'Actors';
actorsTitle.style = "font-family: 'Varela Round', sans-serif; font-size: 20px; text-align: center; font-weight: bold; color: aliceblue";

body.append(actorsTitle);

Avatar._stars.forEach(j => {
    const actor = document.createElement('img');
    actor.src = j._pictureLink;
    actor.title = j._name + " (" + j._yearOfBirth + ") | " + j._movieList;

    actor.style = 'width: 20%; height: 35vh; object-fit: cover; display: inline-flex; margin-left: 2vw; margin-right: 2vw; margin-top: 15px; margin-bottom: 15px; border: solid 2px #000080; border-radius: 50px; vertical-align: middle';

    body.append(actor);
});

const posterTitle = document.createElement('h2');
posterTitle.textContent = 'Poster';
posterTitle.style = "font-family: 'Varela Round', sans-serif; font-size: 20px; text-align: center; font-weight: bold; color: aliceblue; margin-top: 50px";

//

const poster = document.createElement('img');
poster.src = Avatar._poster;
poster.title = 'Avatar: The Way of Water Poster';
poster.style = 'display: block; width: 50vw; margin-left: auto; margin-right: auto; margin-top: 50px; border: solid 2px #000080; border-radius: 50px';

//

const trailerTitle = document.createElement('h2');
trailerTitle.textContent = 'Trailer';
trailerTitle.style = "font-family: 'Varela Round', sans-serif; font-size: 20px; text-align: center; font-weight: bold; color: aliceblue; margin-top: 50px";

//

const trailer = document.createElement('video');

trailer.src = 'Media//avatar_the_way_of_water_trailer.mp4';

trailer.controls = true;
trailer.muted = false;
trailer.autoplay = true;
trailer.title = 'Avatar: The Way of Water | Official Trailer';

trailer.style = 'width: 80vw; display: block; margin-left: auto; margin-right: auto; margin-top: 50px; margin-bottom: 50px; border: solid 2px #000080; border-radius: 50px';

body.append(posterTitle, poster, trailerTitle, trailer);