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

$(document).ready(function () {
    var listCategory;

    $.getJSON("http://shareamoment.azurewebsites.net/api/Categories", function (data) {
        var jsonData = JSON.parse(data);

        $.each(jsonData, function (idx, obj) {
            $("#selectListCategory").append("<option value='" + obj.CategoryId + "'>"+obj.Name+"</option>")
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