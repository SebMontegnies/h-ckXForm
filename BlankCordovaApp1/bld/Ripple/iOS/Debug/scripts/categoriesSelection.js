﻿/// <reference group="Dedicated Worker" />


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

    images.push("/images/JeuxVidéo.png");
    images.push("/images/Soirée.png");
    images.push("/images/Sport.png");
    images.push("/images/Boireunverre.png");
    images.push("/images/Cinema.png");

    $("#category").html(allCategories[index] + "");

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

        
        $("#category").text(allCategories[index]+" ");
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
        $("#category").append(allCategories[index] + "");
    });
});

function changeLi() {

}