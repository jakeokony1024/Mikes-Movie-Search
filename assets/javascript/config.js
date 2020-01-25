        //Jquery function
        $(document).ready(function () {
            console.log("ready!");
        });
        var utellyResp;
        var display_name;
        var locations;
        var name;
        var picture;
        var display_name;
        // This .on("click") function will trigger the AJAX Call
        var config = {
            apiKey: "AIzaSyCGYhdtL7ScaEYcZwM31u3L-A5GWEdgkG4",
            authDomain: "mikes-movies.firebaseapp.com",
            databaseURL: "https://mikes-movies.firebaseio.com",
            projectId: "mikes-movies",
            storageBucket: "mikes-movies.appspot.com",
        };
        firebase.initializeApp(config);
        var database = firebase.database();
        
        $('#find-movie').on("click", function (event) {
            
            event.preventDefault();
            // Here we grab the text from the input box
            var movie = $("#movie-input").val().trim();
            console.log("This is the movie: " + movie);
            database.ref().set({
                searchResults:movie
            });
            
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
                    console.log(utellyResp);
                    console.log(utellyResp.results);
                    console.log(utellyResp.results[0].name);
                    console.log(utellyResp.results[0].locations[0].display_name);
                    //Loop through to get movie name
                    //Loop through to get movie name
                    for (i = 0; i < utellyResp.results.length; i++) {
                        console.log(utellyResp.results[i].name);
                        $("#movie-view").append("<ul>" + utellyResp.results[i].name + "</ul>");
                        $("#movie-view").append("<a class='movie' href ='https://mnezz1131.github.io/mikes-movie/movie.html'> <img src= " + utellyResp.results[i].picture + "></a>");
                    }
                    //Loop to get streaming service
                    for (a = 0; a < utellyResp.results[0].locations.length; a++) {
                        console.log(utellyResp.results[0].locations[a].display_name);
                    }
                });
        });
