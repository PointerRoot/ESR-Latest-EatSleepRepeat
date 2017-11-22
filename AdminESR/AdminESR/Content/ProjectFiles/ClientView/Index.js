$(document).ready(function () {
    //$('.owl-carousel').owlCarousel(); 
    $.ajax({
        type: "GET",
        url: "http://localhost:6063/api/restaurants/GetAllRestaurantsForWeb", //URI
        dataType: "json",
        success: function (data) { 
            debugger;
            var datavalue = data;
            var myJsonObject = datavalue;
            contentType: "application/json";
            $('#CaroselIndexPage').html('<div id="testing" class="home3-hero-carousel owl-one owl-carousel"></div>');
              $.each(myJsonObject, function (i, mobj) { 
                  $(".owl-one").append('<div class="col-xs-12">'+
                        ' <div class="home3-hero">' +
                        ' <h2 class="h3h-intro"> ' + mobj.Area  + '</h2>' +
                        ' <h1 class="h3h-title">' + mobj.Name + ' </h1>' +
                        ' <label class="h3h-discover" > ' + mobj.Discount + '%</a>' +
                         ' </div >' +
                        ' </div > ');  
             });
                var owl = $("#testing");
                owl.owlCarousel({
                    items: 1,
                    autoplay: 1000,
                    autoplaySpeed: 3000,
                    autoplayHoverPause: false,
                    //navigation: true
                    loop: true,
                    margin: 30,
                    nav: true,
                    smartSpeed: 900,
                    navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"]
                }); 
        },
        error: function (xhr) {
            bootbox.alert('Internel Error...');
        }
    });
});