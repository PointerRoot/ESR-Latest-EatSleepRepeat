function ValidateNewsForm() {
    document.getElementById("BtnNews").disabled = true;
    if ($("#NewsTitle").val() != null) {
        var News = {
            Title: $("#NewsTitle").val(), Description: $("#NewsDescription").val()
        };
        var NewsData = JSON.stringify(News);
        // Make Ajax request with the contentType = false, and procesDate = false
        var ajaxRequest = $.ajax({
            type: "POST",
            url: "http://admin.eatsleeprepeatesr.com/api/news/PostNews",
            contentType: 'application/json; charset=utf-8',
            processData: false,
            dataType: "json",
            data: NewsData,
            success: function (data, textStatus, xhr) {
                if (data == 0) {
                    document.getElementById("BtnNews").disabled = false;
                    bootbox.alert('Try Again! Later...');
                    $('#Newsform')[0].reset();
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
                    document.getElementById("BtnNews").disabled = false;
                    bootbox.alert('News Successfully Added!');
                    $('#Newsform')[0].reset();
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                document.getElementById("BtnNews").disabled = false;
                bootbox.alert('Server is not responding! Try Again Later');
                $('#Newsform')[0].reset();
            }
        });
        return false;
    }
    else {
        bootbox.alert("Make Sure All Fields with * are filled!");
        document.getElementById("BtnNews").disabled = false;
        return false;
    }
}