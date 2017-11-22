function StartFunction(id) {
    $('html, body').animate({ scrollTop: 0 }, 'fast'); 

    $('#SearchbarDivision').empty(); 
    var script = "<script> var ajax = new XMLHttpRequest();" +
        " ajax.open('GET', 'http://admin.eatsleeprepeatesr.com/api/EventAttendies/GetAllApplicantsNames?Id=" + id + "', true);" +
        " ajax.onload = function () {" +
        "    var list = JSON.parse(ajax.responseText).map(function (i) { return i.Name; });" +
        "    new Awesomplete(document.querySelector('#ajax-example2 input'), { list: list });" +
        " };" +
        " ajax.send();" +
        "<" +
        "/script>";

    $('#SearchbarDivision').html('<section id="ajax-example2">' +
        '<form action="#/" onsubmit="return GetSingleEventAttendiesByName()">' +
        '<input type="text" class="form-control input-sm" placeholder="Search Event Applicants" required name="EventApplicants" id="EventAttendiesSearch">' +
        '</form>'
        + script +
        '</section>' + 
        '<span class="glyphicon glyphicon-search form-control-feedback"></span>');
         
    var count = 0;
    $("#EventAttendiesDetailsDataBody").empty();
    $.ajax({
        type: "GET",
        url: "http://admin.eatsleeprepeatesr.com/api/EventAttendies/GetAllAttendiesByEvent?id=" + id + "", //URI
        dataType: "json",
        success: function (data) {
            debugger;
            var datavalue = data;
            var myJsonObject = datavalue;
            contentType: "application/json";
            $.each(myJsonObject, function (i, mobj) {
                $("#EventAttendiesDetailsDataBody").append('<tr id="Row' + mobj.Id + '"> ' +
                    '               <td><input type="checkbox" class="checkbox" name="checkboxDelete" value="' + mobj.Id + '"></td>' +
                    '               <td>' + mobj.Name + ' </td>' +
                    '               <td>' + mobj.Tickets + ' </td>' +
                    '               <td>' + mobj.CNIC + ' </td>' + 
                    '               <td>' + mobj.Email + ' </td>' + 
                    '</tr>');

                if (count == 0) { 
                    if (mobj.count == 1 || mobj.count == 0)
                        document.getElementById('NumberOfEventAttendiess').innerHTML = mobj.Count + "  EventAttendies";
                    else
                        document.getElementById('NumberOfEventAttendiess').innerHTML = mobj.Count + "  EventAttendiess";
                    count++;
                }
            });

        },
        error: function (xhr) {
            bootbox.alert('Internel Error...');
        }
    });
};

function EventAttendiesCheakingCheckboxes1() {
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
function EventAttendiesCheakingCheckboxes2() {
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
function EventAttendiesDeleteFunction() {
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
                            url: "http://admin.eatsleeprepeatesr.com/api/EventAttendies/DeleteEventAttendies?id=" + $(this).val() + "", //URI
                            dataType: "json",
                            contentType: "application/json",
                            success: function (data, textStatus, xhr) {
                                var row = document.getElementById("Row" + rowId);
                                row.parentNode.removeChild(row); 
                                var count = parseInt(document.getElementById('NumberOfEventAttendiess').innerHTML);
                                if (count == 2)
                                    document.getElementById('NumberOfEventAttendiess').innerHTML = count - 1 + "  EventAttendies";
                                else
                                    document.getElementById('NumberOfEventAttendiess').innerHTML = count - 1 + "  EventAttendiess";

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

function GetSingleEventAttendiesByName() {
    document.getElementById('NumberOfEventAttendiess').innerHTML = 0 + "  EventAttendies";  
    var count = 0;
    $("#EventAttendiesDetailsDataBody").empty();
    $.ajax({
        type: "GET",
        url: "http://admin.eatsleeprepeatesr.com/api/EventAttendies/GetAllAttendiesByName?id=" + document.getElementById("EventAttendiesSearch").value + "", //URI
        dataType: "json",
        success: function (data) {
            debugger;
            var datavalue = data;
            var myJsonObject = datavalue;
            contentType: "application/json";
            $.each(myJsonObject, function (i, mobj) {
                $("#EventAttendiesDetailsDataBody").append('<tr id="Row' + mobj.Id + '"> ' +
                    '               <td><input type="checkbox" class="checkbox" name="checkboxDelete" value="' + mobj.Id + '"></td>' +
                    '               <td>' + mobj.Name + ' </td>' +
                    '               <td>' + mobj.Tickets + ' </td>' +
                    '               <td>' + mobj.CNIC + ' </td>' +
                    '               <td>' + mobj.Email + ' </td>' +
                    '</tr>');

                if (count == 0) { 
                    if (mobj.count == 1 || mobj.count == 0)
                        document.getElementById('NumberOfEventAttendiess').innerHTML = mobj.Count + "  Event Attendies";
                    else
                        document.getElementById('NumberOfEventAttendiess').innerHTML = mobj.Count + "  Event Attendiess";
                    count++;
                }
            });

        },
        error: function (xhr) { 
        }
    });
    document.getElementById("EventAttendiesSearch").value = "";
    return false;
}