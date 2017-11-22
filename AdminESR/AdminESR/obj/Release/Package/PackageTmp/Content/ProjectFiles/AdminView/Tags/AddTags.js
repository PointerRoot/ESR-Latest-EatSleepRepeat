function ValidateTagForm() {
    document.getElementById("BtnTag").disabled = true;
    if ($("#TagDescription").val() != null) {
        var Tag = {
            Description: $("#TagDescription").val()
        };
        var TagData = JSON.stringify(Tag);
        // Make Ajax request with the contentType = false, and procesDate = false
        var ajaxRequest = $.ajax({
            type: "POST",
            url: "http://admin.eatsleeprepeatesr.com/api/tags/PostTags",
            contentType: 'application/json; charset=utf-8',
            processData: false,
            dataType: "json",
            data: TagData,
            success: function (data, textStatus, xhr) {
                if (data == 0) {
                    document.getElementById("BtnTag").disabled = false;
                    bootbox.alert('Try Again! Later...');
                    $('#Tagform')[0].reset();
                }
                else {

                    document.getElementById("BtnTag").disabled = false;
                    bootbox.alert('Tag Successfully Added!');
                    $('#Tagform')[0].reset();
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                document.getElementById("BtnTag").disabled = false;
                bootbox.alert('Server is not responding! Try Again Later');
                $('#Tagform')[0].reset();
            }
        });
        return false;
    }
    else {
        bootbox.alert("Make Sure All Fields with * are filled!");
        document.getElementById("BtnTag").disabled = false;
        return false;
    }
}