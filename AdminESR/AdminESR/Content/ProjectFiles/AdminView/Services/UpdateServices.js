function ServiceUpdate(id) {
    $('html, body').animate({ scrollTop: 0 }, 'fast');
    $.ajax({
        type: "GET",
        url: "http://localhost:6063/api/services/GetAllServicesById?id=" + id + "", //URI
        dataType: "json",
        success: function (data) {
            debugger;
            var datavalue = data;
            var myJsonObject = datavalue;
            contentType: "application/json";
            $.each(myJsonObject, function (i, mobj) {
                document.getElementById("ServiceId").value = mobj.Id;
                document.getElementById("ServiceName").value = mobj.Name;
                document.getElementById("ServiceDescription").value = mobj.Description;
            });

        },
        error: function (xhr) {
            bootbox.alert('Internel Error...');
        }
    });
}
function UpdateServiceForm() {
    document.getElementById("BtnService").disabled = true;
    if ($("#ServiceName").val() != null) {
        var Carreer = {
            Id: $("#ServiceId").val(),
            Name: $("#ServiceName").val(),
            Description: $("#ServiceDescription").val()
        };
        var CarreerData = JSON.stringify(Carreer);
        // Make Ajax request with the contentType = false, and procesDate = false
        var ajaxRequest = $.ajax({
            type: "POST",
            url: "http://localhost:6063/api/services/UpdateService",
            contentType: 'application/json; charset=utf-8',
            processData: false,
            dataType: "json",
            data: CarreerData,
            success: function (data, textStatus, xhr) {
                if (data == 0) {
                    document.getElementById("BtnService").disabled = false;
                    bootbox.alert('Try Again! Later...');

                }
                else {
                    document.getElementById("BtnService").disabled = false;
                    bootbox.alert('Service Successfully Updated!');
                    $('#Serviceform')[0].reset();
                    myFunctionSwapView('ServiceDetails');
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                document.getElementById("BtnService").disabled = false;
                bootbox.alert('Server is not responding! Try Again Later');
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