$(document).ready(function () {
    console.log("ready!")
    //Set up gobal variables
    var utellyResp;
    var name;
    var streamUrl;
    //Getting the name from local storage

    let moviename = (localStorage.getItem("storageName"))

    //Create structure for displaying movie name======================================================
    var titleDiv = $("<div>"); //Jquery to make a Movie Div
    titleDiv.addClass("titleDiv"); //Adding Bootstrap Class to position images
    var p = $("<p>").text(moviename); //Setup a <p> tage for name
    p.addClass("title");
    $("#title-view").prepend(p); // Appends the DIv to the movie
    $(".result").text("  " + moviename);
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
            console.log(myJson)
            //Loop through to get movie name
            for (a = 0; a < utellyResp.results[0].locations.length; a++) {
                console.log(utellyResp.results[0].locations[a].display_name);
                streamUrl = utellyResp.results[0].locations[a].url
                console.log(streamUrl);
                var streamDiv = $("<div>"); //Jquery to make a Movie Div
                streamDiv.addClass("streamDiv"); //Adding Bootstrap Class to position images
                var stream = utellyResp.results[0].locations[a].display_name; //Loop through UTELLY Json to get movie name                   
                p.addClass("stream")
                $("#stream-view").append(p);
                var streamLink = $("<br> <a href=" + streamUrl + ">" + stream + "</a>")
                $(".stream").append(streamLink);
            }


        });
    //   http://www.omdbapi.com/?i=tt3896198&apikey=bbe0873c
    //===========================================================================================================
    var queryURL = "https://www.omdbapi.com/?t=" + moviename + "&apikey=bbe0873c";

    // Creating an AJAX call for IMDB
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        //Creating a Div for the plot
        var movieDiv = $("<div class='movie'>");
        // Storing the plot
        var plot = response.Plot;
        // Creating an element to hold the plot
        var pThree = $("<p>").text("Plot: " + plot);
        pThree.addClass("plot");
        // Appending the plot
        movieDiv.append(pThree);
        //Creating a Div for the Rating, Image and Release
        var mviewDiv = $("<div class='m-view'>");
        // Storing the rating data
        var rating = response.Rated;
        // Creating an element to have the rating displayed
        var pOne = $("<p>").text("Rating: " + rating);
        pOne.addClass("rating")
        // Displaying the rating
        mviewDiv.append(pOne);
        // Storing the release year
        var released = response.Released;
        // Creating an element to hold the release year 
        var pTwo = $("<p>").text("Released: " + released);
        pTwo.addClass("release")
        //Displaying the release year
        mviewDiv.append(pTwo);
        // Retrieving the URL for the image
        var imgURL = response.Poster;
        // Creating an element to hold the image
        var image = $("<img>").attr("src", imgURL);
        image.addClass("img")
        // Appending the image
        mviewDiv.append(image);
        // Putting the information in the DIVS
        $("#movies-view").prepend(movieDiv);

        $("#m-view").prepend(mviewDiv);
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
                q: moviename + "trailer",
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


    function embedVideo(data) {
        $('iframe').attr('src', 'https://www.youtube.com/embed/' + data.items[0].id.videoId)
        $('h3').text(data.items[0].snippet.title)
        $('.description').text(data.items[0].snippet.description)
    }


    getVideo();


});