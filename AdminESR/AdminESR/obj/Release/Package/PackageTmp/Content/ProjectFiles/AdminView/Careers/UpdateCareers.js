function CareerUpdate(id)
{
    $('html, body').animate({ scrollTop: 0 }, 'fast');
    $.ajax({
        type: "GET",
        url: "http://admin.eatsleeprepeatesr.com/api/careers/GetAllCareersById?id=" + id + "", //URI
        dataType: "json",
        success: function (data) {
            debugger;
            var datavalue = data;
            var myJsonObject = datavalue;
            contentType: "application/json";
            $.each(myJsonObject, function (i, mobj) {
                document.getElementById("CareerId").value = mobj.Id;
                document.getElementById("CareerName").value = mobj.PositionTitle;
                document.getElementById("CareerRespomsibilties").value = mobj.Responsibilities;
                document.getElementById("CareerRequirement").value = mobj.Requirments;
            });

        },
        error: function (xhr) {
            bootbox.alert('Internel Error...');
        }
    });
}
function UpdateCareerForm() {
    document.getElementById("BtnCareer").disabled = true;
    if ($("#CareerName").val() != null) {
        var Carreer = {
            Id: $("#CareerId").val(),
            PositionTitle: $("#CareerName").val(), Responsibilities: $("#CareerRespomsibilties").val(),
            Requirments: $("#CareerRequirement").val()
        };
        var CarreerData = JSON.stringify(Carreer);
        // Make Ajax request with the contentType = false, and procesDate = false
        var ajaxRequest = $.ajax({
            type: "POST",
            url: "http://admin.eatsleeprepeatesr.com/api/careers/UpdateCareer",
            contentType: 'application/json; charset=utf-8',
            processData: false,
            dataType: "json",
            data: CarreerData,
            success: function (data, textStatus, xhr) {
                if (data == 0) {
                    document.getElementById("BtnCareer").disabled = false;
                    bootbox.alert('Try Again! Later...');
                    
                }
                else {
                    document.getElementById("BtnCareer").disabled = false;
                    bootbox.alert('Career Successfully Updated!');
                    $('#Careerform')[0].reset();
                    myFunctionSwapView('CareerDetails');
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                document.getElementById("BtnCareer").disabled = false;
                bootbox.alert('Server is not responding! Try Again Later');
            }
        });
        return false;
    }
    else {
        bootbox.alert("Make Sure All Fields with * are filled!");
        document.getElementById("BtnCareer").disabled = false;
        return false;
    }
}