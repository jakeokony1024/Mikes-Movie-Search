var config = {
    apiKey: "AIzaSyCGYhdtL7ScaEYcZwM31u3L-A5GWEdgkG4",
    authDomain: "mikes-movies.firebaseapp.com",
    databaseURL: "https://mikes-movies.firebaseio.com",
    projectId: "mikes-movies",
    storageBucket: "mikes-movies.appspot.com",
};
firebase.initializeApp(config);
var database = firebase.database();

var utellyResp;
var display_name;
var locations;
var name;
var picture;
var display_name;
var movie;

$(document).ready(function () {
	console.log("ready!")
	//Loop to get streaming service

	database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot){
		console.log(snapshot.val());
		movie = snapshot.val();
	 })





	
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
			utellyResp = (myJson);
		});

		for (a = 0; a < utellyResp.results[0].locations.length; a++) {
			console.log(utellyResp.results[0].locations[a].display_name);
		}
		
});