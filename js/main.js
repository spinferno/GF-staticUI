var rellax = new Rellax('.rellax');

$(window).on("load resize", function () {
    $(".aspect-ratio-square__by-width").each(function () {
        $(this).height(this.clientWidth);
    });

    $(".aspect-ratio-1_5__by-width").each(function () {
        $(this).height(this.clientWidth * 0.6666666666666667);
    });
});

$(document).ready(function () {

    // Init
    var isTakeover = ($('.feature-container__takeover-promotion').length ? true : false);
    var verticalOffset = 0;
    var notificationHeight = 0;
    var takeoverOffset = 1000;
    var heightOfHeader = 172;
    var isHomepage = ($(".feature-container__restaurants").length == 0 ? false : true);
    var isNotificationVisible = ($(".notification-container").is(":visible")) ? true : false;
    var firstBlockOffset = 0;

    // notification bar vertical offset functionality
    if(isNotificationVisible){
        notificationHeight = $('.notification-container')[0].clientHeight;        
        verticalOffset = verticalOffset + notificationHeight;
        heightOfHeader = heightOfHeader + notificationHeight;
    };

    // prepare layout for homepage takeover
    if(isTakeover) {
        $( "body" ).addClass( "takeover" );
        verticalOffset = parseInt(verticalOffset + takeoverOffset);
    };

    // add space if not homepage
    if(!isHomepage) {
        // verticalOffset = verticalOffset + 172;
        notificationHeight = notificationHeight + heightOfHeader;
        firstBlockOffset = heightOfHeader;
    } else {
        firstBlockOffset = notificationHeight + heightOfHeader;
    };

    // apply background parallax width
    $('.background-canvas').css("width", $(".header-container header")[0].clientWidth.toString()+"px"); 

    // apply vertical offsets
    var mq = window.matchMedia( "(min-width: 768px)" );
    if (mq.matches) {
        // verticalOffset = verticalOffset + $(".header-container header")[0].clientHeight;
        $(".header-container").next().css("margin-top", firstBlockOffset.toString()+"px");
        $(".background-canvas").css("margin-top", verticalOffset.toString()+"px");
        $(".header-container").css("height", parseInt(heightOfHeader)+"px");
    } else {
        $(".header-container").next().css("margin-top", 0);
        $('.header-container').css("margin-top", 0);
        $(".header-container").css("height", "auto");
    };

    var smBreakpoint = window.matchMedia( "(max-width: 575.98px)" );
    if (smBreakpoint.matches) {
        $('.background-canvas').css("margin-top", parseInt(verticalOffset).toString()+"px");
    };

    // dropdown nav functionality

    $("#dropdown-trigger-close").hide();
    $(".header-dropdown").hide();

    $("#dropdown-trigger-open").click(function () {
        $(".header-container").addClass("expanded");
        $(".header-dropdown").slideToggle("fast", function () {
            $("#dropdown-trigger-open").hide();
            $("#dropdown-trigger-close").show();
        });
    });

    $("#dropdown-trigger-close").click(function () {        
        $(".header-container").removeClass("expanded");
        $(".header-dropdown").slideToggle("fast", function () {
            $("#dropdown-trigger-close").hide();
            $("#dropdown-trigger-open").show();
        });
    });

    // notification bar dismiss functionality

    $("#dismiss-notification-trigger").click(function() {
        $(".notification-container").hide();
        var verticalOffset = 0;
        heightOfHeader = 172;
        var mq = window.matchMedia( "(min-width: 768px)" );
        if (mq.matches) {verticalOffset = $('.header-container header')[0].clientHeight};
        $('.header-container').next().css("margin-top", parseInt(verticalOffset));
        $('.background-canvas').css("margin-top", 0);
        $(".header-container").css("height", parseInt(heightOfHeader)+"px");
    });

    // global header search functionality

    $("#search-trigger-close").hide();
    $(".form-searchgoodfood").hide();

    // detect and implement takeover promotion mode

    if($('.feature-container__takeover-promotion').length){
        $( "body" ).addClass( "takeover" );
    }

    var mq = window.matchMedia( "(max-width: 767.98px)" );

    //if (mq.matches) { //only apply behaviour for 767.98px+ viewports

        $("#search-trigger-open").click(function () {            
            $("#search-trigger-close").show();
            $("#search-trigger-open").hide();
            $("header .button-container, #cart-trigger, #dropdown-trigger-open").css("display", "none");            
            $(".header-actions-container").addClass("search-expanded");
            $(".form-searchgoodfood").slideToggle("fast", function () {
            });

            // check if dropdown needs collapsing
            if( $(".header-dropdown").css('display') == 'block' ) {
                $(".header-dropdown").slideToggle("fast", function () {
                    $("#dropdown-trigger-close, #dropdown-trigger-close").hide();
                });   
            };  
        });

        $("#search-trigger-close").click(function () {
            $(".form-searchgoodfood").slideToggle("fast", function () {
                $("#search-trigger-close").hide();
                $("#search-trigger-open, #cart-trigger, #dropdown-trigger-open").show();
                $("header .button-container").css("display", "flex");
                $(".header-actions-container").removeClass("search-expanded");
            });
        });

    //};

    //if (window.matchMedia("(max-width: 990.98px)").matches) {

        // front page carousels
        $('.restaurant-listing.listing-row, .experience-listing.listing-row, .learnmore-listing.listing-row').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 3
                    }
                },            
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2
                    }
                },            
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });

        // restaurant listing carousel 
        $('.feature-container__restaurant-suggestions .full-image-listing.listing-row').slick({
            slidesToShow: 6,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 5
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 3
                    }
                },            
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2
                    }
                },            
                {
                    breakpoint: 650,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });      
    
    //};

    // scroll position detection
    // The debounce function receives our function as a parameter
    const debounce = (fn) => {
        let frame;
        return (...params) => {
        if (frame) { 
            cancelAnimationFrame(frame);
        }
        frame = requestAnimationFrame(() => {
            fn(...params);
        });  
        } 
    };

    const storeScroll = () => {
        document.documentElement.dataset.scroll = window.scrollY;
    }
    document.addEventListener('scroll', debounce(storeScroll), { passive: true });
    
    // Update scroll position for first time
    storeScroll();



    window.scrollTo(0, 0);

});