function EventsEmailFunction(emailcheck)
{
    $('html, body').animate({ scrollTop: 0 }, 'fast'); 
    document.getElementById("ComposeEmailId").innerHTML = "Compose " + emailcheck + ":";  

    $.ajax({
        type: "GET",
        url: "http://admin.eatsleeprepeatesr.com/api/EventMails/GetEmailDetails?check=" + emailcheck + "", //URI
        dataType: "json",
        success: function (data) {
            debugger;
            var datavalue = data;
            var myJsonObject = datavalue;
            contentType: "application/json";
            $.each(myJsonObject, function (i, mobj) {
                document.getElementById("EmailAuthenticationId").value = mobj.Id;
                document.getElementById("Subject").value = mobj.Subject;
                document.getElementById("compose-textarea").value = mobj.Body;
            });

        },
        error: function (xhr) {
            bootbox.alert('Internel Error...');
        }
    });
}
function Send() {
    if ($("#compose-textarea").val() != null && $("#Subject").val() != null) {
        var data = new FormData();
        document.getElementById("sendbtn").disabled = true; 
        data.append("Subject", $("#Subject").val());
        data.append("Message", $("#compose-textarea").val());
        data.append("EmailAuthenticationId", $("#EmailAuthenticationId").val());

        $.ajax({
            type: "POST",
            url: "http://admin.eatsleeprepeatesr.com/api/EventMails/PostEmail",
            contentType: false,
            processData: false,
            data: data,
            success: function (data, textStatus, xhr) {
                if (data != 0) {
                    bootbox.alert('Email Save Successfully!');  
                    document.getElementById("sendbtn").disabled = false;
                    myFunctionSwapView('MessageTo');
                }
                else {
                    bootbox.alert('Something went wrong. try again Later');
                    document.getElementById("sendbtn").disabled = false;
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                bootbox.alert('Server is not responding! Try Again Later');
                document.getElementById("sendbtn").disabled = false;
            }
        }); 
    }
    else {
        bootbox.alert("Feilds are empty");

    }
} 
