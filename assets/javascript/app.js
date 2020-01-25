
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
var searchResults = "";



$(document).ready(function(){
	$("#searchResults").
})