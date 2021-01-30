// Request Geo location
var long = "";
var lat = "";

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    } else {
        //disable save button
    }
}

function showPosition(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
}

getLocation()

// on click receives geo locations
$("#searchBtn").on("click", function (getLocation) {

    console.log(lat);
    console.log(long);


 
    var eatTime = $("#hungerLevel").find(":selected").text();
    console.log(eatTime)

    var whatIWant = $("#cuisineOption").find(":selected").text();
    console.log(whatIWant)

    if (eatTime === "Hangry") { 
        //bring one response in closest proximity
    } else{
        //Bring back 5 Locations
    }

    //if (whatIWant === "cuisineOption") {

    }



})


    // let lat = ;
    // let lon = ;
    // let cuisine= ;
//     var queryUrl= "https://developers.zomato.com/api/v2.1/search?entity_type=city&lat=33&lon=-84&radius=5&cuisines=asian&sort=real_distance;"


//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function (response) {
//           // Create a new table row element
//     console.log(response)
// })