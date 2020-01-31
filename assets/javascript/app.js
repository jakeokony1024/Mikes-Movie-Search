$(document).ready(function () {
    console.log("ready!")
    //Set up gobal variables
    var utellyResp;
    var name;
    //Getting the name from local storage
    // console.log(localStorage.getItem("movieName"));
    let moviename = (localStorage.getItem("storageName"))
    //Create structure for displaying movie name======================================================
    var titleDiv = $("<div>"); //Jquery to make a Movie Div
    titleDiv.addClass("titleDiv"); //Adding Bootstrap Class to position images
    var p = $("<p>").text(moviename); //Setup a <p> tage for name
    p.addClass("localName");
    $("#title-view").prepend(p); // Appends the DIv to the movie
    //================================================================================================================================     
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
            //Loop through to get movie name
            for (a = 0; a < utellyResp.results[0].locations.length; a++) {
                console.log(utellyResp.results[0].locations[a].display_name);
                var streamDiv = $("<div>"); //Jquery to make a Movie Div
                streamDiv.addClass("streamDiv"); //Adding Bootstrap Class to position images
                var stream = utellyResp.results[0].locations[a].display_name; //Loop through UTELLY Json to get movie name                   
                var p = $("<p>").text(stream); //Setup a <p> tage for name
                $("#stream-view").append(p); // Appends the DIv to the movie-view section of HTML 
            }
        });
    //YOU TUBE API TRAILERS IS WORKING!!
    //=========================================================================================================================================
    var APIKey = "AIzaSyBBhRn34PTtR-EyygLxeptxYiPc9ThiQr8"
    // -----------------------------------------------------------------------
    function getVideo() {
        $.ajax({
            type: 'GET',
            url: 'https://www.googleapis.com/youtube/v3/search',
            data: {
                key: 'AIzaSyBBhRn34PTtR-EyygLxeptxYiPc9ThiQr8',
                q: moviename + 'trailer',
                //q:  movieName +'trailer',
                part: 'snippet',
                maxResults: 1,
                type: 'video',
                videoEmbeddable: true,
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
    //You Tube function to embed video trailer=================================================================
    function embedVideo(data) {
        $('iframe').attr('src', 'https://www.youtube.com/embed/' + data.items[0].id.videoId)
        $('h3').text(data.items[0].snippet.title)
        $('.description').text(data.items[0].snippet.description)
    }
    getVideo();
});