$(document).ready(function () {
    console.log("ready!")
    
    
    //Set up gobal variables
    var utellyResp;
    //Getting the name from local storage
    console.log(localStorage.getItem("storageName"));
    let moviename = (localStorage.getItem("storageName"))
    //Utelly API call to get the show that was searched for to see where it's streaming    
    const url = 'https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=' + moviename + '&country=us'
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
            (utellyResp.results[0].locations[0].url);
            console.log("This is the Movie Name - " + utellyResp.results[0].name);
            var movieName = utellyResp.results[0].name;
            console.log(utellyResp.results[0].locations[0].display_name);
            console.log("This is the Streamer URL- " + utellyResp.results[0].locations[0].url);
            var streamer = utellyResp.results[0].locations[0].url
            
            $("#stream-view").append(streamer)

            for (i = 0; i < utellyResp.results.length; i++) {
                for (i = 0; i < utellyResp.results.length; i++) {
                    
                    var movieDiv = $("<div>"); //Jquery to make a Movie Div
                    movieDiv.addClass("movieDiv"); //Adding Bootstrap Class to position images
                    var name = utellyResp.results[0].name; //Loop through UTELLY Json to get movie name 
                    var p = $("<p>").text(movieName); //Setup a <p> tage for name

                    movieDiv.prepend(p); //Adds <p> before the movie image to the div   

                    $("#movie-view").text(name); // Appends the DIV to the movie
                }

                //YOU TUBE API TRAILERS IS WORKING!!
                //=========================================================================================================================================
                var APIKey = "AIzaSyBBhRn34PTtR-EyygLxeptxYiPc9ThiQr8"
                // -----------------------------------------------------------------------
                function getVideo() {
                    $.ajax({
                        type: 'GET',
                        url: 'https://www.googleapis.com/youtube/v3/search',
                        data: {
                            key: APIKey,
                            q: movieName + 'trailer',
                            part: 'snippet',
                            maxResults: 1,
                            type: 'video',
                            videoEmbeddable: true,
                            fs: 1
                        },
                        success: function (data) {
                            embedVideo(data)
                            console.log(data);
                        },
                        error: function (response) {
                            console.log("Request Failed");
                            console.log(response);
                        }
                    });
                }


                function embedVideo(data) {
                    $('iframe').attr(' src', 'https://www.youtube.com/embed/' + data.items[0].id.videoId)
                    $('h3').text(data.items[0].snippet.title)
                    $('.description').text(data.items[0].snippet.description)
                }

                getVideo();

            };

        });

    function getImdb(){
        var settings = {
            async: true,
            crossDomain: true,
            queryURL: "https://movie-database-imdb-alternative.p.rapidapi.com/?page=1&r=json&s=",
            method: "GET",
            headers: {
                "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
                "x-rapidapi-key": "a319d638b0msh397c0e24b21a62fp1a2660jsnc7f7e0f81537"
            }
        }
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
              console.log(response)
          });    
    };
});