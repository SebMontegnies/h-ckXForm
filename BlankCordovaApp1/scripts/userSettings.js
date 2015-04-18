/// <reference group="Dedicated Worker" />


$(document).ready(function () {

    var data;

    var getUserCategoriesConnection = "http://shareamoment.azurewebsites.net/api/Users/getUserCategories/";
    
    var $mailUser = window.localStorage.getItem("mailUser");

        //var $email = $("#emailIndex").val();


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

        
            //var jsonData = JSON.parse(data);
            var ul = document.getElementById("activitiesList");

            $.each(data, function (idx, obj) {


                var li = document.createElement("li");
                li.appendChild(document.createTextNode(obj.Name));

           



                li.setAttribute("id", obj.CategoryId);
            

                if (obj.Selected) {
                    li.setAttribute("class", "isSelected");
                }
                else {
                    li.setAttribute("class", "isNotSelected");
                }

                ul.appendChild(li);
            
            });

            $('li').click(function () {

                if ((this).getAttribute("class") == "isNotSelected")
                {
                    (this).setAttribute("class", "isSelected");

                    
                }
                else
                {
                    (this).setAttribute("class", "isNotSelected");
                }


                var $email = "codu@codu.be";
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

                    alert("OK ");

                }).fail(function (data) {
                    Success = true;
                })



            });
        }).fail(function (data) {
            Success = true;
        })

    });


