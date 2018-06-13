// Array of Movies
var topics = ["The Raid 2", "Interstellar", "IT", "The Shining", "Princess Mononoke", "The Dark Knight", "Pulp Fiction"];

// Render the buttons function
function renderButtons() {
    // Empty the div
    $("#movies-area").empty();
    // Create buttons for all the movies in the movies array
    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>");
        button.addClass("movie");
        button.attr("data-name", topics[i]);
        button.text(topics[i]);
        $("#movies-area").append(button);
    }
}

// Push movie from input to the array on click
$("#addmovie").on("click", function(event) {
    event.preventDefault();
    var movie = $("#movie-input").val().trim();
    topics.push(movie);
    renderButtons();
});

// Starts renderbuttons function
renderButtons();

// When clicking any button, use the api to create divs and append it to the page
function displayGif() {
    // Empty div first
    $("#gifs").empty();
    var moviename = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + moviename + "&api_key=YbbgL7905pEp1YhyP3VAMj7VucBjHZAF&limit=10";

    // Performing ajax request
    $.ajax({
            url: queryURL,
            method: "GET",
        })
        .then(function(response) {
            var results = response.data;
            // Create divs and attach movies to it
            for (var i = 0; i < results.length; i++) {
                var movieDiv = $("<div>");
                movieDiv.addClass("movieDiv");
                var p = $("<p>").text("Rating: " + results[i].rating.toUpperCase());
                var movieImage = $("<img>");
                movieImage.attr("src", results[i].images.fixed_height_still.url);
                movieImage.attr("data-still", results[i].images.fixed_height_still.url);
                movieImage.attr("data-animate", results[i].images.fixed_height.url);
                movieImage.attr("data-state", "still");
                movieImage.addClass("gif");
                movieDiv.append(movieImage);
                movieDiv.append(p);
                $("#gifs").prepend(movieDiv);
            }
            // On click event to change the state of the gif
            $(".gif").on("click", function() {
                var state = $(this).attr("data-state");
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });
        });
};

// Add click event to all buttons
$(document).on("click", "button", displayGif);