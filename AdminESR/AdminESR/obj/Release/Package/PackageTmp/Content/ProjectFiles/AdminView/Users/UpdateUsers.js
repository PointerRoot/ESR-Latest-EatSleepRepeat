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

function UserUpdate(id) {
    $('html, body').animate({ scrollTop: 0 }, 'fast');
    //var myDiv = document.getElementById("TraineePakagesUpdate");
    //var myDiv1 = document.getElementById("TraineeTrainerUpdate");
    $.ajax({
        type: "GET",
        url: "http://admin.eatsleeprepeatesr.com/api/user/GetAllUsersById?id=" + id + "", //URI
        dataType: "json",
        success: function (data) {
            debugger;
            var datavalue = data;
            var myJsonObject = datavalue;
            contentType: "application/json";
            $.each(myJsonObject, function (i, mobj) {
                document.getElementById("UserId").value = mobj.Id;
                document.getElementById("Name").value = mobj.Name;
                document.getElementById("Email").value = mobj.Email;
                document.getElementById("Contact").value = mobj.Contact;
                document.getElementById("Address").value = mobj.Address;


                document.getElementById("UserName").value = mobj.UserName;


            });

        },
        error: function (xhr) {
            alert('Internel Error...');
        }
    });
}

function validateUpdateForm() {
    document.getElementById("BtnUser").disabled = true;
    if ($("#Name").val() != null) {

        if ($("#Password").val() == $("#ConfirmPassword").val()) {

            var User = {
                Id: $("#UserId").val(),
                Name: $("#Name").val(),
                UserName: $("#UserName").val(), Password: $("#Password").val(),
                Email: $("#Email").val(),
                Address: $("#Address").val(), Contact: $("#Contact").val()
            };
            var UserData = JSON.stringify(User);
            // Make Ajax request with the contentType = false, and procesDate = false
            var ajaxRequest = $.ajax({
                type: "POST",
                url: "http://admin.eatsleeprepeatesr.com/api/user/UpdateUser",
                contentType: 'application/json; charset=utf-8',
                processData: false,
                dataType: "json",
                data: UserData,
                success: function (data, textStatus, xhr) {
                    if (data == 0) {
                        document.getElementById("BtnUser").disabled = false;
                        bootbox.alert('Try Again! Later...');
                        
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
                        myFunctionSwapView("UserDetails");
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    document.getElementById("BtnUser").disabled = false;
                    bootbox.alert('Server is not responding! Try Again Later');
                   
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
