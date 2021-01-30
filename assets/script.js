$("#searchBtn").on("click", function () {


    var eatTime = $("#hungerLevel").find(":selected").text();
    console.log(eatTime)

    var whatIWant = $("#cuisineOption").find(":selected").text();
    console.log(whatIWant)

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