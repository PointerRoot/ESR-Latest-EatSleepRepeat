function AnalayticsFunction() {
   
}
function GetSingleRestByName() {
    "use strict";

    // LINE CHART
    var line = new Morris.Line({
        element: 'line-chart1',
        resize: true,
        data: [

        ],
        xkey: 'y',
        ykeys: ['item1'],
        labels: ['count'],
        lineColors: ['#3c8dbc'],
        hideHover: 'auto'
    });

    var i = 0;
    $.ajax({
        type: "GET",
        url: "http://admin.eatsleeprepeatesr.com/api/restaurants/GetRestVisit?id=" + document.getElementById("RestSearch").value + "", //URI
        dataType: "json",
        success: function (data) {
            debugger;
            var datavalue = data;
            var myJsonObject = datavalue;
            contentType: "application/json";
            $.each(myJsonObject, function (i, mobj) {
                alert(mobj.Date);
                var d= { y: mobj.Date, item1: mobj.count }
                line.options.data[i] = {d};
                i++;
            });

        },
        error: function (xhr) {
            bootbox.alert('Internel Error...');
        }
    });

   
    return false;
}