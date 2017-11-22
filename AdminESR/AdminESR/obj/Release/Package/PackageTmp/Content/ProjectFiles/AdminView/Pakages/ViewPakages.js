function PakageDetailsOpenFunction(id) {
    $('html, body').animate({ scrollTop: 0 }, 'fast');
    $("#DesiMasalaDiv1").hide();
    $("#DesiMasalaDiv2").hide();
    var count = 0;
    var funcName = "PakageUpdate";
    $("#PakageDetailsDataBody").empty();
    $.ajax({
        type: "GET",
        url: "http://admin.eatsleeprepeatesr.com/api/pakages/GetAllPakages?id=" + id +"", //URI
        dataType: "json",
        success: function (data) {
            debugger;
            var datavalue = data;
            var myJsonObject = datavalue;
            contentType: "application/json";
            $.each(myJsonObject, function (i, mobj) {
                $("#PakageDetailsDataBody").append('<tr id="Row' + mobj.Id + '"> ' +
                    '               <td><input type="checkbox" class="checkbox" name="checkboxDelete" value="' + mobj.Id + '"></td>' +
                    '               <td>' + mobj.Name + ' </td>' +
                    '               <td>' + mobj.PakageType + ' </td>' +
                    '               <td>' + mobj.Priority + ' </td>' +
                    '               <td>Rs.' + mobj.CostPerMonth + ' </td>' +
                    '               <td class="mailbox-name"><a href="#/" data-toggle="modal" data-target="#squarespaceModal" id="addPakageforTrainer" onclick="seePakages(' + mobj.Id + ')" >See All</a></td>' +
                    '               <td>' + mobj.AddDate + ' </td>' +
                    '               <td><button type="button" class="btn btn-default btn-sm" onclick="myFunctionSwapView2(' + mobj.Id + ',\'' + funcName + '\');">Edit</button> </td> ' +
                    '</tr>');

                if (count == 0) {
                    $("#DesiMasalaDiv1").show();
                    $("#DesiMasalaDiv2").show();
                    document.getElementById("DesiMasalaPakage1").innerHTML = mobj.NumberOfShowing;
                    document.getElementById("DesiMasalaPakage2").innerHTML = mobj.NumberOfShowing;
                    document.getElementById("PrevButtonOfPakage1").value = mobj.Prev;
                    document.getElementById("PrevButtonOfPakage2").value = mobj.Prev;
                    document.getElementById("NextButtonOfPakage1").value = mobj.Next;
                    document.getElementById("NextButtonOfPakage2").value = mobj.Next;
                    if (mobj.count == 1 || mobj.count == 0)
                        document.getElementById('NumberOfPakages').innerHTML = mobj.Count + "  Pakage";
                    else
                        document.getElementById('NumberOfPakages').innerHTML = mobj.Count + "  Pakages";
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
        url: "http://admin.eatsleeprepeatesr.com/api/pakages/GetAllPakageServicesById?id=" + id + "", //URI
        dataType: "json",
        success: function (data) {
            debugger;
            var datavalue = data;
            var myJsonObject = datavalue;
            contentType: "application/json";
            $.each(myJsonObject, function (i, mobj) {
                $("#pakagedetail").append('<tr id="jawad' + mobj.Id + '"> ' +
                    '<td>' + mobj.Name + ' </td>' +
                    '<td>' + mobj.ServicesIncluded + ' </td>' +
                    '</tr>');
            });
        },
        error: function (xhr) {
            bootbox.alert('Internel Error...');
        }
    });
}

function PakageCheakingCheckboxes1() {
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
function PakageCheakingCheckboxes2() {
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
function PakageDeleteFunction() {
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
                            url: "http://admin.eatsleeprepeatesr.com/api/pakages/DeletePakage?id=" + $(this).val() + "", //URI
                            dataType: "json",
                            contentType: "application/json",
                            success: function (data, textStatus, xhr) {
                                var row = document.getElementById("Row" + rowId);
                                row.parentNode.removeChild(row);
                                $("#DesiMasalaDiv1").hide();
                                $("#DesiMasalaDiv2").hide();
                                var count = parseInt(document.getElementById('NumberOfPakages').innerHTML);
                                if (count == 2)
                                    document.getElementById('NumberOfPakages').innerHTML = count - 1 + "  Pakage";
                                else
                                    document.getElementById('NumberOfPakages').innerHTML = count - 1 + "  Pakages";

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
function GetSinglePakageByName() {
    document.getElementById('NumberOfPakages').innerHTML = 0 + "  Pakage";
    $("#DesiMasalaDiv1").hide();
    $("#DesiMasalaDiv2").hide();
    var funcName = "PakageUpdate";
    var count = 0;
    $("#PakageDetailsDataBody").empty();
    $.ajax({
        type: "GET",
        url: "http://admin.eatsleeprepeatesr.com/api/pakages/GetAllPakagesByName?id=" + document.getElementById("PakageSearch").value + "", //URI
        dataType: "json",
        success: function (data) {
            debugger;
            var datavalue = data;
            var myJsonObject = datavalue;
            contentType: "application/json";
            $.each(myJsonObject, function (i, mobj) {
                $("#PakageDetailsDataBody").append('<tr id="Row' + mobj.Id + '"> ' +
                    '               <td><input type="checkbox" class="checkbox" name="checkboxDelete" value="' + mobj.Id + '"></td>' +
                    '               <td>' + mobj.Name + ' </td>' +
                    '               <td>' + mobj.PakageType + ' </td>' +
                    '               <td>' + mobj.Priority + ' </td>' +
                    '               <td>Rs.' + mobj.CostPerMonth + ' </td>' +
                    '               <td class="mailbox-name"><a href="#/" data-toggle="modal" data-target="#squarespaceModal" id="addPakageforTrainer" onclick="seePakages(' + mobj.Id + ')" >See All</a></td>' +
                    '               <td>' + mobj.AddDate + ' </td>' +
                    '               <td><button type="button" class="btn btn-default btn-sm" onclick="myFunctionSwapView2(' + mobj.Id + ',\'' + funcName + '\');">Edit</button> </td> ' +
                    '</tr>');

                if (count == 0) {
                    if (mobj.count == 1 || mobj.count == 0)
                        document.getElementById('NumberOfPakages').innerHTML = mobj.Count + "  Pakage";
                    else
                        document.getElementById('NumberOfPakages').innerHTML = mobj.Count + "  Pakages";
                    count++;
                }
            });

        },
        error: function (xhr) {
            bootbox.alert('Internel Error...');
        }
    });
    document.getElementById("PakageSearch").value = "";
    return false;
}