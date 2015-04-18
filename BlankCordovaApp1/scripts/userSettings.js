/// <reference group="Dedicated Worker" />

onmessage = function (event) {

}

$(document).ready(function () {

    var data;


    $.getJSON("http://shareamoment.azurewebsites.net/api/Categories", function (data) {

        var jsonData = JSON.parse(data);
        var ul = document.getElementById("activitiesList");
        var i = 0;
        $.each(jsonData, function (idx, obj) {


            var li = document.createElement("li");
            li.appendChild(document.createTextNode(obj.Name));
            li.setAttribute("id", "categorie" + i);
            li.setAttribute("class", "isSelected");
            i = i + 1;
            ul.appendChild(li);
        });
    });

    $("li").click(function () {
        alert("yo");
    })
       
        
   

    var $email = $("#emailIndex").val();
    var $password = $("#passwordIndex").val();

    var $jsonFormat = {
        Email: $email,
        Password: $password
    };


    });

