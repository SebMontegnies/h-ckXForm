/// <reference group="Dedicated Worker" />

onmessage = function (event) {

}

$(document).ready(function () {

    var data;

    //Récupération de toutes les catégories.
    $.getJSON("http://shareamoment.azurewebsites.net/api/Categories", function (data) {

        var jsonData = JSON.parse(data);
        var ul = document.getElementById("activitiesList");

        $.each(jsonData, function (idx, obj) {


            var li = document.createElement("li");
            li.appendChild(document.createTextNode(obj.Name));



            li.setAttribute("id", obj.CategoryId);
            li.setAttribute("class", "isNotSelected");



            ul.appendChild(li);
            
        });

        $('li').click(function () {
            
            //if ($(this).css().val)
            $(this).setAttribute("class", "isNotSelected");
            alert($(this).css("background-color"));
            if ($(this).css("background-color") == "rgb(63,246,34)")
            {
                alert("wesh");
            }
                

        })
    });

    
       
        
   

    var $email = $("#emailIndex").val();
    var $password = $("#passwordIndex").val();

    var $jsonFormat = {
        Email: $email,
        Password: $password
    };


    });

