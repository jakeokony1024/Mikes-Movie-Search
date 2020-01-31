//Jquery Document.Ready function
$(document).ready(function () {

    //Set up gobal variables

    var utellyResp;
    var display_name;
    var locations;
    var name;
    var picture;
    var provider;
    var movLink = "";

    //Sets up onclick funtion to capture the show that was search for

    $('#find-movie').on("click", function (event) {
        event.preventDefault();
        //Geting the value of text entered in  the input box 
        var movie = $("#movie-input").val().trim();
        console.log("This is the movie: " + movie);
        // Get Input and send to local storage
        var getInput = movie
        localStorage.setItem("storageName", getInput);

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
                //    console.log(utellyResp);
                //   console.log(utellyResp.results);
                //    console.log(utellyResp.results[0].name);
                //    console.log(utellyResp.results[0].locations[0].display_name);
                //    console.log(utellyResp.results[0].locations[0].url);
                //Loop through to get movie name
                // for (i = 0; i < utellyResp.results.length; i++) {

                //     var movieDiv = $("<div>"); //Jquery to make a Movie Div
                //     movieDiv.addClass("movieDiv float-left"); //Adding Bootstrap Class to position images
                //     var name = utellyResp.results[i].name; //Loop through UTELLY Json to get movie name 
                //     var p = $("<p>").text(name); //Setup a <p> tage for name
                //     movieDiv.attr("data-name", name);//gives each <p> tag matching data name with name
                //     var movieImage = $("<img>"); //creates an <img> tag on HTML
                //     movieImage.attr("src", utellyResp.results[i].picture); //Set img src attribute
                //     link = $("<a>");
                //     link.attr("href", "movie.html");
                //     link.addClass("link");
                //     link.addClass("rounded"); //Adds Bootstrap class to round edges of image   
                //     link.attr("target", "_blank")
                //     movieDiv.prepend(p); //Adds <p> before the movie image to the div   
                //     movieDiv.prepend(movieImage); //Adds the movieimage to the div   
                //     link.append(movieDiv);
                //     $("#movie-view").append(link); // Appends the DIv to the movie-view section of HTML   

                // }

                var movies = utellyResp.results
                movies.map(movie => {
                    var movieHtml =
                        `<a href='movie.html' data-movieName='${movie.name}' class='link movieAtag rounded' target='_blank'>
                        <div class='movieDiv float-left'>
                                <img src='${movie.picture}' />
                                <p data-name='${movie.name}'>${movie.name}</p>
                        </div>
                </a>`;
                    $("#movie-view").append(movieHtml);
                })

                $(document).on("click", ".movieAtag", function () {
                    movieName = localStorage.setItem($("storageName",$(this).data("moviename")))
                    console.log(movieName)
                });

            localStorage.setItem("storageName", moviename)
                
            });
    });
    //================================================================================================================================    
    //End tag for Document.Ready
});

