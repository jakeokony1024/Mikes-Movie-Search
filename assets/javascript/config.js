//Jquery Document.Ready function
$(document).ready(function() {
  //Set up gobal variables

  var utellyResp;
  var display_name;
  var locations;
  var name;
  var picture;
  var movieName;
  var movieAtag;
  var movieDiv = $("#movie-view");
  var p;
  //Sets up onclick funtion to capture the show that was search for
  $("#clear").on('click', function() {
    $("#movie-view").empty();
  })

  $("#find-movie").on("click", function(event) {
    event.preventDefault();
    $("#movie-view").empty();
    //Geting the value of text entered in  the input box
    var movie = $("#movie-input").val().trim();
    //Utelly API call to get the show that was searched for to see where it's streaming
    const url =
      "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" +
      movie +
      "&country=us";
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-host":
          "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
        "x-rapidapi-key": "dfb87b0ec6msh548e75d6f762a4bp1dc2f1jsn322c78d86502"
      }
    };
    fetch(url, options)
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        utellyResp = myJson;
        var movies = utellyResp.results;
        movies.map(movie => {
          if(movie.picture == null) {
            movie.picture = './assets/images/coming-soon.jpeg'
          }
          var movieHtml = 
          `<div class='search-results'>
                <div class='movieDiv'>
                  <a href='movie.html' data-moviename='${movie.name}' class='link movieAtag rounded'>
                    <p data-name='${movie.name}' class ='movPTitle'>${movie.name}</p> 
                    <div class='img-container'>
                      <img class='results-image' src='${movie.picture}' />
                    </div>
                  </a>
                </div>
          </div>`;
          $("#movie-view").prepend(movieHtml);
        });
        $(document).on("click", ".movieAtag", function() {
          movieName = localStorage.setItem(
            "storageName",
            $(this).data("moviename")
          );
        });
        localStorage.setItem("storageName", movieName);
      });
  });
  //End tag for Document.Ready
});
