// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
})();


var map;
var service;
var marker;

var eventLat;
var eventLong;


$(document).ready(function () {
    //google.maps.event.addDomListener(window, 'load', initialise);
    

    
   

    var $activityID = window.localStorage.getItem("idEvent");

    var $jsonFormat = {
        Guid: $activityID,
    };

    //data: JSON.stringify($jsonFormat),

    $.ajax({
        type: "GET",
        url: "http://shareamoment.azurewebsites.net/api/Events/" + $activityID,
        data: JSON.stringify($jsonFormat),
        dataType: "json",
        contentType: "application/json",
        async: false,
   
    }).done(function (data) {

        document.getElementById("desc_cat").innerHTML = data.CategoryName;
        document.getElementById("desc_date").innerHTML = data.BeginDate.substring(0, 10);
        document.getElementById("desc_hour").innerHTML = data.BeginDate.substring(11, 19);
        document.getElementById("desc_desc").innerHTML = data.Description;


        eventLat = data.Latitude;
        eventLong = data.Longitude;

        navigator.geolocation.getCurrentPosition(initialise);

    })
    .fail(function (data) {
        Success = true;
    })
});


$(".btnMenu").click(function () {
    switch ($(this).attr("id")) {
        case "btnMenuParametre":
            document.location.href = "userSettings.html";
            break;
        case "btnMenuProfil":
            document.location.href = "add.html";
            break;
        case "btnMenuAccueil":
            document.location.href = "mainPage.html";
            break;
        default:
            alert("not set yet");
    }
})



function toggleBurgerMenu() {
    var cp = document.getElementById("burgerMenu");
    cp.style.height = window.innerHeight - 60 + "px";
    if (cp.style.left == "0px") {
        cp.style.left = "-260px";
    } else {
        cp.style.left = "0px";
    }
}

function initialise(location) {
    //Get current position
    var currentLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);

    var eventLocation = new google.maps.LatLng(eventLat, eventLong);

    //Center the view on our position
    var mapOptions = {
        center: eventLocation,
        zoom: 15
    };

    //Create map
    map = new google.maps.Map(document.getElementById("divLocalise"),
            mapOptions);

    // To add the marker to the map, use the 'map' property
    marker = new google.maps.Marker({
        position: currentLocation,
        map: map,
        draggable: true,
        title: "Drag me!"
    });



    eventMarker = new google.maps.Marker({
        position: eventLocation,
        map: map,
        draggable: false,
        title: "Ici !"
    });


    


    

    
};
