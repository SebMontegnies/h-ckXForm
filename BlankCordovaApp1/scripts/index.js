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

function wrongPassword() {
    $("#wrongPasswordIndex").removeAttr("hidden");
};

$(document).ready(function () {
    $("#signInBtn").click(function () {
        var $email = $("#emailIndex").val();
        var $password = $("#passwordIndex").val();

        var $jsonFormat = {
            Email: $email,
            Password: $password
        };


        $.ajax({
            type: "POST",
            url: "http://shareamoment.azurewebsites.net/api/Users",
            data: JSON.stringify($jsonFormat),
            dataType: "json",
            contentType: "application/json",
            async: false,
        }).done(function (data) {
            
            switch (data) {
                case '0':
                    //Failed to connect, user already in the database
                    alert("Wrong password");
                    wrongPassword();
                    return false;
                case '1':
                    //Success, the user is already in the database
                    alert("Already in the database");
                    break;
                case '2':
                    //THe user is not in the database, need to create his account
                    alert("Not in the database yet");
                    break;
                default:
                    //TODO show an error message
            }
        }).fail(function (data) {
            Success = true;
        })

    });


});