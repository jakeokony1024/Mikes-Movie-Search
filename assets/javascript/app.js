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
var onClickItem;

$(document).ready(function () {
	console.log("ready!")
	//Loop to get streaming service

	database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot){
		console.log(snapshot.val());
        movie = snapshot.val();
        console.log(onClickItem);
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
    
        var APIKey ="AIzaSyBBhRn34PTtR-EyygLxeptxYiPc9ThiQr8"
        // -----------------------------------------------------------------------
        function getVideo() {
          $.ajax({
            type: 'GET',
            url: 'https://www.googleapis.com/youtube/v3/search',
            data: {
                key: 'AIzaSyBBhRn34PTtR-EyygLxeptxYiPc9ThiQr8',
                q: "wonder woman 1984 trailer",
                part: 'snippet',
                maxResults: 1,
                type: 'video',
                videoEmbeddable: true,
            },
            success: function(data){
                embedVideo(data)
                console.log(data);
            },
            error: function(response){
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
    

		// for (a = 0; a < utellyResp.results[0].locations.length; a++) {
		// 	console.log(utellyResp.results[0].locations[a].display_name);
		// }
		
});