// Global Variables

// var settings = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": "https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/inception",
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "imdb-internet-movie-database-unofficial.p.rapidapi.com",
// 		"x-rapidapi-key": "a319d638b0msh397c0e24b21a62fp1a2660jsnc7f7e0f81537"
// 	}
// }

// $.ajax(settings).done(function (response) {
// 	console.log(response);
// });


var queryURL  = 'https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=&country=us'
const options = {
    method: 'GET',
    headers: {
        "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
        "x-rapidapi-key": "dfb87b0ec6msh548e75d6f762a4bp1dc2f1jsn322c78d86502"
    },
}
fetch(url, options)
    .then((response) => {
        return response.json();
    })
    .then((myJson) => {
        console.log(myJson);
        $("#movie-view").text(JSON.stringify(myJson));
    });

$("#submit").on("click", function () {
    event.preventDefault();

})



var userSearch = "";
var movieTitle = "";
var recentSearch = "";
var movieArray = [];


var page = {


    // Functions

    resetSearch: function () {
        console.log();
    },

    loadResults: function () {
        console.log();
    },

    loadTrailers: function () {
        console.log();
    },

    addToTable: function () {
        console.log();
    }



}