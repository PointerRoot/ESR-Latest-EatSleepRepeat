 function PakageUpdate(id) {
     $('html, body').animate({ scrollTop: 0 }, 'fast'); 
     $("#ServiceTable").empty();
     var ServicesSet = 0;
    var count = 0;
    $.ajax({
        type: "GET",
        url: "http://localhost:6063/api/services/GetAllServices", //URI
        dataType: "json",
        success: function (data) { 
            debugger;
            var datavalue = data;
            var myJsonObject = datavalue;
            contentType: "application/json";
            $.each(myJsonObject, function (i, mobj) { 
                $("#ServiceTable").append(' <tr id="jawad' + mobj.Id + '"> ' +
                    '               <td><input type="checkbox" class="checkbox" id="ServicesSelectBoxes' + mobj.Id + '" name="checkboxforService" value="' + mobj.Id + '"></td>' +
                    '               <td>' + mobj.Name + ' </td>' + 
                    '               <td>' + mobj.Description + ' </td>' +
                    '</tr>');
                ServicesSet = 1;
            });
            if (ServicesSet != 0)
            {
                $.ajax({
                    type: "GET",
                    url: "http://localhost:6063/api/pakages/GetAllPakageServicesById?id=" + id + "", //URI
                    dataType: "json",
                    success: function (data) {
                        debugger;
                        var datavalue = data;
                        var myJsonObject = datavalue;
                        contentType: "application/json";
                        $.each(myJsonObject, function (i, mobj) { 
                            document.getElementById("ServicesSelectBoxes" + mobj.ServiceId + "").checked = true;
                        });
                    },
                    error: function (xhr) {
                        bootbox.alert('Internel Error...');
                    }
                });
            }
        },
        error: function (xhr) {
            bootbox.alert('Internel Error...');
        }
    });

    $.ajax({
        type: "GET",
        url: "http://localhost:6063/api/pakages/GetAllPakagesById?id=" + id + "", //URI
        dataType: "json",
        success: function (data) {
            debugger;
            var datavalue = data;
            var myJsonObject = datavalue;
            contentType: "application/json";
            $.each(myJsonObject, function (i, mobj) { 
                if (mobj.Priority == "Gold") {
                    document.getElementById('AddsPriority').getElementsByTagName('option')[0].selected = 'selected'
                }
                else if (mobj.Priority == "Silver") {
                    document.getElementById('AddsPriority').getElementsByTagName('option')[1].selected = 'selected'
                }
                else
                {
                    document.getElementById('AddsPriority').getElementsByTagName('option')[2].selected = 'selected'
                }
                document.getElementById("PakageId").value = mobj.Id;
                document.getElementById("Name").value = mobj.Name;
                document.getElementById("Type").value = mobj.PakageType; 
                document.getElementById("Price").value = mobj.CostPerMonth;
            });

        },
        error: function (xhr) {
            alert('Internel Error...');
        }
    }); 
}

function ValidatePakageForm() { 
    document.getElementById("BtnPakage").disabled = true;
    if ($("#Name").val() != null) { 
        var package = "No";
        var count1 = 0;
        $("input:checkbox[name=checkboxforService]:checked").each(function () { 
            count1++;          
        });
        if (count1 != 0) {
            package = "Yes";
        }
        var x = document.getElementById("AddsPriority").selectedIndex;
        var y = document.getElementById("AddsPriority").options;

        var Pakage = {
            Id: $("#PakageId").val(), Priority: y[x].value,
            Name: $("#Name").val(),
            PakageType: $("#Type").val(), CostPerMonth: $("#Price").val(),
            ServicesIncluded: package 
        };
        var PakageData = JSON.stringify(Pakage);
        // Make Ajax request with the contentType = false, and procesDate = false
        var ajaxRequest = $.ajax({
            type: "POST",
            url: "http://localhost:6063/api/pakages/UpdatePakage",
            contentType: 'application/json; charset=utf-8',
            processData: false,
            dataType: "json",
            data: PakageData,
            success: function (data, textStatus, xhr) {
                if (data == 0) {
                    document.getElementById("BtnPakage").disabled = false;
                    bootbox.alert('Try Again! Later...'); 
                }
                else {
                    if (count1 != 0) {
                        var pack = "";
                        $("input:checkbox[name=checkboxforService]:checked").each(function () {
                            pack = pack + data + "," + $(this).val() + "$";
                        });
                        $.ajax({
                            type: "POST",
                            url: "http://localhost:6063/api/pakages/PostPakageServices?id=" + pack + "",
                            contentType: 'application/json; charset=utf-8',
                            processData: false,
                            dataType: "json",
                            data: PakageData,
                            success: function (data, textStatus, xhr) {
                            },
                        });
                    }
                    document.getElementById("BtnPakage").disabled = false;
                    bootbox.alert('Pakage Successfully Updated!'); 
                    $('#Pakageform')[0].reset();
                    myFunctionSwapView('PakageDetails');
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                document.getElementById("BtnPakage").disabled = false;
                bootbox.alert('Server is not responding! Try Again Later');
                $('#Pakageform')[0].reset();
            }
        });
        return false;
    }
    else {
        bootbox.alert("Make Sure All Fields with * are filled!");
        document.getElementById("BtnPakage").disabled = false;
        return false;
    }
}