//Jquery Document.Ready function
$(document).ready(function () {
    console.log("ready!");

    //Set up gobal variables
    var utellyResp;
    var display_name;
    var locations;
    var name;
    var picture;
    var provider;
    var movName;
    var pushArray = [];

    // Configure the Fireabase Database
    var config = {
        apiKey: "AIzaSyCGYhdtL7ScaEYcZwM31u3L-A5GWEdgkG4",
        authDomain: "mikes-movies.firebaseapp.com",
        databaseURL: "https://mikes-movies.firebaseio.com",
        projectId: "mikes-movies",
        storageBucket: "mikes-movies.appspot.com",
    };

    //Initialize the firebase database
    firebase.initializeApp(config);
    var database = firebase.database();

    //Sets up onclick funtion to capture the show that was search for
    $('#find-movie').on("click", function (event) {
        event.preventDefault();
        //Geting the value of text entered in  the input box 
        var movie = $("#movie-input").val().trim();
        console.log("This is the movie: " + movie);

        //Utelly API call to get the show that was searched for to see where it's streaming    
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

                //Testing -Console logs to deteremine where the data fields we want are            
                    console.log(utellyResp);
                    console.log(utellyResp.results);
                    console.log(utellyResp.results[0].name);
                    console.log(utellyResp.results[0].locations[0].display_name);

                //Loop through to get movie name
                for (i = 0; i < utellyResp.results.length; i++) {
                    //console.log(utellyResp.results[i].name);
                    
                    var movieDiv = $("<div>"); //Jquery to make a Movie Div
                    movieDiv.addClass("movieDiv float-left"); //Adding Bootstrap Class to position images
                    var name = utellyResp.results[i].name; //Loop through UTELLY Json to get movie name 
                    var p = $("<p class=movSelect>").text(name); //Setup a <p> tage for name
                    var movieImage = $("<img class=movSelect>"); //creates an <img> tag on HTML 
                    movieImage.attr("src", utellyResp.results[i].picture); //Set img src attribute
                    link = $("<a>");
                    link.attr("href", "movie.html");
                    link.addClass("link");
                    p.attr("value", name);
                    p.addClass("p-movieName")
                    link.addClass("rounded"); //Adds Bootstrap class to round edges of image   
                    link.attr("target", "_blank")
                    movieDiv.prepend(p); //Adds <p> before the movie image to the div   
                    movieDiv.prepend(movieImage); //Adds the movieimage to the div   
                    link.append(movieDiv);
                    $("#movie-view").append(link); // Appends the DIv to the movie-view section of HTML   
                    

                    var tempObject = {
                        searchResults: movie,
                        moviename: name,
                        dateAdded: Date.now()
                    }
                    database.ref().push(tempObject);
                    console.log(tempObject)

                    //Original Code for looping and finding the search results
                    //$("#movie-view").append("<ul>"+utellyResp.results[i].name+"</ul>");
                    //$("#movie-view").append("<a href ='https://mnezz1131.github.io/mikes-movie/movie.html'> <img src= "+utellyResp.results[i].picture+"></a>");
                }
                //Loop to get streaming service
                for (a = 0; a < utellyResp.results[0].locations.length; a++) {
                    // console.log(utellyResp.results[0].locations[a].display_name);
                    provider = (utellyResp.results[0].locations[a].display_name);
                    console.log(provider);
                }
            });
            
    });
    //================================================================================================================================    
    //End tag for Document.Ready
});