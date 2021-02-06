
// 
let lit = "";
let lon = "";
// let lat = " ";
// let lon = "";
let map;
function initMap() {
    console.log('in init map')
    // The location of atl
    let atl = { lat: 33, lng: -84 };
    // The map, centered at atl
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: atl,
    });
}
    // asking permission to get user location
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(showPosition);
        } else {
            //   disable button?
        }
    }
    function showPosition(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
    }
    function drawMarker(lat, lon){
        lat = parseInt(lat)
        lon =  parseInt(lon);
        console.log(lat);
        console.log(lon);
        console.log(typeof lat);
        console.log(typeof lon);
        const latLng = new google.maps.LatLng(lat,lon);
        var newMarker = new google.maps.Marker({
          position: latLng,
          map: map,
        });
        map.setCenter(newMarker); 
    }
    // google api 
    // Initialize and add the map
    getLocation();

$(".card").hide();

$("#searchBtn").on("click", function () {

    $(".card").show();

    // user input data location, hunger level, and craving
    console.log("Lattitude: " + lit);
    console.log("Longitude: " + lon);

    let hungerStage = $("#hungerLevel").find(":selected").text();
    console.log("Hunger Level: " + hungerStage);

    let theCrave = $("#cuisineOption").find(":selected").text();
    console.log("Craving: " + theCrave);

    localStorage.setItem("Search_History", JSON.stringify(theCrave));

    JSON.parse(localStorage.getItem("Search_History"));

    // renderMessage();
    //    zomato API conncect along with parameters for the hunger level 
    function howHungry() {

        let cuisine = theCrave;
        let count = "";
       

        if (hungerStage === "Hangry") {
            count = 1
        } else {
            count = 5
        }
        $.ajax({
            method: "GET",
            url: "https://developers.zomato.com/api/v2.1/search?lat=" + lit + "&lon=" + lon + "&q=" + cuisine + "&sort=real_distance&count=" + count,
            headers: {
                "user-key": "8d520ba5b6b4a6f2f35781a790c6fc0d",
                "content-type": "application/json"
            }
        })

            .then(response => {
                console.log(response)
           
                // $.ajax({
                //     method: "GET",
                //     url: "https://api.giphy.com/v1/gifs/search?api_key=KG2mY5zWex2Wfc6XGVJo0AbW6ZqLe2rL&q=" + theCrave,
                // }).then(response => {
                //     console.log(response)
                //     var results = response.data;
                   
                //     for (var i = 0; results.length > 5; i++) {
                
                //         let image = $("<img>").addClass("card-divider").attr("src", results[i].url)
                //     }
                 
                // });
           
                $("#foodChoice").empty();

                for (var i = 0; i < response.restaurants.length; i++) {
                    // let giphyImage = image;
                    console.log("Name: " + response.restaurants[i].restaurant.name);
                    console.log("Address: " + response.restaurants[i].restaurant.location.address);
                    console.log("Lattitude: " + response.restaurants[i].restaurant.location.latitude);
                    console.log("Longitude: " + response.restaurants[i].restaurant.location.longitude);
                    console.log("Phone Number: " + response.restaurants[i].restaurant.phone_numbers);
                    console.log("Average cost for 2: " + response.restaurants[i].restaurant.average_cost_for_two);
                    console.log("Menu: " + response.restaurants[i].restaurant.menu_url);

                    let returnedOutput = response.restaurants[i].restaurant;
                    let lastChoice = localStorage.getItem("Search_History");
                    console.log(lastChoice);

                    let card = $("<div>").addClass("card").css("width", "300px");
                    let name = $("<h5>").addClass("card-divider").text(returnedOutput.name);
                    // let image = $("<img>").addClass("card-divoder").attr("src", returnedOutput.photos_url);
                    let address = $("<p>").addClass("card-section").text("Address: " + returnedOutput.location.address);
                    let phone_numbs = $("<p>").addClass("card-section").text("Phone: " + returnedOutput.phone_numbers);
                    let costForTwo = $("<p>").addClass("card-section").text("Cost for two: $" + returnedOutput.average_cost_for_two);
                    let previousChoice = $("<p>").addClass(".card-section").text("Last Craving: " + lastChoice);
                    let menuBtn = $("<a>").addClass("button warning").attr("href", returnedOutput.menu_url).text("Menu");
                    let directions = $("<a>").addClass("button warning")
                        .attr("href", "https://www.google.com/maps/dir/Current+Location/" + returnedOutput.location.latitude + "," + returnedOutput.location.longitude)
                        .text("Directions");


                    card.append(name, address, phone_numbs, costForTwo, previousChoice, menuBtn, directions);
                    $("#foodChoice").append(card);

                };


            });

    };

    howHungry();


});


















