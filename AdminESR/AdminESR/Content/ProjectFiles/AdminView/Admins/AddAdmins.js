function ValidateAdminForm() {
    document.getElementById("BtnAdmin").disabled = true;
    if ($("#AdminName").val() != null) {
        if ($("#AdminPassword").val() == $("#AdminConfirmPassword").val()) { 
            var x = document.getElementById("AdminRole").selectedIndex;
            var y = document.getElementById("AdminRole").options; 
            var Admin = {
                Name: $("#AdminName").val(), Role: y[x].value, 
                UserName: $("#AdminUserName").val(), Password: $("#AdminPassword").val()
            };
            var AdminData = JSON.stringify(Admin);
            // Make Ajax request with the contentType = false, and procesDate = false
            var ajaxRequest = $.ajax({
                type: "POST",
                url: "http://localhost:6063/api/adminapi/PostAdmin",
                contentType: 'application/json; charset=utf-8',
                processData: false,
                dataType: "json",
                data: AdminData,
                success: function (data, textStatus, xhr) {
                    if (data == 0) {
                        document.getElementById("BtnAdmin").disabled = false;
                        bootbox.alert('Username Already Exist! Try Again With different Username');
                        $('#Adminform')[0].reset();
                    }
                    else {
                        document.getElementById("BtnAdmin").disabled = false;
                        bootbox.alert('Admin Successfully Added!');
                        //var count = parseInt(document.getElementById("AdminsCounth3Div").innerHTML);
                        //document.getElementById("AdminsCounth3Div").innerHTML = count + 1;
                        $('#Adminform')[0].reset();
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    document.getElementById("BtnAdmin").disabled = false;
                    bootbox.alert('Server is not responding! Try Again Later');
                    $('#Adminform')[0].reset();
                }
            });
            return false;
        }
        else {
            bootbox.alert("Password Dont Match");
            document.getElementById("BtnAdmin").disabled = false;
            return false;
        }
    }
    else {
        bootbox.alert("Make Sure All Fields with * are filled!");
        document.getElementById("BtnAdmin").disabled = false;
        return false;
    }
}
