

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
    console.log("Hunger Level: " + hungerStage)

    let theCrave = $("#cuisineOption").find(":selected").text().toLowerCase();
    console.log("Craving: " + theCrave)


    if (hungerStage === "Hangry") {
        count = 1
    } else {
        count = 5
    }
    // renderMessage();
    //    zomato API conncect along with parameters for the hunger level 
    function howHungry() {
        let cuisine = theCrave;
        let count = "";

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


                    var cravingInfo = response.restaurants[i].restaurant;


                };


                localStorage.setItem("restaurant_info", JSON.stringify(response.restaurants));


                JSON.parse(localStorage.getItem("restaurant_info"));

            });




    };

    howHungry();



    // function getCalories(){
    //     let foodSelected = theCrave;


    //     $.ajax({
    //         method: "GET",
    //         url: "https://api.spoonacular.com/recipes/guessNutrition?title=" + foodSelected,
    //         headers: {
    //             "api_key": "852541059e4a4cfa83bf9e58e85eaa41",
    //             "content-type": "application/json"
    //         }
    //     }).then(response =>{
    //         console.log(response)
    //     })
    // }
    // getCalories();




});