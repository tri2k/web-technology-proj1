let req = new XMLHttpRequest();
req.open('GET', 'getMovies', true);
req.onreadystatechange = function () {
    if (req.readyState === 4 && req.status === 200) {
        alert(req.responseText);
        console.log(req.responseText);
    }
}

req.send();
