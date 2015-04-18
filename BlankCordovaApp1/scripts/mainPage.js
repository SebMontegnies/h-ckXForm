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

$(document).ready(function () {
    refreshEvent();


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
});

function refreshEvent() {
    addAndRemoveEvent();
    setInterval(function () {
        addAndRemoveEvent();
    }, 300000)
};

function addAndRemoveEvent() {
    $("#eventDiv").empty();


    //Do a for each from the information got from web API
    var $image = 0;
    switch ($image) {
        case 0:
            $image = "header";
    }

    $title = "Un foot au mic?";
    $beginDate = "13/09/2015";
    $description = "J'ai envie de faire du foot, contactez moi au 0498/36.79.88";

    $event = '<section class="act">' +
        '<img class="act_img" src="images/' + $image + '.jpg" alt="">' +
        '<div class="act_content">' +
            '<h2>' + $title + '</h2>' +
            '<em class="green">' + $beginDate + '</em>' +
            '<p>' + $description + '</p>' +
        '</div>' +
        '<div class="line"></div>' +
    '</section>'

    $("#eventDiv").append($event)
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