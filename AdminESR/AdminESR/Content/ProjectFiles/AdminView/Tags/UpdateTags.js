function TagUpdate(id) {
    $('html, body').animate({ scrollTop: 0 }, 'fast');
    $.ajax({
        type: "GET",
        url: "http://localhost:6063/api/tags/GetAllTagsById?id=" + id + "", //URI
        dataType: "json",
        success: function (data) {
            debugger;
            var datavalue = data;
            var myJsonObject = datavalue;
            contentType: "application/json";
            $.each(myJsonObject, function (i, mobj) {
                document.getElementById("TagId").value = mobj.Id;
                document.getElementById("TagDescription").value = mobj.Description;
                
            });

        },
        error: function (xhr) {
            bootbox.alert('Internel Error...');
        }
    });
}
function UpdateTagForm() {
    document.getElementById("BtnTag").disabled = true;
    if ($("#TagDescription").val() != null) {
        var Carreer = {
            Id: $("#TagId").val(),
            Description: $("#TagDescription").val(), 
        };
        var CarreerData = JSON.stringify(Carreer);
        // Make Ajax request with the contentType = false, and procesDate = false
        var ajaxRequest = $.ajax({
            type: "POST",
            url: "http://localhost:6063/api/tags/UpdateTags",
            contentType: 'application/json; charset=utf-8',
            processData: false,
            dataType: "json",
            data: CarreerData,
            success: function (data, textStatus, xhr) {
                if (data == 0) {
                    document.getElementById("BtnTag").disabled = false;
                    bootbox.alert('Try Again! Later...');

                }
                else {
                    document.getElementById("BtnTag").disabled = false;
                    bootbox.alert('Tag Successfully Updated!');
                    $('#Tagform')[0].reset();
                    myFunctionSwapView('TagDetails');
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                document.getElementById("BtnTag").disabled = false;
                bootbox.alert('Server is not responding! Try Again Later');
            }
        });
        return false;
    }
    else {
        bootbox.alert("Make Sure All Fields with * are filled!");
        document.getElementById("BtnTag").disabled = false;
        return false;
    }
}