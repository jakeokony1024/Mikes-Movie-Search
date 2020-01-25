
//firebase calling
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

$(document).on("ready", function(){
	console.log(searchResults)
})