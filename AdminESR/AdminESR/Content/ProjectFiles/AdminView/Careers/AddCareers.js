function ValidateCareerForm() {
    document.getElementById("BtnCareer").disabled = true;
    if ($("#CareerName").val() != null) {

        var Carreer = {
            PositionTitle: $("#CareerName").val(), Responsibilities: $("#CareerRespomsibilties").val(),
            Requirments: $("#CareerRequirement").val()
        };
        var CarreerData = JSON.stringify(Carreer);
        // Make Ajax request with the contentType = false, and procesDate = false
        var ajaxRequest = $.ajax({
            type: "POST",
            url: "http://localhost:6063/api/careers/PostCareer",
            contentType: 'application/json; charset=utf-8',
            processData: false,
            dataType: "json",
            data: CarreerData,
            success: function (data, textStatus, xhr) {
                if (data == 0) {
                    document.getElementById("BtnCareer").disabled = false;
                    bootbox.alert('Try Again! Later...');
                    $('#Careerform')[0].reset();
                }
                else {
                    document.getElementById("BtnCareer").disabled = false;
                    bootbox.alert('Career Successfully Added!');
                    $('#Careerform')[0].reset();
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                document.getElementById("BtnCareer").disabled = false;
                bootbox.alert('Server is not responding! Try Again Later');
                $('#Careerform')[0].reset();
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