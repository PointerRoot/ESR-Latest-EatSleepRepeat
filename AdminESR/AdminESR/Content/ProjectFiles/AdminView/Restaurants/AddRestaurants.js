function ValidateRestaurantForm() {
    document.getElementById("BtnRestaurant").disabled = true;
    if ($("#RestaurantName").val() != null) { 
        var Restaurant = {
            Name: $("#RestaurantName").val(), Discount: $("#RestaurantDiscount").val(),
            Area: $("#RestaurantArea").val()
        };
        var RestaurantData = JSON.stringify(Restaurant);
        // Make Ajax request with the contentType = false, and procesDate = false
        var ajaxRequest = $.ajax({
            type: "POST",
            url: "http://localhost:6063/api/restaurants/PostRestaurant",
            contentType: 'application/json; charset=utf-8',
            processData: false,
            dataType: "json",
            data: RestaurantData,
            success: function (data, textStatus, xhr) {
                if (data == 0) {
                    document.getElementById("BtnRestaurant").disabled = false;
                    bootbox.alert('Try Again! Later...');
                    $('#Restaurantform')[0].reset();
                }
                else { 
                    var pack1 = "";
                    $("input:checkbox[name=checkboxforTag]:checked").each(function () {
                        pack1 = pack1 + data + "," + $(this).val() + "$";
                    });
                    $.ajax({
                        type: "POST",
                        url: "http://localhost:6063/api/restaurants/PostRestaurantTags?id=" + pack1 + "",
                        contentType: 'application/json; charset=utf-8',
                        processData: false,
                        dataType: "json",
                        data: RestaurantData,
                        success: function (data, textStatus, xhr) {
                        },
                    });
                    var pack2 = "";
                    $("input:checkbox[name=checkboxforDeal]:checked").each(function () { 
                        pack2 = pack2 + data + "," + $(this).val() + "$";
                    }); 
                        $.ajax({
                            type: "POST",
                            url: "http://localhost:6063/api/restaurants/PostRestaurantDeals?id=" + pack2 + "",
                            contentType: 'application/json; charset=utf-8',
                            processData: false,
                            dataType: "json",
                            data: RestaurantData,
                            success: function (data, textStatus, xhr) { 
                            }, 
                        }); 
                    document.getElementById("BtnRestaurant").disabled = false;
                    bootbox.alert('Restaurant Successfully Added!');
                    $('#Restaurantform')[0].reset();
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                document.getElementById("BtnRestaurant").disabled = false;
                bootbox.alert('Server is not responding! Try Again Later');
                $('#Restaurantform')[0].reset();
            }
        });
        return false;
    }
    else {
        bootbox.alert("Make Sure All Fields with * are filled!");
        document.getElementById("BtnRestaurant").disabled = false;
        return false;
    }
}