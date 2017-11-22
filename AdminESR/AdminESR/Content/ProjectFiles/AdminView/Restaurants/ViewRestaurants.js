function RestaurantDetailsOpenFunction(id) {
    $('html, body').animate({ scrollTop: 0 }, 'fast');
    $("#DesiMasalaDiv1").hide();
    $("#DesiMasalaDiv2").hide();
    
    var count = 0;
    var funcName = "RestaurantUpdate";
    $("#RestaurantDetailsDataBody").empty();

    $.ajax({
        type: "GET",
        url: "http://localhost:6063/api/restaurants/GetAllRestaurants?id=" + id + "", //URI
        dataType: "json",
        success: function (data) {
            debugger;
            var datavalue = data;
            var myJsonObject = datavalue;
            contentType: "application/json";
            $.each(myJsonObject, function (i, mobj) {
               
                $("#RestaurantDetailsDataBody").append('<tr id="Row' + mobj.Id + '"> ' +
                    '               <td><input type="checkbox" class="checkbox" name="checkboxDelete" value="' + mobj.Id + '"></td>' +
                    '               <td>' + mobj.Name + ' </td>' +
                    '               <td>' + mobj.Area + ' </td>' +
                    '               <td>' + mobj.Discount + '% </td>' +
                    '               <td class="mailbox-name"><a href="#/" data-toggle="modal" data-target="#squarespaceModal1" id="seeTags" onclick="seeTags(' + mobj.Id + ')" >See All</a></td>' +
                    '               <td class="mailbox-name"><a href="#/" data-toggle="modal" data-target="#squarespaceModal2" id="seeDeals" onclick="seeDeals(' + mobj.Id + ')" >See All</a></td>' +
                    '               <td>' + mobj.AddDate + ' </td>' +
                    '               <td><button type="button" class="btn btn-default btn-sm" onclick="myFunctionSwapView2(' + mobj.Id + ',\'' + funcName + '\');">Edit</button> </td> ' +
                    '</tr>');

                if (count == 0) {
                    $("#DesiMasalaDiv1").show();
                    $("#DesiMasalaDiv2").show();
                    document.getElementById("DesiMasalaRestaurant1").innerHTML = mobj.NumberOfShowing;
                    document.getElementById("DesiMasalaRestaurant2").innerHTML = mobj.NumberOfShowing;
                    document.getElementById("PrevButtonOfRestaurant1").value = mobj.Prev;
                    document.getElementById("PrevButtonOfRestaurant2").value = mobj.Prev;
                    document.getElementById("NextButtonOfRestaurant1").value = mobj.Next;
                    document.getElementById("NextButtonOfRestaurant2").value = mobj.Next;
                    if (mobj.count == 1 || mobj.count == 0)
                        document.getElementById('NumberOfRestaurants').innerHTML = mobj.Count + "  Restaurant";
                    else
                        document.getElementById('NumberOfRestaurants').innerHTML = mobj.Count + "  Restaurants";
                    count++;
                }
            });

        },
        error: function (xhr) {
            bootbox.alert('Internel Error...');
        }
    });
};
function seeDeals(id) {
    $("#RestaurantsDeals").empty();
    $.ajax({
        type: "GET",
        url: "http://localhost:6063/api/restaurants/GetAllRestDealsById?id=" + id + "", //URI
        dataType: "json",
        success: function (data) {
            debugger;
            var datavalue = data;
            var myJsonObject = datavalue;
            contentType: "application/json";
            $.each(myJsonObject, function (i, mobj) {
                $("#RestaurantsDeals").append('<tr id="jawad' + mobj.Id + '"> ' +
                    '<td>' + mobj.Deals + ' </td>' +
                    '</tr>');
            });
        },
        error: function (xhr) {
            bootbox.alert('Internel Error...');
        }
    });
}
function seeTags(id) {
    $("#RestaurantsTags").empty();
    $.ajax({
        type: "GET",
        url: "http://localhost:6063/api/restaurants/GetAllRestTagsById?id=" + id + "", //URI
        dataType: "json",
        success: function (data) {
            debugger;
            var datavalue = data;
            var myJsonObject = datavalue;
            contentType: "application/json";
            $.each(myJsonObject, function (i, mobj) {
                $("#RestaurantsTags").append('<tr id="jawad' + mobj.Id + '"> ' +
                    '<td>' + mobj.Tags + ' </td>' +
                    '</tr>');
            });
        },
        error: function (xhr) {
            bootbox.alert('Internel Error...');
        }
    });
}
function RestaurantCheakingCheckboxes1() {
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
function RestaurantCheakingCheckboxes2() {
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

function RestaurantDeleteFunction() {
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
                            url: "http://localhost:6063/api/restaurants/DeleteRestaurant?id=" + $(this).val() + "", //URI
                            dataType: "json",
                            contentType: "application/json",
                            success: function (data, textStatus, xhr) {
                                var row = document.getElementById("Row" + rowId);
                                row.parentNode.removeChild(row);
                                $("#DesiMasalaDiv1").hide();
                                $("#DesiMasalaDiv2").hide();
                                var count = parseInt(document.getElementById('NumberOfRestaurants').innerHTML);
                                if (count == 2)
                                    document.getElementById('NumberOfRestaurants').innerHTML = count - 1 + "  Restaurant";
                                else
                                    document.getElementById('NumberOfRestaurants').innerHTML = count - 1 + "  Restaurants";

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
function GetSingleRestaurantByName() {
    document.getElementById('NumberOfRestaurants').innerHTML = 0 + "  Restaurant";
    $("#DesiMasalaDiv1").hide();
    $("#DesiMasalaDiv2").hide();
    var funcName = "RestaurantUpdate";
    var count = 0;
    $("#RestaurantDetailsDataBody").empty();
    $.ajax({
        type: "GET",
        url: "http://localhost:6063/api/restaurants/GetAllRestaurantsByName?id=" + document.getElementById("RestaurantSearch").value + "", //URI
        dataType: "json",
        success: function (data) {
            debugger;
            var datavalue = data;
            var myJsonObject = datavalue;
            contentType: "application/json";
            $.each(myJsonObject, function (i, mobj) {
                $("#RestaurantDetailsDataBody").append('<tr id="Row' + mobj.Id + '"> ' +
                    '               <td><input type="checkbox" class="checkbox" name="checkboxDelete" value="' + mobj.Id + '"></td>' +
                    '               <td>' + mobj.Name + ' </td>' +
                    '               <td>' + mobj.Area + ' </td>' +
                    '               <td>' + mobj.Discount + '% </td>' +
                    '               <td class="mailbox-name"><a href="#/" data-toggle="modal" data-target="#squarespaceModal1" id="seeTags" onclick="seeTags(' + mobj.Id + ')" >See All</a></td>' +
                    '               <td class="mailbox-name"><a href="#/" data-toggle="modal" data-target="#squarespaceModal2" id="seeDeals" onclick="seeDeals(' + mobj.Id + ')" >See All</a></td>' +
                    '               <td>' + mobj.AddDate + ' </td>' +
                    '               <td><button type="button" class="btn btn-default btn-sm" onclick="myFunctionSwapView2(' + mobj.Id + ',\'' + funcName + '\');">Edit</button> </td> ' +
                    '</tr>');

                if (count == 0) {
                    if (mobj.count == 1 || mobj.count == 0)
                        document.getElementById('NumberOfRestaurants').innerHTML = mobj.Count + "  Restaurant";
                    else
                        document.getElementById('NumberOfRestaurants').innerHTML = mobj.Count + "  Restaurants";
                    count++;
                }
            });

        },
        error: function (xhr) {
            bootbox.alert('Internel Error...');
        }
    });
    document.getElementById("RestaurantSearch").value = "";
    return false;
}