// Array of Movies
var movies = ["The Raid 2", "Interstellar", "IT", "The Shining", "Princess Mononoke", "The Dark Knight", "Pulp Fiction"];

// Render the buttons function
function renderButtons() {
    // Empty the div
    $("#movies-area").empty();
    // Create buttons for all the movies in the movies array
    for (var i = 0; i < movies.length; i++) {
        var button = $("<button>");
        button.addClass("movie");
        button.attr("data-name", movies[i]);
        button.text(movies[i]);
        $("#movies-area").append(button);
    }
}

// Push movie from input to the array on click
$("#addmovie").on("click", function(event) {
    event.preventDefault();
    var movie = $("#movie-input").val().trim();
    movies.push(movie);
    renderButtons();
});

// Starts renderbuttons function
renderButtons()

// When clicking any button, use the api to create divs and append it to the page
$("button").on("click", function() {
    // Empty div first
    $("#gifs").empty();
    var moviename = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + moviename + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing ajax request
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var movieDiv = $("<div>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                var movieImage = $("<img>");
                movieImage.attr("src", results[i].images.fixed_height.url);
                movieDiv.append(p);
                movieDiv.append(movieImage);
                $("#gifs").prepend(movieDiv);
            }
        });
});