

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

                // console.log(response.data.restaurants[0]);

                console.log(response.data.restaurants[0]);

            });
    };
    howHungry();

    
});