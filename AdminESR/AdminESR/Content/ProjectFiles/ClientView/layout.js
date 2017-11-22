$(document).ready(function () { 
    //$('.owl-carousel').owlCarousel(); 
    $.ajax({
        type: "GET",
        url: "http://localhost:6063/api/clients/GetAllClientForWeb", //URI
        dataType: "json",
        success: function (data) { 
            debugger;
            var datavalue = data;
            var myJsonObject = datavalue;
            contentType: "application/json";
            $('#CarosellayoutPageAdds').html('<div id="testinglayout"  class=" home3-hero-carousel owl-two owl-carousel"></div>');
            $('#CarosellayoutPageAddsSilver').html('<div id="testinglayoutthree"  class=" home3-hero-carousel owl-three owl-carousel"></div>');
            $.each(myJsonObject, function (i, mobj) { 
                if (mobj.priority1 == "Gold") {
                    $(".owl-two").append('<div class="col-xs-12">' +
                        ' <div class="home3-hero">' +
                        '       <img  src="../../Content/Images/Events/NoImage.png" style="min-height:140px; max-height:140px;" >' +
                        ' </div >' +
                        ' </div > ');
                }
                if (mobj.priority2 == "Silver") {
                    $(".owl-three").append('<div class="col-xs-12">' +
                        ' <div class="home3-hero">' +
                        '       <img  src="../../Content/Images/Events/NoImage.png" style="min-height:140px; max-height:140px;" >' +
                        ' </div >' +
                        ' </div > ');
                }
             });
              var owl1 = $("#testinglayout");
                owl1.owlCarousel({  
                    margin: 10,
                    responsiveClass: true,
                    autoHeight: true,
                    items: 1,
                    autoplay: true,
                    loop: true,
                    autoplayTimeout: 1000,
                    autoplaySpeed: 3000,
                    smartSpeed: 900, 
                    autoplayHoverPause: true,
                    nav: false, 
                    dots: false,  //Make this true
                    navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"]
              }); 
                var owl2 = $("#testinglayoutthree");
                owl2.owlCarousel({
                    margin: 10,
                    responsiveClass: true,
                    autoHeight: true,
                    items: 1,
                    autoplay: true,
                    loop: true,
                    autoplayTimeout: 1000,
                    autoplaySpeed: 3000,
                    smartSpeed: 900,
                    autoplayHoverPause: true,
                    nav: false,
                    dots: false,  //Make this true
                    navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"]
                }); 
        },
        error: function (xhr) {
            bootbox.alert('Internel Error...');
        }
    });
});