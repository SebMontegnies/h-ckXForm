/// <reference group="Dedicated Worker" />


$(document).ready(function () {
    var valof = $("#progressBar").val();
    $("#kmInput").val(valof+"km");

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
    });


    $("#progressBar").on('change', function () {
        var valof = $(this).val();
        $("#kmInput").val(valof+"km");
    });




    var data;

    var getUserCategoriesConnection = "http://shareamoment.azurewebsites.net/api/Users/getUserCategories/";
    
    var $mailUser = window.localStorage.getItem("mailUser");

        //var $email = $("#emailIndex").val();

    var $email = window.localStorage.getItem("mailUser");

        var $jsonFormat = {
            Email: $mailUser,
        };


        $.ajax({
            type: "POST",
            url: "http://shareamoment.azurewebsites.net/api/Users/getUserCategories/",
            data: JSON.stringify($jsonFormat),
            dataType: "json",
            contentType: "application/json",
            async: false,
        }).done(function (data) {
            var ul = document.getElementById("activitiesList");

            $.each(data, function (idx, obj) {
                var li = document.createElement("li");
                li.appendChild(document.createTextNode(obj.Name));
                li.setAttribute("id", obj.CategoryId);

                if (obj.Selected) {
                    li.setAttribute("class", "liSettingsEvent check");
                }
                else {
                    li.setAttribute("class", "liSettingsEvent no_check");
                }

               

                ul.appendChild(li);
            
            });

            $('li.liSettingsEvent').click(function () {

                if ((this).getAttribute("class") == "liSettingsEvent no_check")
                {
                    (this).setAttribute("class", "liSettingsEvent check");

                    
                }
                else
                {
                    (this).setAttribute("class", "liSettingsEvent no_check");
                }


                var $email = window.localStorage.getItem("mailUser");
                var $activityID = $(this).attr('id');


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



            });
        }).fail(function (data) {
            Success = true;
        })

    });


function toggleBurgerMenu() {
    var cp = document.getElementById("burgerMenu");
    cp.style.height = window.innerHeight - 64 + "px";
    if (cp.style.left == "0px") {
        cp.style.left = "-260px";
    } else {
        cp.style.left = "0px";
    }
}

function getInformationsAboutPerson() {

    $.ajax({
        type: "GET",
        url: "http://shareamoment.azurewebsites.net/api/Users/get/",
        data: JSON.stringify($jsonFormat),
        dataType: "json",
        contentType: "application/json",
        async: false,
    }).done(function (data) {
        var ul = document.getElementById("activitiesList");

        $.each(data, function (idx, obj) {
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(obj.Name));
            li.setAttribute("id", obj.CategoryId);

            if (obj.Selected) {
                li.setAttribute("class", "liSettingsEvent check");
            }
            else {
                li.setAttribute("class", "liSettingsEvent no_check");
            }

               

            ul.appendChild(li);
            
        });
}