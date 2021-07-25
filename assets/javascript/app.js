$(document).ready(function () {
    //Set up gobal letiables
    let utellyResp;
    let name;
    let streamUrl;
    //Getting the name from local storage
    let moviename = (localStorage.getItem("storageName"));
    let titleDiv = `
        <div class='titleDiv'>
            <p class='title'>${moviename}<p>
        </div>
    `;
    $(".result").append(titleDiv);
    //================================================================================================================================     
    //Utelly API call to get the show that was searched for to see where it's streaming    
    const url = 'https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=' 
    + moviename + '&country=us';
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

            for (let a = 0; a < utellyResp.results[0].locations.length; a++) {
                streamUrl = utellyResp.results[0].locations[a].url;
                let streamDiv = $("<div>"); //Jquery to make a Movie Div
                streamDiv.addClass("streamDiv"); //Adding Bootstrap Class to position images
                let stream = utellyResp.results[0].locations[a].display_name; //Loop through UTELLY Json to get movie name                   
                let p = $("<p>").text(stream); //Setup a <p> tage for name
                p.addClass("str")
                $("#stream-view").append(p); // Appends the DIv to the movie-view section of HTML 
                let streamLink = $("<br> <a href=" +streamUrl+ ">" + "click here" + "</a>");
                $(".str").append(streamLink);
            }
        });
    //===========================================================================================================
    let queryURL = "https://www.omdbapi.com/?t=" + moviename + "&apikey=bbe0873c";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        let title = response.Title;
        let plot = response.Plot;
        let rating = response.Rated;
        let released = response.Released;
        let imgURL = response.Poster;
        let imdbRating = response.imdbRating;
        let director = response.Director;
        let movieDiv = `
            <div class='movie'>
                <div class='movie-details'>${title}</div>
                <div class='movie-details'>
                    <img src='${imgURL}' class='movie-details-img'>
                </div>
                <div class='movie-details'>Directed By: ${director}</div>
                <div class='movie-details'>IMDB Rating: ${imdbRating}</div>
                <div class='movie-details'>Plot: ${plot}</div>
                <div class='movie-details'>Rated: ${rating}</div>
            </div>
        `; 
        $("#movies-view").html(movieDiv);
    });
    let APIKey ="AIzaSyBRWS_XeKrFV0AWfl7-6lyxMgrKTwJrygI"
    function getVideo() {
    $.ajax({
        type: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/search',
        data: {
            key: APIKey,
            q: moviename + "trailer",
            part: 'snippet',
            maxResults: 1,
            type: 'video',
            videoEmbeddable: true,
        },
        success: function(data){
            embedVideo(data)
            // console.log("You Tube Data: ",data);
        },
        error: function(response){
            console.log("Request Failed");
            // console.log(response);
        }
    });
    }
    function embedVideo(data) {
    $('iframe').attr('src', 'https://www.youtube.com/embed/' + data.items[0].id.videoId);
    $('iframe').addClass('you-tube-video');
    $('h3').text(data.items[0].snippet.title);
    $('.description').text(data.items[0].snippet.description);
}
getVideo();
});