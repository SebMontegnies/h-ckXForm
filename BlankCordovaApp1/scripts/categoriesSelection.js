/// <reference group="Dedicated Worker" />


$(document).ready(function () {

    var data;

    //var mailUser = window.localStorage.getItem("mailUser");

    var $email = "codu@codu.be";//.localStorage.getItem("mailUser");

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
        //var ul = document.getElementById("activityInfosList");

        $.each(jsonData, function (idx, obj) {

            allCategories.push(obj.Name);
            idCategories.push(obj.CategoryId);

        });


        //var li = document.createElement("li");
        //li.appendChild(document.createTextNode(allCategories[index]));
        //li.setAttribute("id", allCategories[index]);
        //ul.appendChild(li);
    });

    $("#buttonYes").click(function () {

        var $email = "codu@codu.be";//window.localStorage.getItem("mailUser");
        var $activityID = idCategories[index];

        if (isFinished) {
            window.localStorage.setItem("mailUser", $email);
            document.location.href = "mainPage.html";
        }

        if (index == allCategories.length-2) {
            //document.getElementById("buttonYes").innerHTML = "Accueil";
            isFinished = true;           
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



       // var li = document.getElementById(allCategories[index]);
        if (index < allCategories.length-1)
        {
            index = index + 1;            
        }
        //$("#myimg").attr("src", "/myimg.jpg?" + d.getTime());
        $(".icon").empty();
        $(".icon").append("<image src='" + images[index] + "' id='background_icon' alt=''");
        //var d = new Date();
        //$("#background_icon").attr("src", images[index]+""+ d.getTime());
        //li.innerHTML = allCategories[index];
        //li.setAttribute("id", allCategories[index]);
    });

    $("#buttonNo").click(function () {
        var $email = window.localStorage.getItem("mailUser");
        var $activityID = idCategories[index];

        if (isFinished) {
            window.localStorage.setItem("mailUser", $email);
            document.location.href = "mainPage.html";
        }

        if (index == allCategories.length - 2) {
            //document.getElementById("buttonNo").innerHTML = "Accueil";
            isFinished = true;
        }
       // var li = document.getElementById(allCategories[index]);
        if (index < allCategories.length - 1) {
            index = index + 1;
        }
        //li.innerHTML = allCategories[index];
        //li.setAttribute("id", allCategories[index]);
    });



    //$.ajax({
    //    type: "POST",
    //    url: "http://shareamoment.azurewebsites.net/api/Categories",
    //    data: JSON.stringify($jsonFormat),
    //    dataType: "json",
    //    contentType: "application/json",
    //    async: false,
    //}).done(function (data) {
    //    $.each(data, function (idx, obj) {
    //        allCategories[allCategories.length] = obj.Name;
    //    });
    //    var index = 0;
    //    var ul = document.getElementById("activityInfosList");
    //    var li = document.createElement("li");
    //    li.appendChild(document.createTextNode(allCategories[index]));
    //    li.setAttribute("id", allCategories[index]);
    //    ul.appendChild(li);

    //}).fail(function (data) {
    //    Success = true;
    //})


    

});

