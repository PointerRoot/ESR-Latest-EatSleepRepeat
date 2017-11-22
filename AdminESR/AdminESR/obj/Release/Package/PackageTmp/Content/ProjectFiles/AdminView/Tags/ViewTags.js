function TagDetailsOpenFunction(id) {
    $('html, body').animate({ scrollTop: 0 }, 'fast');
    $("#DesiMasalaDiv1").hide();
    $("#DesiMasalaDiv2").hide();
    var count = 0;
    var funcName = "TagUpdate";
    $("#TagDetailsDataBody").empty();
    $.ajax({
        type: "GET",
        url: "http://admin.eatsleeprepeatesr.com/api/tags/GetAllTags?id=" + id +"", //URI
        dataType: "json",
        success: function (data) {
            debugger;
            var datavalue = data;
            var myJsonObject = datavalue;
            contentType: "application/json";
            $.each(myJsonObject, function (i, mobj) {
                $("#TagDetailsDataBody").append('<tr id="Row' + mobj.Id + '"> ' +
                    '               <td><input type="checkbox" class="checkbox" name="checkboxDelete" value="' + mobj.Id + '"></td>' +
                    '               <td>' + mobj.Description + ' </td>' +
                    '               <td>' + mobj.AddDate + ' </td>' +
                    '               <td><button type="button" class="btn btn-default btn-sm" onclick="myFunctionSwapView2(' + mobj.Id + ',\'' + funcName + '\');">Edit</button> </td> ' +
                    '</tr>');

                if (count == 0) {
                    $("#DesiMasalaDiv1").show();
                    $("#DesiMasalaDiv2").show();
                    document.getElementById("DesiMasalaTag1").innerHTML = mobj.NumberOfShowing;
                    document.getElementById("DesiMasalaTag2").innerHTML = mobj.NumberOfShowing;
                    document.getElementById("PrevButtonOfTag1").value = mobj.Prev;
                    document.getElementById("PrevButtonOfTag2").value = mobj.Prev;
                    document.getElementById("NextButtonOfTag1").value = mobj.Next;
                    document.getElementById("NextButtonOfTag2").value = mobj.Next;
                    if (mobj.count == 1 || mobj.count == 0)
                        document.getElementById('NumberOfTags').innerHTML = mobj.Count + "  Tag";
                    else
                        document.getElementById('NumberOfTags').innerHTML = mobj.Count + "  Tags";
                    count++;
                }
            });

        },
        error: function (xhr) {
            bootbox.alert('Internel Error...');
        }
    });
}
function TagCheakingCheckboxes1() {
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
function TagCheakingCheckboxes2() {
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

function TagDeleteFunction() {
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
                            url: "http://admin.eatsleeprepeatesr.com/api/tags/DeleteTags?id=" + $(this).val() + "", //URI
                            dataType: "json",
                            contentType: "application/json",
                            success: function (data, textStatus, xhr) {
                                var row = document.getElementById("Row" + rowId);
                                row.parentNode.removeChild(row);
                                $("#DesiMasalaDiv1").hide();
                                $("#DesiMasalaDiv2").hide();
                                var count = parseInt(document.getElementById('NumberOfTags').innerHTML);
                                if (count == 2)
                                    document.getElementById('NumberOfTags').innerHTML = count - 1 + "  Tag";
                                else
                                    document.getElementById('NumberOfTags').innerHTML = count - 1 + "  Tags";

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
function GetSingleTagByName() {
    document.getElementById('NumberOfTags').innerHTML = 0 + "  Tag";
    $("#DesiMasalaDiv1").hide();
    $("#DesiMasalaDiv2").hide();
    var funcName = "TagUpdate";
    var count = 0;
    $("#TagDetailsDataBody").empty();
    $.ajax({
        type: "GET",
        url: "http://admin.eatsleeprepeatesr.com/api/tags/GetAllTagsByName?id=" + document.getElementById("TagSearch").value + "", //URI
        dataType: "json",
        success: function (data) {
            debugger;
            var datavalue = data;
            var myJsonObject = datavalue;
            contentType: "application/json";
            $.each(myJsonObject, function (i, mobj) {
                $("#TagDetailsDataBody").append('<tr id="Row' + mobj.Id + '"> ' +
                    '               <td><input type="checkbox" class="checkbox" name="checkboxDelete" value="' + mobj.Id + '"></td>' +
                    '               <td>' + mobj.Description + ' </td>' +
                    '               <td>' + mobj.AddDate + ' </td>' +
                    '               <td><button type="button" class="btn btn-default btn-sm" onclick="myFunctionSwapView2(' + mobj.Id + ',\'' + funcName + '\');">Edit</button> </td> ' +
                    '</tr>');

                if (count == 0) {
                    if (mobj.count == 1 || mobj.count == 0)
                        document.getElementById('NumberOfTags').innerHTML = mobj.Count + "  Tag";
                    else
                        document.getElementById('NumberOfTags').innerHTML = mobj.Count + "  Tags";
                    count++;
                }
            });

        },
        error: function (xhr) {
            bootbox.alert('Internel Error...');
        }
    });
    document.getElementById("TagSearch").value = "";
    return false;
}