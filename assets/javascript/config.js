//API for IMDB//
var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/inception",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "imdb-internet-movie-database-unofficial.p.rapidapi.com",
		"x-rapidapi-key": "a319d638b0msh397c0e24b21a62fp1a2660jsnc7f7e0f81537"
	}
}
//API for UTELLY//
$.ajax(settings).done(function (response) {
	console.log(response);
});

var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=bojack&country=uk",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
		"x-rapidapi-key": "a319d638b0msh397c0e24b21a62fp1a2660jsnc7f7e0f81537"
	}
}

// firbase api key = AIzaSyAk004XAQvVJd9_QkxKWBR3XaGo8y_623w //

//API for MOVIE CLIPS//
$.ajax(settings).done(function (response) {
	console.log(response);
});

var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://themovieclips.p.rapidapi.com/trailers?limit=10",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "themovieclips.p.rapidapi.com",
		"x-rapidapi-key": "a319d638b0msh397c0e24b21a62fp1a2660jsnc7f7e0f81537"
	}
}

$.ajax(settings).done(function (response) {
	console.log(response);
});