// get geolocation lat and long
// 

let lat = "";
let lon = "";

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

getLocation();

$("#searchBtn").on("click", function () {

    // user input data location, hunger level, and craving
    console.log("Lattitude: " + lat);
    console.log("Longitude: " + lon);

    let hungerStage = $("#hungerLevel").find(":selected").text();
    console.log("Hunger Level: " + hungerStage);

    let theCrave = $("#cuisineOption").find(":selected").text().toLowerCase();
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
            url: "https://developers.zomato.com/api/v2.1/search?lat=" + lat + "&lon=" + lon + "&q=" + cuisine + "&sort=real_distance&count=" + count,
            headers: {
                "user-key": "8d520ba5b6b4a6f2f35781a790c6fc0d",
                "content-type": "application/json"
            }
        })


            .then(response => {
                console.log(response)
                // testing to find the name, phone number, location, user rating if avaialbe

                for (var i = 0; i < response.restaurants.length; i++) {
                    console.log("Name: " + response.restaurants[i].restaurant.name);
                    console.log("Address: " + response.restaurants[i].restaurant.location.address);
                    console.log("Lattitude: " + response.restaurants[i].restaurant.location.latitude);
                    console.log("Longitude: " + response.restaurants[i].restaurant.location.longitude);
                    console.log("Phone Number: " + response.restaurants[i].restaurant.phone_numbers);
                    console.log("Average cost for 2: " + response.restaurants[i].restaurant.average_cost_for_two);
                    console.log("Menu: " + response.restaurants[i].restaurant.menu_url);


                    // function getFoodNow(response) {

                    // }

                    let returnedOutput = response.restaurants[i].restaurant;

                    $(".card-divider").empty();

                    $(".card-section").empty();
                    // $("#choiceGen").empty();

                    
                    // const card = $("<div>").addClass("columns medium-6 large-8");
                    const cardStyle = $("<div>").addClass("card").style("width: 250px;");
                    const name = $("<h5>").addClass(".card-divider").text(returnedOutput.name);
                    const address = $("<p>").addClass(".card-section").text(returnedOutput.location.address);
                    const phone_numbs = $("<p>").addClass(".card-section").text(returnedOutput.phone_numbers);
                    const costForTwo = $("<p>").addClass(".card-section").text(returnedOutput.average_cost_for_two);
                    const menuBtn = $("<button>").addClass(".button warning").text("Menu").attr("href", returnedOutput.menu_url);
                    const directions = $("<button>").addClass(".button warning").text("Directions").attr("href", "https://www.google.com/maps/dir/Current+Location/" + returnedOutput.location.latitude + "," + returnedOutput.location.longitude);

                    $(".card-divider").append(name);
                    $(".card-section").append(address,phone_numbs,costForTwo,menuBtn,directions);
                    // cardStyle.append(name,phone_numbs,costForTwo,menuBtn,directions);
                    // card.append(cardStyle);
                    // $("#choiceGen").append(card);

                };



                // getFoodNow(response);




            });

    };

    howHungry();


});