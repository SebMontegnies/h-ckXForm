/// <reference group="Dedicated Worker" />


$(document).ready(function () {

    var data;

    var $email = window.localStorage.getItem("mailUser");

    var $jsonFormat = {
        Email: $email,
    };

    var allCategories = new Array();
    var idCategories = new Array();
    var images = new Array();
    var index = 0;
    var isFinished = false;

    images.push("images/game.png");
    images.push("images/drink.png");
    images.push("images/run.png");
    images.push("images/cofee.png");
    images.push("images/movie.png");

    $.getJSON("http://shareamoment.azurewebsites.net/api/Categories", function (data) {

        var jsonData = JSON.parse(data);
        $.each(jsonData, function (idx, obj) {

            allCategories.push(obj.Name);
            idCategories.push(obj.CategoryId);

        });
    });

    document.getElementById("background").style.backgroundImage = "url('" + images[index] + "')";

    $("#buttonYes").click(function () {
       
        var $activityID = idCategories[index];

        if (isFinished) {
            window.localStorage.setItem("mailUser", $email);
            document.location.href = "mainPage.html";
        }

        var $jsonFormat = { UserEmail: $email, idCategory: $activityID };
        
        $.ajax({
            type: "POST",
            url: "http://shareamoment.azurewebsites.net/api/Users/Updateusercategory",
            data: JSON.stringify($jsonFormat),
            dataType: "json",
            contentType: "application/json",
            async: false,
        }).done(function (data) {
        }).fail(function (data) {
            Success = true;
        })

        if (index < allCategories.length)
        {
            index = index + 1;
            document.getElementById("background").style.backgroundImage = "url('" + images[index] + "')";
        }

        if (index == allCategories.length - 1) {
            isFinished = true;
        }

        

    });

    $("#buttonNo").click(function () {

        var $activityID = idCategories[index];

        if (isFinished) {
            window.localStorage.setItem("mailUser", $email);
            document.location.href = "mainPage.html";
        }

        if (index < allCategories.length ) {
            index = index + 1;
            document.getElementById("background").style.backgroundImage = "url('" +images[index] + "')";
        }
        if (index == allCategories.length -1) {
            isFinished = true;
        }
        
    });
});

