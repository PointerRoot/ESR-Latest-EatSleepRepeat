function ClientUpdate(id) {
    $('html, body').animate({ scrollTop: 0 }, 'fast');
    $("#PakageTable").empty();
    var count2 = 0; 
    var ServicesSet = 0;
    $.ajax({
        type: "GET",
        url: "http://admin.eatsleeprepeatesr.com/api/pakages/GetAllPakages?id=" + count2 + "", //URI
        dataType: "json",
        success: function (data) { 
            debugger;
            var datavalue = data;
            var myJsonObject = datavalue;
            contentType: "application/json";
            $.each(myJsonObject, function (i, mobj) { 
                $("#PakageTable").append(' <tr id="jawad' + mobj.Id + '"> ' +
                    '               <td><input type="checkbox" class="checkbox" id="PakagesSelectBoxes' + mobj.Id + '" name="checkboxforPakage" value="' + mobj.Id + '"></td>' +
                    '               <td>' + mobj.Name + ' </td>' +
                    '               <td>' + mobj.PakageType+ ' </td>' +
                    '               <td>' + mobj.Priority + ' </td>' +

                    '</tr>');
                ServicesSet = 1;
            });
            if (ServicesSet != 0) {

                $.ajax({
                    type: "GET",
                    url: "http://admin.eatsleeprepeatesr.com/api/clients/GetAllClientsPakageById?id=" + id + "", //URI
                    dataType: "json",
                    success: function (data) {
                        debugger;
                        var datavalue = data;
                        var myJsonObject = datavalue;
                        contentType: "application/json";
                        $.each(myJsonObject, function (i, mobj) {  
                            document.getElementById("PakagesSelectBoxes" + mobj.PakageId + "").checked = true;
                        }); 
                    },
                    error: function (xhr) {
                        bootbox.alert('Internel Error...');
                    }
                });
            }
        },
        error: function (xhr) {
            bootbox.alert('Internel Error...');
        }
    });


    $.ajax({
        type: "GET",
        url: "http://admin.eatsleeprepeatesr.com/api/clients/GetAllClientsById?id=" + id + "", //URI
        dataType: "json",
        success: function (data) {
            debugger;
            var datavalue = data;
            var myJsonObject = datavalue;
            contentType: "application/json";
            $.each(myJsonObject, function (i, mobj) {
                document.getElementById("ClientId").value = mobj.Id;
                document.getElementById("ClientName").value = mobj.Name;
                document.getElementById("ClientTestimonial").value = mobj.Testimonial;

            });

        },
        error: function (xhr) {
            bootbox.alert('Internel Error...');
        }
    }); 
}
function UpdateClientForm() {
    document.getElementById("BtnClient").disabled = true;
    if ($("#ClientName").val() != null) {

        var Client = {
            Id: $("#ClientId").val(),
            Name: $("#ClientName").val(), Testimonial: $("#ClientTestimonial").val(),

        };
        var ClientData = JSON.stringify(Client);
        // Make Ajax request with the contentType = false, and procesDate = false
        var ajaxRequest = $.ajax({
            type: "POST",
            url: "http://admin.eatsleeprepeatesr.com/api/clients/UpdateClient",
            contentType: 'application/json; charset=utf-8',
            processData: false,
            dataType: "json",
            data: ClientData,
            success: function (data, textStatus, xhr) {
                if (data == 0) {
                    document.getElementById("BtnClient").disabled = false;
                    bootbox.alert('Try Again! Later...');
                    $('#Clientform')[0].reset();
                }
                else { 
                    var pack = "";
                    $("input:checkbox[name=checkboxforPakage]:checked").each(function () {
                        pack = pack + data + "," + $(this).val() + "$";
                    });
                    $.ajax({
                        type: "POST",
                        url: "http://admin.eatsleeprepeatesr.com/api/clients/PostClientPakage?id=" + pack + "",
                        contentType: 'application/json; charset=utf-8',
                        processData: false,
                        dataType: "json",
                        data: ClientData,
                        success: function (data, textStatus, xhr) {
                        },
                    });
                    document.getElementById("BtnClient").disabled = false;
                    bootbox.alert('Client Successfully Updated!'); 
                    $('#Clientform')[0].reset();
                    myFunctionSwapView('ClientDetails');
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                document.getElementById("BtnClient").disabled = false;
                bootbox.alert('Server is not responding! Try Again Later');
                $('#Clientform')[0].reset();
            }
        });
        return false;
    }
    else {
        bootbox.alert("Make Sure All Fields with * are filled!");
        document.getElementById("BtnClient").disabled = false;
        return false;
    }
}