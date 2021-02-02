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
    console.log(lat);
    console.log(lon);

    let hungerStage = $("#hungerLevel").find(":selected").text();
    console.log(hungerStage)

    let theCrave = $("#cuisineOption").find(":selected").text();
    console.log(theCrave)

    // connecting to the zomato API 
    let cuisine = theCrave;

    $.ajax({
        method: "GET",
        url: "https://developers.zomato.com/api/v2.1/search?lat=" + lat + "&lon=" + lon + "&q=" + cuisine + "&sort=real_distance",
        headers: {
            "user-key": "8d520ba5b6b4a6f2f35781a790c6fc0d",
            "content-type": "application/json"
        }
    })
        .then(response => {
            console.log(response)
            console.log(response.data.restaurants[0]);

        })
        // if (hungerStage === "Hangry") {
        //     console.log("Oh you Hangry!!")
        //     console.log(response.restaurants[0].name)
            
        //     // not sure this will bring the first one or not I kept requesting the API too much testing stuff out and cant test this
        //     // i will test this tomorrow
        //     // ###### we can have the link to the other page go here maybe and vice versa for else??
        // } else {
        //     console.log("Lets find a place to eat.")
        // }


});

