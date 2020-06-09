/* WOSH v1.0.0 CUSTOM SCRIPTS
 * Copyright 2017 HUGESTEM
 * http://www.hugestem.com */

window.jQuery = window.$ = jQuery;
$(document).ready(function(){
/*--------------------------------------------------*/
/*	MISC
/*--------------------------------------------------*/
	$('.path-taxonomy .views-element-container').addClass('row');	
	$('.path-taxonomy .sidebar .views-element-container').removeClass('row');
	$('.fullwidth .row-wrap').removeClass('row');
	$('.cta-style3').addClass('container');
	
	if ( $(window).width() < 767) {
		//Mobile Bootstrap Grid
		$('.grid-wrapper').removeClass('grid');
	}
	
//MAIN MENU
	$('.primary-navbar .menu-parent').smartmenus();
	$('.primary-navbar .menu-parent').addClass('sm sm-menu');
	
/*	FEAT BLOCK  */
	$('.feat-block-content-alt .field-field-block').addClass('row');
	$(".feat-block-content-alt .feat-item").parent().addClass('col-md-6');

/*	PRODUCT  */
	$(".product-teaser .form-item").remove();
	$('.product-teaser .product-add-cart .form-submit').before('<i class="fa fa-shopping-cart cart-link-icon"></i>');

/*	PROMOTION  */
	$(".promotion-layout1 .promotion-item-field").addClass('col-md-4');
	$(".promotion-layout1 .grid-wrapper").addClass('grid');
	$(".promotion-layout2 .grid-item").addClass('col-md-5');
	$(".promotion-layout2 .grid-item:nth-child(3n+1)").removeClass('col-md-5');
	$(".promotion-layout2 .grid-item:nth-child(3n+1)").addClass('col-md-7');
	$('.promotion-layout2 .promotion-item-field:odd').after('<div class="clearfix"></div>');
	$(".promotion-layout3 .promotion-item-field").addClass('col-md-6');
	
/*	DEALS  */
	$('.deals-grid .field-field-product-block').addClass('row');
	$(".deals-grid .field-field-product-block .product-teaser").parent().addClass('col-md-3 grid-item');
	$('.deals-carousel .field-field-product-block').addClass('deal-carousel owl-carousel');
	
/*	FACET  */	
    $('.facet-list').slimScroll({
          height: '200px',
		  width: '100%',
		  railVisible: false,
		  alwaysVisible: true,
		  size: '2px',
		  wheelStep: 15
    });	

/*	FLIPPED TABLE  */
    $(".flipped-table table").each(function() {
        var $this = $(this);
        var newrows = [];
        $this.find("tr").each(function(){
            var i = 0;
            $(this).find("td").each(function(){
                i++;
                if(newrows[i] === undefined) { newrows[i] = $("<tr></tr>"); }
                newrows[i].append($(this));
            });
			
            $(this).find("th").each(function(){
                i++;
                if(newrows[i] === undefined) { newrows[i] = $("<tr></tr>"); }
                newrows[i].append($(this));
            });
			
        });
        $this.find("tr").remove();
        $.each(newrows, function(){
            $this.append(this);
        });
    });

/*	TAB  */	
	$(".tab-content .my-group:first").addClass("active");

/*	OWL SLIDER  */	  
    $('.slide-carousel').each( function() {
        var $carousel = $(this);
        $carousel.owlCarousel({
            items : $carousel.data("items"),
            slideBy : $carousel.data("slideby"),
            center : $carousel.data("center"),
            loop : $carousel.data("loop"),
            margin : $carousel.data("margin"),
            nav : $carousel.data("nav"),
			dots : $carousel.data("dots"),
            autoplay : $carousel.data("autoplay"),
			autoplaySpeed : $carousel.data("autoplayspeed"),
			autoplayHoverPause : $carousel.data("autoplayhoverpause"),
            autoplayTimeout : $carousel.data("autoplaytimeout"),
			URLhashListener : $carousel.data("urlhashlistener"),
        });
    });
	
  // Declare Carousel jquery object
  var owl = $('.hero');

  // add animate.css class(es) to the elements to be animated
  function setAnimation ( _elem, _InOut ) {
    // Store all animationend event name in a string.
    var animationEndEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

    _elem.each ( function () {
      var $elem = $(this);
      var $animationType = 'animated ' + $elem.data( 'animation-' + _InOut );

      $elem.addClass($animationType).one(animationEndEvent, function () {
        $elem.removeClass($animationType); // remove animate.css Class at the end of the animations
      });
    });
  }

// Fired before current slide change
  owl.on('change.owl.carousel', function(event) {
      var $currentItem = $('.owl-item', owl).eq(event.item.index);
      var $elemsToanim = $currentItem.find("[data-animation-out]");
      setAnimation ($elemsToanim, 'out');
  });

// Fired after current slide has been changed
  owl.on('changed.owl.carousel', function(event) {
      var $currentItem = $('.owl-item', owl).eq(event.item.index);
      var $elemsToanim = $currentItem.find("[data-animation-in]");
      setAnimation ($elemsToanim, 'in');
  });

/*	SEARCH & FORM  */
 	//SEARCH TOGGLE
	$('#search .search-trigger').on('click',function(){
        $('.search-bar').animate({height: 'toggle'},500);
    });
	// SEARCH PLACHOLDER
	$("#search-modal .form-search").attr("placeholder", "Search..");
	$(".search-content .form-search").attr("placeholder", "Search...");
	
    // LABEL TO PLACEHOLDER
    $("form.contact-form :input, .contact-form form :input, form.user-login-form :input, form.user-register-form :input, form.user-pass :input, form.comment-form :input, .search-page-form :input, #views-exposed-form-blog-blog-page :input, #toggle-sidebar .block-search :input, .block-simplenews :input, #toggle-sidebar :input").not(':checkbox, :radio').each(function (index, elem) {
		var eId = $(elem).attr("id");
		var label = null;
		if (eId && (label = $(elem).parents("form").find("label[for=" + eId + "]")).length == 1) {
			$(elem).attr("placeholder", $(label).html());
			$(label).remove();
		}
	});

  $('.regular').slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true
  });
});

$(document).ajaxComplete(function(){
	
	$(".ui-dialog-buttonpane, #drupal-modal .product-info, .ui-dialog .ui-dialog-titlebar-close span").remove();
	$(".ui-dialog .ui-dialog-titlebar-close").removeClass('ui-button');
	
	$("#drupal-modal .product-image").removeClass('slide-carousel');
	$("#drupal-modal .product-image").addClass('quick-carousel');
	
	$(".product-teaser .form-item").remove();
	$(".ui-dialog .ui-dialog-buttonpane").remove();
	

	$('.quick-carousel').owlCarousel({
		loop: true,
		margin: 0,
		nav: true,
		items: 1,
		dots: false,
	});
	
	$('.deal-carousel').owlCarousel({
		loop: true,
		margin: 30,
		nav: true,
		dots: false,
		responsive: {
            0: {
               items: 1
               },
            600: {
               items: 3
               },
            1000: {
               items: 4
               }
        }
	});

/*	SHUFFLE GRID  */
	var $grid = $('.grid');

	$grid.shuffle({
		itemSelector: '.grid-item'
	});
	
    /*
	$('.ui-dialog .ui-dialog-content').slimScroll({
          height: '100%',
		  width: '100%',
		  railVisible: true,
		  alwaysVisible: true,
		  size: '0px',
		  wheelStep: 15
    });
	*/

});

$(window).on('load', function (){
/*	PRELOADER  */
	$(".preloader-spinner").fadeOut();
	$(".preloader").delay(200).fadeOut("slow").delay(200, function(){
		$(this).remove();
	});

/*	COUNTER  */
	if ($().appear) {
		$('.counter').appear();
		$('.counter').filter(':appeared').each(function(index){
			if ($(this).hasClass('counted')) {
				return;
			} else {
				$(this).countTo().addClass('counted');
			}
		});
		$('body').on('appear', '.counter', function(e, $affected ) {
			$($affected).each(function(index){
				if ($(this).hasClass('counted')) {
					return;
				} else {
					$(this).countTo().addClass('counted');
				}	
			});
		});
	}
});

/*	PIECHART PROGRESS  */
function pieChart() {
	//circle progress bar
	if (($().easyPieChart)) {
		//var count = 0 ;
		//var colors = ['#4D91BA', '#5FCCA3', '#FFBB19'];
		$('.chart').each(function(){
				
			var imagePos = $(this).offset().top;
			var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+900) {

				$(this).easyPieChart({
			        barColor: '#333333',
					trackColor: '#f5f5f5',
					scaleColor: false,
					scaleLength: false,
					//lineCap: 'butt',
					lineWidth: 4,
					size: 110,
					rotate: 0,
					animate: 3000,
					onStep: function(from, to, percent) {
							$(this.el).find('.percent').text(Math.round(percent));
						}
			    });
			}
			//count++;
			//if (count >= colors.length) { count = 0};
		});
	}
}

$(window).scroll(function() {
	/*	PIE CHART  */
	pieChart();
	
    /*	BACK TO TOP & STICKY HEADER  */
	if($(this).scrollTop() != 0) {
        $(".back-to-top").fadeIn();
		$('.header').addClass("sticky");
    } else {
        $(".back-to-top").fadeOut();
		$('.header').removeClass("sticky");
    };

});

$(".back-to-top").click(function() {
    $("body, html").animate({scrollTop:0},800);
});

