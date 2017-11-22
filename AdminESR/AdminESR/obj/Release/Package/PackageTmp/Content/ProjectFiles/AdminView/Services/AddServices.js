function ValidateServiceForm() {
    document.getElementById("BtnService").disabled = true;
    if ($("#ServiceName").val() != null) {
        var Service = {
            Name: $("#ServiceName").val(), Description: $("#ServiceDescription").val()
        };
        var ServiceData = JSON.stringify(Service);
        // Make Ajax request with the contentType = false, and procesDate = false
        var ajaxRequest = $.ajax({
            type: "POST",
            url: "http://admin.eatsleeprepeatesr.com/api/services/PostService",
            contentType: 'application/json; charset=utf-8',
            processData: false,
            dataType: "json",
            data: ServiceData,
            success: function (data, textStatus, xhr) {
                if (data == 0) {
                    document.getElementById("BtnService").disabled = false;
                    bootbox.alert('Try Again! Later...');
                    $('#Serviceform')[0].reset();
                }
                else {
                    
                    document.getElementById("BtnService").disabled = false;
                    bootbox.alert('Service Successfully Added!');
                    $('#Serviceform')[0].reset();
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                document.getElementById("BtnService").disabled = false;
                bootbox.alert('Server is not responding! Try Again Later');
                $('#Serviceform')[0].reset();
            }
        });
        return false;
    }
    else {
        bootbox.alert("Make Sure All Fields with * are filled!");
        document.getElementById("BtnService").disabled = false;
        return false;
    }
}