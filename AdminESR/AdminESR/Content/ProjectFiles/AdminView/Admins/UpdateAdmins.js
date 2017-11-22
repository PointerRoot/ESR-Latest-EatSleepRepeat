function AdminUpdate(id) {
    $('html, body').animate({ scrollTop: 0 }, 'fast');
    $.ajax({
        type: "GET",
        url: "http://localhost:6063/api/adminapi/GetAllAdminsById?id=" + id + "", //URI
        dataType: "json",
        success: function (data) {
            debugger;
            var datavalue = data;
            var myJsonObject = datavalue;
            contentType: "application/json";
            $.each(myJsonObject, function (i, mobj) {
                document.getElementById("AdminId").value = mobj.Id; 
                document.getElementById("AdminName").value = mobj.Name;
                document.getElementById("AdminUserName").value = mobj.UserName;
                $('#AdminRole option[value='+mobj.Role+']').attr('selected', 'selected');
            });

        },
        error: function (xhr) {
            bootbox.alert('Internel Error...');
        }
    });
}
function UpdateAdminForm() {
    document.getElementById("BtnAdmin").disabled = true;
    if ($("#AdminUserName").val() != null) {  
            if ($("#AdminPassword").val() == $("#AdminConfirmPassword").val()) {

                var x = document.getElementById("AdminRole").selectedIndex;
                var y = document.getElementById("AdminRole").options;

                var Admin = {
                    Id: $("#AdminId").val(),
                    Name: $("#AdminName").val(), Role: y[x].value,
                    UserName: $("#AdminUserName").val(), Password: $("#AdminPassword").val()
                };
                var AdminData = JSON.stringify(Admin);
                // Make Ajax request with the contentType = false, and procesDate = false
                var ajaxRequest = $.ajax({
                    type: "POST",
                    url: "http://localhost:6063/api/adminapi/UpdateAdmin",
                    contentType: 'application/json; charset=utf-8',
                    processData: false,
                    dataType: "json",
                    data: AdminData,
                    success: function (data, textStatus, xhr) {
                        if (data == 0) {
                            document.getElementById("BtnAdmin").disabled = false;
                            bootbox.alert('Username Already Exist! Try Again With different Username'); 
                        }
                        else {
                            document.getElementById("BtnAdmin").disabled = false;
                            bootbox.alert('Admin Successfully Updated!');
                            //var count = parseInt(document.getElementById("AdminsCounth3Div").innerHTML);
                            //document.getElementById("AdminsCounth3Div").innerHTML = count + 1;
                            $('#Adminform')[0].reset();
                            myFunctionSwapView("AdminDetails");
                        }
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        document.getElementById("BtnAdmin").disabled = false;
                        bootbox.alert('Server is not responding! Try Again Later');
                        $('#Adminform')[0].reset();
                        myFunctionSwapView("AdminDetails");
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