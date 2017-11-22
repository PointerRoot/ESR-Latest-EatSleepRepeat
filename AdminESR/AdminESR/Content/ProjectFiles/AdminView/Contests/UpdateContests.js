function validate(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[0-9]/;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
} 
function ContestUpdate(id) {

    //var myDiv = document.getElementById("TraineePakagesUpdate");
    //var myDiv1 = document.getElementById("TraineeTrainerUpdate");
    $.ajax({
        type: "GET",
        url: "http://localhost:6063/api/contests/GetAllContestsById?id=" + id + "", //URI
        dataType: "json",
        success: function (data) {
            debugger;
            var datavalue = data;
            var myJsonObject = datavalue;
            contentType: "application/json";
            $.each(myJsonObject, function (i, mobj) {
                document.getElementById("ContestId").value = mobj.Id;
                document.getElementById("Name").value = mobj.Name;
                document.getElementById("Entries").value = mobj.EntriesCount;
                document.getElementById("WinnerName").value = mobj.WinnerName;
                document.getElementById("Reward").value = mobj.Reward; 
                document.getElementById("Date").value = mobj.Date; 
            });

        },
        error: function (xhr) {
            alert('Internel Error...');
        }
    });
}

function ValidateUpdateForm() {
    document.getElementById("BtnContest").disabled = true;
    if ($("#Name").val() != null) {

        var Contest = {
            Id:$("#ContestId").val(),  Name: $("#Name").val(), EntriesCount: $("#Entries").val(),
            WinnerName: $("#WinnerName").val(), Reward: $("#Reward").val(), Date: $("#Date").val()
        };
        var ContestData = JSON.stringify(Contest);
        // Make Ajax request with the contentType = false, and procesDate = false
        var ajaxRequest = $.ajax({
            type: "POST",
            url: "http://localhost:6063/api/contests/UpdateContest",
            contentType: 'application/json; charset=utf-8',
            processData: false,
            dataType: "json",
            data: ContestData,
            success: function (data, textStatus, xhr) {
                if (data == 0) {
                    document.getElementById("BtnContest").disabled = false;
                    bootbox.alert('Try Again! Later...');
                    $('#Contestform')[0].reset();
                    myFunctionSwapView('ContestDetails');
                }
                else {
                    var Imageform = new FormData();
                    Imageform.append("ContestId", data);
                    var files = $("#ContestImage").get(0).files;
                    Imageform.append("ContestImage", files[0]);
                    // Add the uploaded image content to the form data collection
                    if (files[0] != null) {
                        var ajaxRequest = $.ajax({
                            type: "POST",
                            url: "http://localhost:6063/api/contests/PostImages",
                            contentType: false,
                            processData: false,
                            data: Imageform,
                            success: function (data, textStatus, xhr) {
                            }
                        });
                    } 
                    document.getElementById("BtnContest").disabled = false;
                    bootbox.alert('Contest Successfully Updated!');
                    $('#Contestform')[0].reset();
                    myFunctionSwapView('ContestDetails');
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                document.getElementById("BtnContest").disabled = false;
                bootbox.alert('Server is not responding! Try Again Later');
                $('#Contestform')[0].reset();
                myFunctionSwapView('ContestDetails');
            }
        });
        return false;
    }
    else {
        bootbox.alert("Make Sure All Fields with * are filled!");
        document.getElementById("BtnContest").disabled = false;
        return false;
    }
}

