function ValidateEventForm() {
    document.getElementById("BtnEvent").disabled = true;
    if ($("#EventName").val() != null) {

        var Event = {
            Name: $("#EventName").val(), Place: $("#EventPlace").val(),
            Date: $("#EventDate").val(), Time: $("#EventTime").val(),
            Discount: $("#EventDiscount").val(), TicketPrice: $("#EventTicketPrice").val()
        };
        var EventData = JSON.stringify(Event);
        // Make Ajax request with the contentType = false, and procesDate = false
        var ajaxRequest = $.ajax({
            type: "POST",
            url: "http://localhost:6063/api/events/PostEvent",
            contentType: 'application/json; charset=utf-8',
            processData: false,
            dataType: "json",
            data: EventData,
            success: function (data, textStatus, xhr) {
                if (data == 0) {
                    document.getElementById("BtnEvent").disabled = false;
                    bootbox.alert('Try Again! Later...');
                    $('#Eventform')[0].reset();
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
                    bootbox.alert('Event Successfully Added!');
                    var count = parseInt(document.getElementById("EventsCounth3Div").innerHTML);
                    document.getElementById("EventsCounth3Div").innerHTML = count + 1;
                    $('#Eventform')[0].reset();
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                document.getElementById("BtnEvent").disabled = false;
                bootbox.alert('Server is not responding! Try Again Later');
                $('#Eventform')[0].reset();
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