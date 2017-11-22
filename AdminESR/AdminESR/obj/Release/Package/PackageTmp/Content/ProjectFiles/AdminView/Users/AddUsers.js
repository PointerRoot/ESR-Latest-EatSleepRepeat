function ValidateUserForm() {
    document.getElementById("BtnUser").disabled = true;
    if ($("#UserName").val() != null) {
        if ($("#UserPassword").val() == $("#UserConfirmPassword").val()) {

            var User = {
                Name: $("#UserName").val(), Email : $("#UserEmail").val(),
                Address: $("#UserAddress").val(), Contact: $("#UserContact").val(),
                UserName: $("#UserUserName").val(), Password: $("#UserPassword").val()
            };
            var UserData = JSON.stringify(User);
            // Make Ajax request with the contentType = false, and procesDate = false
            var ajaxRequest = $.ajax({
                type: "POST",
                url: "http://admin.eatsleeprepeatesr.com/api/user/PostUser",
                contentType: 'application/json; charset=utf-8',
                processData: false,
                dataType: "json",
                data: UserData,
                success: function (data, textStatus, xhr) {
                    if (data == 0) {
                        document.getElementById("BtnUser").disabled = false;
                        bootbox.alert('Try Again! Later...');
                        $('#Userform')[0].reset();
                    }
                    else {
                        var Imageform = new FormData();
                        Imageform.append("UserId", data);
                        var files = $("#UserImage").get(0).files;
                        Imageform.append("UserImage", files[0]);
                        // Add the uploaded image content to the form data collection
                        if (files[0] != null) {
                            var ajaxRequest = $.ajax({
                                type: "POST",
                                url: "http://admin.eatsleeprepeatesr.com/api/user/PostImages",
                                contentType: false,
                                processData: false,
                                data: Imageform,
                                success: function (data, textStatus, xhr) {
                                }
                            });
                        }
                       
                        document.getElementById("BtnUser").disabled = false;
                        bootbox.alert('User Successfully Added!');
                        $('#Userform')[0].reset();
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    document.getElementById("BtnUser").disabled = false;
                    bootbox.alert('Server is not responding! Try Again Later');
                    $('#Userform')[0].reset();
                }
            });
            return false;
        }
        else {
            bootbox.alert("Password Dont Match");
            document.getElementById("BtnUser").disabled = false;
            return false;
        }
    }
    else {
        bootbox.alert("Make Sure All Fields with * are filled!");
        document.getElementById("BtnUser").disabled = false;
        return false;
    }
}
