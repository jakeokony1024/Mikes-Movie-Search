
//firebase calling
var firebaseConfig = {
    apiKey: "AIzaSyCGYhdtL7ScaEYcZwM31u3L-A5GWEdgkG4",
    authDomain: "mikes-movies.firebaseapp.com",
    databaseURL: "https://mikes-movies.firebaseio.com",
    projectId: "mikes-movies",
    storageBucket: "mikes-movies.appspot.com"
};

firebase.initializeApp(firebaseConfig)
var database = firebase.database()

var utellySettings = {
	"async": true,
	"crossDomain": true,
	"url": "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=bojack&country=uk",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
		"x-rapidapi-key": "31be13b542msh7b90b2af5235426p12bd4bjsnac8785b93464"
	}
}

$.ajax(utellySettings).done(function (response) {
	console.log(response);
});

var IMDBsettings = {
	"async": true,
	"crossDomain": true,
	"url": "https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/inception",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "imdb-internet-movie-database-unofficial.p.rapidapi.com",
		"x-rapidapi-key": "31be13b542msh7b90b2af5235426p12bd4bjsnac8785b93464"
	}
}

$.ajax(IMDBsettings).done(function (response) {
	console.log(response);
});