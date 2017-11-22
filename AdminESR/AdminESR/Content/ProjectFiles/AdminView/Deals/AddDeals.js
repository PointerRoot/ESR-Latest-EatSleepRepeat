function ValidateDealForm() {
    document.getElementById("BtnDeal").disabled = true;
    if ($("#DealDescription").val() != null) {
        var Deal = {
            Description: $("#DealDescription").val()
        };
        var DealData = JSON.stringify(Deal);
        // Make Ajax request with the contentType = false, and procesDate = false
        var ajaxRequest = $.ajax({
            type: "POST",
            url: "http://localhost:6063/api/deals/PostDeals",
            contentType: 'application/json; charset=utf-8',
            processData: false,
            dataType: "json",
            data: DealData,
            success: function (data, textStatus, xhr) {
                if (data == 0) {
                    document.getElementById("BtnDeal").disabled = false;
                    bootbox.alert('Try Again! Later...');
                    $('#Dealform')[0].reset();
                }
                else {

                    document.getElementById("BtnDeal").disabled = false;
                    bootbox.alert('Deal Successfully Added!');
                    $('#Dealform')[0].reset();
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                document.getElementById("BtnDeal").disabled = false;
                bootbox.alert('Server is not responding! Try Again Later');
                $('#Dealform')[0].reset();
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