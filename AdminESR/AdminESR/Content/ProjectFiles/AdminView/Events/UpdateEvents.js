function EventUpdate(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:6063/api/events/GetAllEventsById?id=" + id + "", //URI
        dataType: "json",
        success: function (data) {
            debugger;
            var datavalue = data;
            var myJsonObject = datavalue;
            contentType: "application/json";
            $.each(myJsonObject, function (i, mobj) {
                document.getElementById("EventId").value = mobj.Id;
                document.getElementById("EventName").value = mobj.Name;
                document.getElementById("EventPlace").value = mobj.Place;
                document.getElementById("EventDate").value = mobj.Date;
                document.getElementById("EventTime").value = mobj.AdminTime;
                document.getElementById("EventTicketPrice").value = mobj.TicketPrice;
                document.getElementById("EventDiscount").value = mobj.Discount;
            });

        },
        error: function (xhr) {
            bootbox.alert('Internel Error...');
        }
    });
}
function UpdateEventForm() {
    document.getElementById("BtnEvent").disabled = true;
    if ($("#EventName").val() != null) {
        var Carreer = {
            Id: $("#EventId").val(),
            Name: $("#EventName").val(), Place: $("#EventPlace").val(),
            Date: $("#EventDate").val(), Time: $("#EventTime").val(),
            Discount: $("#EventDiscount").val(), TicketPrice: $("#EventTicketPrice").val()
        };
        var CarreerData = JSON.stringify(Carreer);
        // Make Ajax request with the contentType = false, and procesDate = false
        var ajaxRequest = $.ajax({
            type: "POST",
            url: "http://localhost:6063/api/events/UpdateEvent",
            contentType: 'application/json; charset=utf-8',
            processData: false,
            dataType: "json",
            data: CarreerData,
            success: function (data, textStatus, xhr) {
                if (data == 0) {
                    document.getElementById("BtnEvent").disabled = false;
                    bootbox.alert('Try Again! Later...'); 
                }
                else {
                    var Imageform = new FormData();
                    Imageform.append("EventId", data);
                    var files = $("#EventImage").get(0).files;
                    Imageform.append("EventImage", files[0]);
                    // Add the uploaded image content to the form data collection
                    if (files[0] != null) {
                        var ajaxRequest = $.ajax({
                            type: "POST",
                            url: "http://localhost:6063/api/events/PostImages",
                            contentType: false,
                            processData: false,
                            data: Imageform,
                            success: function (data, textStatus, xhr) {
                            }
                        });
                    } 
                    document.getElementById("BtnEvent").disabled = false;
                    bootbox.alert('Event Successfully Updated!');
                    $('#Eventform')[0].reset();
                    myFunctionSwapView('EventDetails');
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                document.getElementById("BtnEvent").disabled = false;
                bootbox.alert('Server is not responding! Try Again Later');
            }
        });
        return false;
    }
    else {
        bootbox.alert("Make Sure All Fields with * are filled!");
        document.getElementById("BtnEvent").disabled = false;
        return false;
    }
}