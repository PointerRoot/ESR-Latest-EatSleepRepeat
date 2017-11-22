function DealUpdate(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:6063/api/deals/GetAllDealsById?id=" + id + "", //URI
        dataType: "json",
        success: function (data) {
            debugger;
            var datavalue = data;
            var myJsonObject = datavalue;
            contentType: "application/json";
            $.each(myJsonObject, function (i, mobj) {
                document.getElementById("DealId").value = mobj.Id;
                document.getElementById("DealDescription").value = mobj.Description;

            });

        },
        error: function (xhr) {
            bootbox.alert('Internel Error...');
        }
    });
}
function UpdateDealForm() {
    document.getElementById("BtnDeal").disabled = true;
    if ($("#DealDescription").val() != null) {
        var Carreer = {
            Id: $("#DealId").val(),
            Description: $("#DealDescription").val(),
        };
        var CarreerData = JSON.stringify(Carreer);
        // Make Ajax request with the contentType = false, and procesDate = false
        var ajaxRequest = $.ajax({
            type: "POST",
            url: "http://localhost:6063/api/deals/UpdateDeals",
            contentType: 'application/json; charset=utf-8',
            processData: false,
            dataType: "json",
            data: CarreerData,
            success: function (data, textStatus, xhr) {
                if (data == 0) {
                    document.getElementById("BtnDeal").disabled = false;
                    bootbox.alert('Try Again! Later...');

                }
                else {
                    document.getElementById("BtnDeal").disabled = false;
                    bootbox.alert('Deal Successfully Updated!');
                    $('#Dealform')[0].reset();
                    myFunctionSwapView('DealDetails');
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                document.getElementById("BtnDeal").disabled = false;
                bootbox.alert('Server is not responding! Try Again Later');
            }
        });
        return false;
    }
    else {
        bootbox.alert("Make Sure All Fields with * are filled!");
        document.getElementById("BtnDeal").disabled = false;
        return false;
    }
}