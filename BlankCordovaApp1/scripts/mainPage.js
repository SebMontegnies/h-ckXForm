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
        refreshEvent();
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
        refreshEvent();
    };
})();

var $lat, $long;
var $listEventFromServer;

$(document).ready(function () {

    refreshEvent();

    var $email = window.localStorage.getItem("mailUser");

    $(".btnMenu").click(function () {
        switch ($(this).attr("id")) {
            case "btnMenuParametre":
                window.localStorage.setItem("mailUser", $email);
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
});

function refreshEvent() {
    addAndRemoveEvent();
    setInterval(function () {
        addAndRemoveEvent();
    //Refresh the page every 5 minutes
    }, 300000)
};

function addAndRemoveEvent() {
    $("#eventDiv").empty();

    $infoToMainPage = {
        Email: window.localStorage.getItem("mailUser"),
        Latitude: "50.46",
        Longitude: "3.93"
    }


    $.ajax({
        type: "POST",
        url: "http://shareamoment.azurewebsites.net/api/events/startevents",
        data: JSON.stringify($infoToMainPage),
        dataType: "json",
        contentType: "application/json",
        async: false,
    }).done(function (data) {
        $listEventFromServer = data;

    }).fail(function (data) {
    })


    $.each($listEventFromServer, function () {
        
        $image = $(this).attr("CategoryName").replace(' ', '');
        if ($image == "Boireun verre") {
            $image = "Boireunverre";
        }

        $title = $(this).attr("Name");
        $description = $(this).attr("Description");

        if ($description.lenght > 55) {
            $description = $description.substring(0, 55)+"...";
        }

        $beginDate = $(this).attr("BeginDate");

        var $month = $beginDate.substr(5, 2);
        var $day = $beginDate.substr(8, 2);
        var $hour = $beginDate.substr(11, 2);
        var $min = $beginDate.substr(14, 2);

        $beginDate = $day+ "/" + $month + " " + $hour + ":" + $min;


        $event = '<section class="act" id="$(this).EventId">' +
        '<img class="act_img" src="images/' + $image + '.png" alt="">' +
        '<div class="act_content">' +
            '<h2>' + $title + '</h2>' +
            '<em class="green">' + $beginDate + '</em>' +
            '<p>' + $description+ '</p>' +
        '</div>' +
        '<div class="line"></div>' +
    '</section>'

        $("#eventDiv").append($event)

    })

    
}

function toggleBurgerMenu() {
    var cp = document.getElementById("burgerMenu");
    cp.style.height = window.innerHeight - 64 + "px";
    if (cp.style.left == "0px") {
        cp.style.left = "-260px";
    } else {
        cp.style.left = "0px";
    }
}