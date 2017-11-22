$(document).ready(function () {
    $('html, body').animate({ scrollTop: 0 }, 'fast');
    $("#ServiceTable").empty();
    var count = 0;
    $.ajax({
        type: "GET",
        url: "http://localhost:6063/api/services/GetAllServices?id="+count+"", //URI
        dataType: "json",
        success: function (data) {

            debugger;
            var datavalue = data;
            var myJsonObject = datavalue;
            contentType: "application/json";
            $.each(myJsonObject, function (i, mobj) {

                $("#ServiceTable").append(' <tr id="jawad' + mobj.Id + '"> ' +
                    '               <td><input type="checkbox" class="checkbox" name="checkboxforService" value="' + mobj.Id + '"></td>' +
                    '               <td>' + mobj.Name + ' </td>' +

                    '</tr>');

            });

        },
        error: function (xhr) {
            bootbox.alert('Internel Error...');
        }
    });


    $("#TagTable").empty();
    var count1 = 0;
   
    $.ajax({
        type: "GET",
        url: "http://localhost:6063/api/tags/GetAllTags?id=" + count1 + "", //URI
        dataType: "json",
        success: function (data) {
            
            debugger;
            var datavalue = data;
            var myJsonObject = datavalue;
            contentType: "application/json";
            $.each(myJsonObject, function (i, mobj) {

                $("#TagTable").append(' <tr id="jawad' + mobj.Id + '"> ' +
                    '               <td><input type="checkbox" class="checkbox" name="checkboxforTag" value="' + mobj.Id + '"></td>' +
                    '               <td>' + mobj.Description + ' </td>' +

                    '</tr>');

            });

        },
        error: function (xhr) {
            bootbox.alert('Internel Error...');
        }
    });

    $("#PakageTable").empty();
    var count2 = 0;

    $.ajax({
        type: "GET",
        url: "http://localhost:6063/api/pakages/GetAllPakages?id=" + count2 + "", //URI
        dataType: "json",
        success: function (data) {

            debugger;
            var datavalue = data;
            var myJsonObject = datavalue;
            contentType: "application/json";
            $.each(myJsonObject, function (i, mobj) {

                $("#PakageTable").append(' <tr id="jawad' + mobj.Id + '"> ' +
                    '               <td><input type="checkbox" class="checkbox" name="checkboxforPakage" value="' + mobj.Id + '"></td>' +
                    '               <td>' + mobj.Name + ' </td>' +

                    '</tr>');

            });

        },
        error: function (xhr) {
            bootbox.alert('Internel Error...');
        }
    });

    $("#DealTable").empty();
    var count3 = 0;

    $.ajax({
        type: "GET",
        url: "http://localhost:6063/api/deals/GetAllDeals?id=" + count3 + "", //URI
        dataType: "json",
        success: function (data) {

            debugger;
            var datavalue = data;
            var myJsonObject = datavalue;
            contentType: "application/json";
            $.each(myJsonObject, function (i, mobj) {
                
                $("#DealTable").append(' <tr id="jawad' + mobj.Id + '"> ' +
                    '               <td><input type="checkbox" class="checkbox" name="checkboxforDeal" value="' + mobj.Id + '"></td>' +
                    '               <td>' + mobj.Description + ' </td>' +

                    '</tr>');

            });

        },
        error: function (xhr) {
            bootbox.alert('Internel Error...');
        }
    });


});

function FirstPageToOpen() {

    $("#ServiceTable").empty();
    var count = 0;
    $.ajax({
        type: "GET",
        url: "http://localhost:6063/api/services/GetAllServices?id=" + count + "", //URI
        dataType: "json",
        success: function (data) {

            debugger;
            var datavalue = data;
            var myJsonObject = datavalue;
            contentType: "application/json";
            $.each(myJsonObject, function (i, mobj) {

                $("#ServiceTable").append(' <tr id="jawad' + mobj.Id + '"> ' +
                    '               <td><input type="checkbox" class="checkbox" name="checkboxforService" value="' + mobj.Id + '"></td>' +
                    '               <td>' + mobj.Name + ' </td>' +

                    '</tr>');

            });

        },
        error: function (xhr) {
            bootbox.alert('Internel Error...');
        }
    });


    $("#TagTable").empty();
    var count1 = 0;

    $.ajax({
        type: "GET",
        url: "http://localhost:6063/api/tags/GetAllTags?id=" + count1 + "", //URI
        dataType: "json",
        success: function (data) {

            debugger;
            var datavalue = data;
            var myJsonObject = datavalue;
            contentType: "application/json";
            $.each(myJsonObject, function (i, mobj) {

                $("#TagTable").append(' <tr id="jawad' + mobj.Id + '"> ' +
                    '               <td><input type="checkbox" class="checkbox" name="checkboxforTag" value="' + mobj.Id + '"></td>' +
                    '               <td>' + mobj.Description + ' </td>' +

                    '</tr>');

            });

        },
        error: function (xhr) {
            bootbox.alert('Internel Error...');
        }
    });

    $("#PakageTable").empty();
    var count2 = 0;

    $.ajax({
        type: "GET",
        url: "http://localhost:6063/api/pakages/GetAllPakages?id=" + count2 + "", //URI
        dataType: "json",
        success: function (data) {

            debugger;
            var datavalue = data;
            var myJsonObject = datavalue;
            contentType: "application/json";
            $.each(myJsonObject, function (i, mobj) {

                $("#PakageTable").append(' <tr id="jawad' + mobj.Id + '"> ' +
                    '               <td><input type="checkbox" class="checkbox" name="checkboxforPakage" value="' + mobj.Id + '"></td>' +
                    '               <td>' + mobj.Name + ' </td>' +

                    '</tr>');

            });

        },
        error: function (xhr) {
            bootbox.alert('Internel Error...');
        }
    });

    $("#DealTable").empty();
    var count3 = 0;

    $.ajax({
        type: "GET",
        url: "http://localhost:6063/api/deals/GetAllDeals?id=" + count3 + "", //URI
        dataType: "json",
        success: function (data) {

            debugger;
            var datavalue = data;
            var myJsonObject = datavalue;
            contentType: "application/json";
            $.each(myJsonObject, function (i, mobj) {

                $("#DealTable").append(' <tr id="jawad' + mobj.Id + '"> ' +
                    '               <td><input type="checkbox" class="checkbox" name="checkboxforDeal" value="' + mobj.Id + '"></td>' +
                    '               <td>' + mobj.Description + ' </td>' +

                    '</tr>');

            });

        },
        error: function (xhr) {
            bootbox.alert('Internel Error...');
        }
    });
}