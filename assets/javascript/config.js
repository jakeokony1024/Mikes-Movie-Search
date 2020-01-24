//Jquery function
$(document).ready(function () {
    console.log("ready!");
});

var streamers =[];
// This .on("click") function will trigger the AJAX Call
$("#find-movie").on("click", function(event) {
    // event.preventDefault() can be used to prevent an event's default behavior.
    // Here, it prevents the submit button from trying to submit a form when clicked
    event.preventDefault();
    // Here we grab the text from the input box
    var movie = $("#movie-input").val();
    $("#movie-input").empty();  //clears out the div
//=================================================================================================================================
    const url = 'https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term='+movie+'&country=us'
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
  //  console.log(myJson);
    var utellyResp =(myJson);
    console.log(utellyResp);
   //$("#movie-view").text(JSON.stringify(myJson));
 
console.log(utellyResp.results);
console.log(utellyResp.results[0].name);
console.log(utellyResp.results[0].locations[0].display_name);

//Loop through to get movie name
for(i=0; i < utellyResp.results.length; i++ ){
    console.log(utellyResp.results[i].name);
    $("#movie-view").append("<ul>"+utellyResp.results[i].name+"</ul>");
    $("#movie-view").append("<a href ='https://mnezz1131.github.io/mikes-movie/movie.html'> <img src= "+utellyResp.results[i].picture+"></a>");
}
//Loop to get streaming service
for(a=0; a < utellyResp.results[0].locations.length; a++ ){
    console.log( utellyResp.results[0].locations[a].display_name);
}
});
});
//================================================================================================================================     

