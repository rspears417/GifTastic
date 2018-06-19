$(document).ready(function() {

    //initial array of types of sports to pre-populate starter buttons

    var topics = [  "Basketball", "Football", "Baseball", "Tennis", "Hockey", "Swimming", "Volleyball"];

    //first need function to GET attributes and display content to DOM using Giphy API and JSON

    function displayInfo() {
        var sport = $(this).attr("sport-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=dc6zaTOxFJmzC&limit=10";

        //use AJAX to GET information on sport button clicked

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {

            //empty sports div so new selection appends to emtpy div - do not want previous searches listed

            $("#sports").empty();

            var results = response.data;

            //user for loop to grab the rating information and appropriate gif for button clicked into its own div to keep information together

            for (var i = 0; i < results.length; i++) {
                var sportDiv = $("<div class='userSport'>");

                //make variable for rating for clean appending

                var rating = results[i].rating;
                var pRate = $("<p>").text("Rating: " + rating);

                //make variables for still url and animated url for clean build

                var urlStill = results[i].images.fixed_height_still.url;
                var urlPlay = results[i].images.fixed_height.url;

                //gif needs still source to load, and data attributes to store the still and animated gifs for pausing function

                var gif = $("<img>").addClass("gif").attr("src", urlStill).attr("data-still", urlStill).attr("data-animate", urlPlay).attr("data-state", "still");

                //append the gif and rating to the new div created during for loop

                sportDiv.append(gif);
                sportDiv.append(pRate);

                //append all for loop created divs to the DOM

                $("#sports").append(sportDiv);
            }

            //on click of gif still image, gif will play. When clicked again, gif will pause.

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

    }

    //create buttons out of array indexes - gets information from JSON

    function renderButtons() {

        //delete original array of buttons everytime renders so they do not keep repeating

        $("#sportButtons").empty();

        //loop through array

        for (var i = 0; i < topics.length; i++) {

            var sportRender = $("<button>");

            //add class and attribute of name so display function knows what to GET.

            sportRender.addClass("sport");
            sportRender.attr("sport-name", topics[i]);
            sportRender.text(topics[i]);
            $("#sportButtons").append(sportRender);
        }
    }

    //on click event to add an additional sport button when submitted - push input to array.

    $("#addSport").on("click", function(event) {
        event.preventDefault();
        var sport = $("#sport-input").val().trim();

        //push input to original topics array and then rerun render of buttons to show newly added button.
        topics.push(sport);
            $("#sport-input").val(" ");
        renderButtons();
    });


    //on click entire document to cover all elements named "sport" and run display function
    $(document).on("click", ".sport", displayInfo);

    //run function to display all buttons on startup
    renderButtons();

});