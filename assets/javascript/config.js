//Jquery function
$(document).ready(function () {
    console.log("ready!");
});

var streamers = [];
// This .on("click") function will trigger the AJAX Call
$("#find-movie").on("click", function (event) {
    // event.preventDefault() can be used to prevent an event's default behavior.
    // Here, it prevents the submit button from trying to submit a form when clicked
    event.preventDefault();

    // Here we grab the text from the input box
    var movie = $("#movie-input").val().trim();
 
    // $("#movie-input").empty(); //clears out the div
    
    const url = 'https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=' + movie + '&country=us'
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
            
            var utellyResp = (myJson);
            console.log(utellyResp);
            

            console.log(utellyResp.results);
            console.log(utellyResp.results[0].name);
            console.log(utellyResp.results[0].locations[0].display_name);

            //Loop through to get movie name
            for (i = 0; i < utellyResp.results.length; i++) {
                console.log(utellyResp.results[i].name);
                
                $("#movie-view").append("<a href ='https://mnezz1131.github.io/mikes-movie/movie.html'> <img src= " + utellyResp.results[i].picture + "></a>");
                $("#movie-view").append("<ul>" + utellyResp.results[i].name + "</ul>");
                $("#movie-view").append("<ul>" + utellyResp.results[i].locations[i].display_name + "</ul>");
            } 
            
            //Loop to get streaming service
            for (a = 0; a < utellyResp.results[0].locations.length; a++) {
                console.log(utellyResp.results[0].locations[a].display_name);
            }
        });
});

var config = {
    apiKey: "AIzaSyCGYhdtL7ScaEYcZwM31u3L-A5GWEdgkG4",
    authDomain: "mikes-movies.firebaseapp.com",
    databaseURL: "https://mikes-movies.firebaseio.com",
    projectId: "mikes-movies",
    storageBucket: "mikes-movies.appspot.com"
};

firebase.initializeApp(config);
var database = firebase.database();
var searchResults = {
    response: utellyResp,
    name: name,
    display_name: display_name,
    locations: locations,
    picture: picture
}
$("#find-movie").on("click", function() {
    database.ref().set({
      searchResults: searchResults
    });
  });


//================================================================================================================================     