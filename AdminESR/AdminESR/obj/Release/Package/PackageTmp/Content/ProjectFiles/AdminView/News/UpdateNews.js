function NewUpdate(id) {
    $.ajax({
        type: "GET",
        url: "http://admin.eatsleeprepeatesr.com/api/News/GetAllNewsById?id=" + id + "", //URI
        dataType: "json",
        success: function (data) {
            debugger;
            var datavalue = data;
            var myJsonObject = datavalue;
            contentType: "application/json";
            $.each(myJsonObject, function (i, mobj) {
                document.getElementById("NewId").value = mobj.Id;
                document.getElementById("NewsTitle").value = mobj.Title;
                document.getElementById("NewsDescription").value = mobj.Description;
               
            });

        },
        error: function (xhr) {
            bootbox.alert('Internel Error...');
        }
    });
}
function UpdateNewForm() {
    document.getElementById("BtnNew").disabled = true;
    if ($("#NewsTitle").val() != null) {
        var Carreer = {
            Id: $("#NewId").val(),
            Title: $("#NewsTitle").val(), Description: $("#NewsDescription").val()
        };
        var CarreerData = JSON.stringify(Carreer);
        // Make Ajax request with the contentType = false, and procesDate = false
        var ajaxRequest = $.ajax({
            type: "POST",
            url: "http://admin.eatsleeprepeatesr.com/api/news/UpdateNews",
            contentType: 'application/json; charset=utf-8',
            processData: false,
            dataType: "json",
            data: CarreerData,
            success: function (data, textStatus, xhr) {
                if (data == 0) {
                    document.getElementById("BtnNew").disabled = false;
                    bootbox.alert('Try Again! Later...');

                }
                else {
                    var Imageform = new FormData();
                    Imageform.append("NewsId", data);
                    var files = $("#NewsImage").get(0).files;
                    Imageform.append("NewsImage", files[0]);
                    // Add the uploaded image content to the form data collection
                    if (files[0] != null) {
                        var ajaxRequest = $.ajax({
                            type: "POST",
                            url: "http://admin.eatsleeprepeatesr.com/api/news/PostImages",
                            contentType: false,
                            processData: false,
                            data: Imageform,
                            success: function (data, textStatus, xhr) {
                            }
                        });
                    }
                    document.getElementById("BtnNew").disabled = false;
                    bootbox.alert('News Successfully Updated!');
                    $('#Newform')[0].reset();
                    myFunctionSwapView('NewDetails');
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                document.getElementById("BtnNew").disabled = false;
                bootbox.alert('Server is not responding! Try Again Later');
            }
        });
        return false;
    }
    else {
        bootbox.alert("Make Sure All Fields with * are filled!");
        document.getElementById("BtnNew").disabled = false;
        return false;
    }
}