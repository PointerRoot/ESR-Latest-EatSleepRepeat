function ClientDetailsOpenFunction(id) {
    $('html, body').animate({ scrollTop: 0 }, 'fast');
    var funcName = "ClientUpdate";
    $("#DesiMasalaDiv1").hide();
    $("#DesiMasalaDiv2").hide();

    var count = 0;
    $("#ClientDetailsDataBody").empty();
    $.ajax({
        type: "GET",
        url: "http://admin.eatsleeprepeatesr.com/api/clients/GetAllClient?id=" + id +"", //URI
        dataType: "json",
        success: function (data) {
            debugger;
            var datavalue = data;
            var myJsonObject = datavalue;
            contentType: "application/json";
            $.each(myJsonObject, function (i, mobj) {
                $("#ClientDetailsDataBody").append('<tr id="Row' + mobj.Id + '"> ' +
                    '               <td><input type="checkbox" class="checkbox" name="checkboxDelete" value="' + mobj.Id + '"></td>' +
                    '               <td>' + mobj.Name + ' </td>' +
                    '               <td class="mailbox-name"><a href="#/" data-toggle="modal" data-target="#squarespaceModal" id="addPakageforTrainer" onclick="seePakages(' + mobj.Id + ')" >See All</a></td>' +
                    '               <td>' + mobj.Testimonial + ' </td>' + 
                    '               <td>' + mobj.AddDate + ' </td>' +
                    '               <td><button type="button" class="btn btn-default btn-sm" onclick="myFunctionSwapView2(' + mobj.Id + ',\'' + funcName + '\');">Edit</button> </td> ' +
                    '</tr>');

                if (count == 0) {
                    $("#DesiMasalaDiv1").show();
                    $("#DesiMasalaDiv2").show();
                    document.getElementById("DesiMasalaClient1").innerHTML = mobj.NumberOfShowing;
                    document.getElementById("DesiMasalaClient2").innerHTML = mobj.NumberOfShowing;
                    document.getElementById("PrevButtonOfClient1").value = mobj.Prev;
                    document.getElementById("PrevButtonOfClient2").value = mobj.Prev;
                    document.getElementById("NextButtonOfClient1").value = mobj.Next;
                    document.getElementById("NextButtonOfClient2").value = mobj.Next;
                    if (mobj.count == 1 || mobj.count == 0)
                        document.getElementById('NumberOfClients').innerHTML = mobj.Count + "  Client";
                    else
                        document.getElementById('NumberOfClients').innerHTML = mobj.Count + "  Clients";
                    count++;
                }
            });

        },
        error: function (xhr) {
            bootbox.alert('Internel Error...');
        }
    });
};

function seePakages(id) {
    $("#pakagedetail").empty();
    $.ajax({
        type: "GET",
        url: "http://admin.eatsleeprepeatesr.com/api/clients/GetAllClientsPakageById?id=" + id + "", //URI
        dataType: "json",
        success: function (data) {
            debugger;
            var datavalue = data;
            var myJsonObject = datavalue;
            contentType: "application/json";
            $.each(myJsonObject, function (i, mobj) {
                $("#pakagedetail").append('<tr id="jawad' + mobj.Id + '"> ' +
                    '<td>' + mobj.Name + ' </td>' +
                    '<td>' + mobj.PackageType + ' </td>' +
                    '<td>' + mobj.PackagePriority + ' </td>' +
                    '</tr>');
            });
        },
        error: function (xhr) {
            bootbox.alert('Internel Error...');
        }
    });
}

function ClientCheakingCheckboxes1() {
    var select_all = document.getElementById("select_all1"); //select all checkbox
    var checkboxes = document.getElementsByClassName("checkbox"); //checkbox items

    //select all checkboxes
    select_all.addEventListener("change", function (e) {
        for (i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = select_all.checked;
        }
    });


    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener('change', function (e) { //".checkbox" change
            //uncheck "select all", if one of the listed checkbox item is unchecked
            if (this.checked == false) {
                select_all.checked = false;
            }
            //check "select all" if all checkbox items are checked
            if (document.querySelectorAll('.checkbox:checked').length == checkboxes.length) {
                select_all.checked = true;
            }
        });
    }
    return false;

}
function ClientCheakingCheckboxes2() {
    var select_all = document.getElementById("select_all2"); //select all checkbox
    var checkboxes = document.getElementsByClassName("checkbox"); //checkbox items

    //select all checkboxes
    select_all.addEventListener("change", function (e) {
        for (i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = select_all.checked;
        }
    });


    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener('change', function (e) { //".checkbox" change
            //uncheck "select all", if one of the listed checkbox item is unchecked
            if (this.checked == false) {
                select_all.checked = false;
            }
            //check "select all" if all checkbox items are checked
            if (document.querySelectorAll('.checkbox:checked').length == checkboxes.length) {
                select_all.checked = true;
            }
        });
    }
    return false;
}

function ClientDeleteFunction() {
    var id = 0;
    $("input:checkbox[name=checkboxDelete]:checked").each(function () {
        id++;
    });
    if (id == 0)
        bootbox.alert("To Delete Select the desired record!")
    else {
        bootbox.confirm({
            title: "Delete Confirmation",
            message: "It Will be Permanently Deleted",
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i> Cancel'
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> Confirm'
                }
            },
            callback: function (result) {
                if (result) {
                    $("input:checkbox[name=checkboxDelete]:checked").each(function () {
                        var rowId = $(this).val();
                        $.ajax({
                            type: 'DELETE',
                            url: "http://admin.eatsleeprepeatesr.com/api/clients/DeleteClient?id=" + $(this).val() + "", //URI
                            dataType: "json",
                            contentType: "application/json",
                            success: function (data, textStatus, xhr) {
                                var row = document.getElementById("Row" + rowId);
                                row.parentNode.removeChild(row);
                                $("#DesiMasalaDiv1").hide();
                                $("#DesiMasalaDiv2").hide();
                                var count = parseInt(document.getElementById('NumberOfClients').innerHTML);
                                if (count == 2)
                                    document.getElementById('NumberOfClients').innerHTML = count - 1 + "  Client";
                                else
                                    document.getElementById('NumberOfClients').innerHTML = count - 1 + "  Clients";

                            },
                            error: function (xhr) {
                                bootbox.alert('Error in Operation Try Again Later');
                            }

                        });
                    });
                    bootbox.alert('Records Successfully Deleted :)');
                }
            }
        });
    }
}

function GetSingleClientByName() {
    document.getElementById('NumberOfClients').innerHTML = 0 + "  Client";
    $("#DesiMasalaDiv1").hide();
    $("#DesiMasalaDiv2").hide();
    var funcName = "ClientUpdate";
    var count = 0;
    $("#ClientDetailsDataBody").empty();
    $.ajax({
        type: "GET",
        url: "http://admin.eatsleeprepeatesr.com/api/clients/GetAllClientsByName?id=" + document.getElementById("ClientSearch").value + "", //URI
        dataType: "json",
        success: function (data) {
            debugger;
            var datavalue = data;
            var myJsonObject = datavalue;
            contentType: "application/json";
            $.each(myJsonObject, function (i, mobj) {
                $("#ClientDetailsDataBody").append('<tr id="Row' + mobj.Id + '"> ' +
                    '               <td><input type="checkbox" class="checkbox" name="checkboxDelete" value="' + mobj.Id + '"></td>' +
                    '               <td>' + mobj.Name + ' </td>' +
                    '               <td class="mailbox-name"><a href="#/" data-toggle="modal" data-target="#squarespaceModal" id="addPakageforTrainer" onclick="seePakages(' + mobj.Id + ')" >See All</a></td>' +
                    '               <td>' + mobj.Testimonial + ' </td>' +
                    '               <td>' + mobj.AddDate + ' </td>' +
                    '               <td><button type="button" class="btn btn-default btn-sm" onclick="myFunctionSwapView2(' + mobj.Id + ',\'' + funcName + '\');">Edit</button> </td> ' +
                    '</tr>');

                if (count == 0) {
                    if (mobj.count == 1 || mobj.count == 0)
                        document.getElementById('NumberOfClients').innerHTML = mobj.Count + "  Client";
                    else
                        document.getElementById('NumberOfClients').innerHTML = mobj.Count + "  Clients";
                    count++;
                }
            });

        },
        error: function (xhr) {
            bootbox.alert('Internel Error...');
        }
    });
    document.getElementById("ClientSearch").value = "";
    return false;
}