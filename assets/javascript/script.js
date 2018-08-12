var characterArray = ["goku", "vegeta", "krillin", "bulma", "piccolo", "yamcha", "chichi", "gohan", "trunks", "goten", "android 17", "android 18", "cell", "frieza", "buu"];
const HOST = "api.giphy.com";
const PATH = "/v1/gifs/search";
const API_KEY = "5HJDnOlNRKonpjwua5UfJ6JTRXYXkKVP";
const RESULT_LIMIT = 10;

function displayResults(giphyData) {
    //clear images displayed from previous search
    $("#images").empty();

    const results = giphyData.data;

    for (var i = 0; i < results.length; i++) {
        const result = results[i];

        //get, and store in variables, the urls for the still and animated images
        const still = result.images.original_still.url;
        const animated = result.images.original.url;

        //create img tag with src and data attributes
        var img = $("<img>");
        img.attr("src", still);
        img.data({
            "still": still,
            "animated": animated
        });

        img.addClass("result-gif");

        img.on("click", function() {
            if ($(this).hasClass("animated")) {
                //stop animation, remove "animated" class
                $(this).attr("src", $(this).data("still"));
                $(this).removeClass("animated");
            } else {
                //play animation, add "animated" class
                $(this).attr("src", $(this).data("animated"));
                $(this).addClass("animated");
            }
        });

        //add rating text
        var rating = $("<p>");
        rating.addClass("rating");
        rating.text(`Rating: ${result.rating}`);

        //wrap in a div
        var newDiv = $("<div>").addClass("col-12 col-sm-6 col-md-4 col-lg-3").append(img, rating);
        $("#images").append(newDiv);
    }
}

function recreateButtons() {
    $("#character-buttons").empty();

    characterArray.forEach((name) => {
        var btn = $("<button>");
        btn.data("name", name);
        btn.addClass("character-button btn btn-dark");
        btn.text(name);

        btn.on("click", function() {
            const name = $(this).data("name");
            var q = `https://${HOST}${PATH}?api_key=${API_KEY}&q=dbz ${name}&limit=${RESULT_LIMIT}`;
            $.ajax({
                url: q,
                method: "GET"
            }).then(displayResults);
        });

        $("#character-buttons").append(btn);
    });
}

$(document).ready(function() {
    //display buttons
    recreateButtons();

    $("#btnAdd").on("click", function() {
        //update array
        const term = $("#characterInput").val().trim();
        if (term) {
            characterArray.push(term);
            recreateButtons();
        }
    });
});