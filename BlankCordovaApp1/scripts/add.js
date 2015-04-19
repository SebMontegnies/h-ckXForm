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


$(document).ready(function () {
    $("#divLocalise").fadeOut();
    navigator.geolocation.getCurrentPosition(initialise);

    var listCategory;

    $.getJSON("http://shareamoment.azurewebsites.net/api/Categories", function (data) {
        var jsonData = JSON.parse(data);

        $.each(jsonData, function (idx, obj) {
            $("#selectListCategory").append("<option value='" + obj.CategoryId + "'>"+obj.Name+"</option>")
        });
    });


    $("#addEventButton").click(function () {
        $latitude = marker.position.k;
        $longitude = marker.position.D;
        $title = $("#titleEvent").val();
        $description = $("textarea#descriptionEvent").val();

        var dayMonthYear = $(".datepicker").val().split("-");
        $date = dayMonthYear[1] + "/" + dayMonthYear[0] + "/" + dayMonthYear[2];

        $hour = $(".timepicker").val();

        $category = $("#selectListCategory").find(":selected").text();

        $event = {
            Name: $title,
            BeginDate: $date+" "+$hour,
            Description: $description,
            Latitude: $latitude,
            Longitude: $longitude,
            Email: window.localStorage.getItem("mailUser"),
            CategoryName: $category
        }

        $.ajax({
            type: "POST",
            url: "http://shareamoment.azurewebsites.net/api/users/setuserevent",
            data: JSON.stringify($event),
            dataType: "json",
            contentType: "application/json",
            async: false,
        });
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


    $("#fadeInLocalise").click(function () {
        $("#divLocalise").fadeToggle("slow");
    });

    $('.datepicker').pickadate({
        monthsFull: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        weekdaysShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
        today: 'aujourd\'hui',
        clear: 'effacer',
        formatSubmit: 'yyyy/mm/dd',
        firstDay: 1,
        format: 'dd-mm-yyyy'
    });

    $('.timepicker').pickatime({
        format: 'HH:i'
    })
});

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

    //Center the view on our position
    var mapOptions = {
        center: currentLocation,
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


};
