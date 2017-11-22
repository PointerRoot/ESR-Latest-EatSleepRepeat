 $(document).ready(function () { 
            var id = 0;
            $.ajax({
        type: "GET",
                url: "http://localhost:6063/api/events/GetAllEvents", //URI
                dataType: "json",
                success: function (data) {
                    debugger;
                    var datavalue = data;
                    var myJsonObject = datavalue;
                    contentType: "application/json";
                    $.each(myJsonObject, function (i, mobj) {
                                        $("#events").append('<div class="col-md-4 col-sm-6 col-xs-12" >'+
                                                 '<div class="single-event" > ' +
                                            '   <div class="se-img" > ' + 
                                            '       <img  src="' + mobj.Image + '" style="min-height:260px;" >' + 
                                            '   </div>' +
                                                 '       <div class="se-content">' +
                                                 '          <a class="sec-title" style="word-break: break-all;" href="#/">'+ mobj.Name +'</a>' +
                                                 '         <span class="sec-date"><i class="fa fa-calendar-o"></i>' + mobj.Date + ',' + mobj.Time +'</span>' +
                                                 '        <p class="sec-text" style="word-break: break-all;"> ' + mobj.Place +'   </p>' +
                                                 '        <p class="sec-date"> Rs: ' + mobj.TicketPrice +'    </p>' +
                                                 '        <p class="sec-text"> Discount: ' + mobj.Discount +'%   </p>' +
                                                 '        <button class="sec-follow" data-toggle="modal" data-target="#squarespaceModal1"  onclick="myFunction(' + mobj.Id + ')" id=' + mobj.Id + ' data-id="' + mobj.Id + '">FOLLOW EVENT</button>' +
                                                 '   </div>' +
                                                 '  </div>' +
                                                 ' </div>'  ); 
                    });
                },
                error: function (xhr) {
                        bootbox.alert('Internel Error...');
                    }
            });
    }); 
    function myFunction(id) { 
        document.getElementById("id1").value = id;  
    }

    function PostEventTicket(id) { 
    if ($("#login-email").val() != "" /*&& $("#login-username").val() != "" && $("#login-tickets").val() != "" && $("#login-cnic").val() != ""*/) {
        document.getElementById("btnSubmit").disabled = true;
    var data = new FormData;
            if ($("#login-username").val() != "") {
        data.append("Username", $("#login-username").val());
    }
            else {
        data.append("login-username", "User");
    }
            data.append("Email", $("#login-email").val());
            data.append("Cnic", $("#login-cnic").val());
            data.append("Tickets", $("#login-tickets").val());
            data.append("EventId", $("#id1").val());


            var ajaxRequest = $.ajax({
        type: "POST",
                url: "http://localhost:57732/api/events/BookTicket",
                contentType: false,
                processData: false,
                data: data,
                success: function (data, textStatus, xhr) {
                    if (data == "true") {
                        bootbox.alert("Message sent!");
                                    $("#login-username").val("");
                                    $("#login-email").val("");
                                    $("#login-tickets").val("");
                                    $("#login-cnic").val("");
                                    document.getElementById("btnSubmit").disabled = false;
                    }
                    else {
                        bootbox.alert("Internall Error!");
                        $("#login-username").val("");
                       $("#login-email").val("");
                       $("#login-tickets").val("");
                       $("#login-cnic").val("");
                        document.getElementById("btnSubmit").disabled = false;
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    bootbox.alert('Server is not responding! Try Again Later');
                document.getElementById("btnSubmit").disabled = false;
                }
            }); 
            return false;
    }
    else { bootbox.alert("All Feilds Required!"); }
        return false;
    } 
