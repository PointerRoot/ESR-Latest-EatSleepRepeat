function EventDetailsOpenFunction(id) {
    $("#DesiMasalaDiv1").hide();
    $("#DesiMasalaDiv2").hide();
    var count = 0;
    var funcName = "EventUpdate";
    var funcName1 = "EventApplicants";
    $("#EventDetailsDataBody").empty();
    $.ajax({
        type: "GET",
        url: "http://localhost:6063/api/events/GetAllEvents?id=" + id +"", //URI
        dataType: "json",
        success: function (data) {
            debugger;
            var datavalue = data;
            var myJsonObject = datavalue;
            contentType: "application/json";
            $.each(myJsonObject, function (i, mobj) {
                var str;
                if (mobj.EventStatus == "Active") {
                    str = '  <select id="StatusChangeButton' + mobj.Id + '" onchange="OnEventStatusChangeFunction(this.value,' + mobj.Id + ');"   class="btn btn-success"> ' +
                        ' <option >Active</option>' +
                        ' <option >InActive</option>' +
                        ' </select>  ';
                }
                else {
                    str = ' <select id="StatusChangeButton' + mobj.Id + '" onchange="OnEventStatusChangeFunction(this.value,' + mobj.Id + ');"   class="btn btn-danger"> ' +
                        ' <option >InActive</option>' +
                        ' <option >Active</option>' +
                            ' </select> ';
                } 
                $("#EventDetailsDataBody").append('<tr id="Row' + mobj.Id + '"> ' +
                    '               <td><input type="checkbox" class="checkbox" name="checkboxDelete" value="' + mobj.Id + '"></td>' +
                    '               <td>' + mobj.Name + ' </td>' +
                    '               <td>' + mobj.Place + ' </td>' +
                    '               <td>' + mobj.Date + ' </td>' +
                    '               <td>' + mobj.Time + ' </td>' +
                    '               <td>Rs.' + mobj.TicketPrice + '  </td>' +
                    '               <td>' + mobj.Discount + '% </td>' +
                    '               <td>' + mobj.AddDate + ' </td>' +
                    '               <td>' + str + ' </td>' +  
                    '  <td><button type="button" class="btn btn-info btn-sm" onclick="myFunctionSwapView2(' + mobj.Id + ',\'' + funcName1 + '\');">Manage</button> </td> ' +
                    '               <td><button type="button" class="btn btn-default btn-sm" onclick="myFunctionSwapView2(' + mobj.Id + ',\'' + funcName + '\');">Edit</button> </td> ' +
                    '</tr>');

                if (count == 0) {
                    $("#DesiMasalaDiv1").show();
                    $("#DesiMasalaDiv2").show();
                    document.getElementById("DesiMasalaEvent1").innerHTML = mobj.NumberOfShowing;
                    document.getElementById("DesiMasalaEvent2").innerHTML = mobj.NumberOfShowing;
                    document.getElementById("PrevButtonOfEvent1").value = mobj.Prev;
                    document.getElementById("PrevButtonOfEvent2").value = mobj.Prev;
                    document.getElementById("NextButtonOfEvent1").value = mobj.Next;
                    document.getElementById("NextButtonOfEvent2").value = mobj.Next;
                    if (mobj.count == 1 || mobj.count == 0)
                        document.getElementById('NumberOfEvents').innerHTML = mobj.Count + "  Event";
                    else
                        document.getElementById('NumberOfEvents').innerHTML = mobj.Count + "  Events";
                    count++;
                }
            });

        },
        error: function (xhr) {
            bootbox.alert('Internel Error...');
        }
    });
};
function OnEventStatusChangeFunction(val1, val2) { 
    if (val1 == "InActive") { 
        $('#StatusChangeButton' + val2 + '').removeClass('btn btn-success');
        $('#StatusChangeButton' + val2 + '').addClass('btn btn-danger'); 
    }
    else
    { 
        $('#StatusChangeButton' + val2 + '').removeClass('btn btn-danger');
        $('#StatusChangeButton' + val2 + '').addClass('btn btn-success'); 
    }
    var data = new FormData();
    data.append("Id", val2);
    data.append("EventStatus", val1); 
        var ajaxRequest = $.ajax({
            type: "POST",
            url: "http://localhost:6063/api/events/EventStatus",
            contentType: false,
            processData: false,
            data: data,
            success: function (data, textStatus, xhr) {
            }
    });
}
function EventCheakingCheckboxes() {
    var select_all = document.getElementById("select_all"); //select all checkbox
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
function EventCheakingCheckboxes2() {
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

function EventDeleteFunction() {
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
                            url: "http://localhost:6063/api/events/DeleteEvent?id=" + $(this).val() + "", //URI
                            dataType: "json",
                            contentType: "application/json",
                            success: function (data, textStatus, xhr) {
                                var row = document.getElementById("Row" + rowId);
                                row.parentNode.removeChild(row);
                                $("#DesiMasalaDiv1").hide();
                                $("#DesiMasalaDiv2").hide();
                                var count = parseInt(document.getElementById('NumberOfEvents').innerHTML);
                                if (count == 2)
                                    document.getElementById('NumberOfEvents').innerHTML = count - 1 + "  Event";
                                else
                                    document.getElementById('NumberOfEvents').innerHTML = count - 1 + "  Events";

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
function GetSingleEventByName() {
    document.getElementById('NumberOfEvents').innerHTML = 0 + "  Event";
    $("#DesiMasalaDiv1").hide();
    $("#DesiMasalaDiv2").hide();
    var funcName = "EventUpdate";
    var funcName1 = "EventApplicants";
    var count = 0;
    $("#EventDetailsDataBody").empty();
    $.ajax({
        type: "GET",
        url: "http://localhost:6063/api/events/GetAllEventsByName?id=" + document.getElementById("EventSearch").value + "", //URI
        dataType: "json",
        success: function (data) {
            debugger;
            var datavalue = data;
            var myJsonObject = datavalue;
            contentType: "application/json";
            $.each(myJsonObject, function (i, mobj) {
                var str;
                if (mobj.EventStatus == "Active" ) {
                    str = '    <select id="StatusChangeButton' + mobj.Id + '" onchange="OnEventStatusChangeFunction(this.value,' + mobj.Id + ');"   class="btn btn-success"> ' +
                        ' <option >Active</option>' +
                        ' <option >InActive</option>' +
                        ' </select>  ';
                }
                else {
                    str = '<select id="StatusChangeButton' + mobj.Id + '" onchange="OnEventStatusChangeFunction(this.value,' + mobj.Id + ');"   class="btn btn-danger"> ' +
                        ' <option >InActive</option>' +
                        ' <option >Active</option>' +
                        ' </select>  ' ;
                }
                $("#EventDetailsDataBody").append('<tr id="Row' + mobj.Id + '"> ' +
                    '               <td><input type="checkbox" class="checkbox" name="checkboxDelete" value="' + mobj.Id + '"></td>' +
                    '               <td>' + mobj.Name + ' </td>' +
                    '               <td>' + mobj.Place + ' </td>' +
                    '               <td>' + mobj.Date + ' </td>' +
                    '               <td>' + mobj.Time + ' </td>' +
                    '               <td>Rs.' + mobj.TicketPrice + '  </td>' +
                    '               <td>' + mobj.Discount + '% </td>' +
                    '               <td>' + mobj.AddDate + ' </td>' + 
                    '               <td>' + str + ' </td>' + 
                    '  <td><button type="button" class="btn btn-info btn-sm" onclick="myFunctionSwapView2(' + mobj.Id + ',\'' + funcName1 + '\');">Manage</button> </td> ' +
                    '  <td><button type="button" class="btn btn-default btn-sm" onclick="myFunctionSwapView2(' + mobj.Id + ',\'' + funcName + '\');">Edit</button> </td> ' +
                    '</tr>');

                if (count == 0) {
                    if (mobj.count == 1 || mobj.count == 0)
                        document.getElementById('NumberOfEvents').innerHTML = mobj.Count + "  Event";
                    else
                        document.getElementById('NumberOfEvents').innerHTML = mobj.Count + "  Events";
                    count++;
                }
            });

        },
        error: function (xhr) {
            bootbox.alert('Internel Error...');
        }
    });
    document.getElementById("EventSearch").value = "";
    return false;
}