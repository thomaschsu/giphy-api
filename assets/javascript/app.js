// Array of Movies
var movies = ["The Raid 2", "Interstellar", "IT", "The Shining", "Princess Mononoke"];

// Render the buttons function
function renderButtons() {
    // Empty the div
    $("#movies-area").empty();
    // Create buttons for all the movies in array
    for (var i = 0; i < movies.length; i++) {
        var button = $("<button>");
        button.addClass("movie");
        button.attr("data-name", movies[i]);
        button.text(movies[i]);
        $("#movies-area").append(button);
    }
}

// Push movie to the array on click
$("#addmovie").on("click", function(event) {
    event.preventDefault();
    var movie = $("#movie-input").val().trim();
    movies.push(movie);
    renderButtons();
});

// Starts renderbuttons function
renderButtons()

$("button").on("click", function() {

    var moviename = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        moviename + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After data comes back from the request
        .then(function(response) {

            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var movieDiv = $("<div>");

                var p = $("<p>").text("Rating: " + results[i].rating);

                // Creating and storing an image tag
                var movieImage = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item
                movieImage.attr("src", results[i].images.fixed_height.url);

                // Appending the paragraph and image tag to the animalDiv
                movieDiv.append(p);
                movieDiv.append(movieImage);

                $("#gifs").prepend(movieDiv);
            }
        });
});