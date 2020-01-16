
/********************************************/
// Document Ready
/********************************************/
$(document).ready(function(){
	
	// HTML5 equivalent for browsers that don't recognize the 'placeholder' element
	if((!Modernizr.input.placeholder) || $.browser.opera){
	
		$('[placeholder]').focus(function() {
		  var input = $(this);
		  if (input.val() == input.attr('placeholder')) {
			input.val('');
			input.removeClass('placeholder');
		  }
		}).blur(function() {
		  var input = $(this);
		  if (input.val() == '' || input.val() == input.attr('placeholder')) {
			input.addClass('placeholder');
			input.val(input.attr('placeholder'));
		  }
		}).blur();
		$('[placeholder]').parents('form').submit(function() {
		  $(this).find('[placeholder]').each(function() {
			var input = $(this);
			if (input.val() == input.attr('placeholder')) {
			  input.val('');
			}
		  })
		});	
	}
	
	// Equalize footer columns
	$.fn.equalizeHeights = function(){
		return this.height(
			Math.max.apply(this,
				$(this).map(function(i,e){
					return $(e).height()
				}).get()
			)
		)};		
	$(".product-list-li").equalizeHeights();
	$(".equal").equalizeHeights();
	
	// Tabs - Product details
	$(".product-content").hide(); 
	$(".products-tabs li:first").addClass("active").show(); 
	$(".product-content:first").show(); 
	
	$(".products-tabs li").click(function() {

		$(".products-tabs li").removeClass("active"); 
		$(this).addClass("active"); 
		$(".product-content").hide(); 

		var activeTab = $(this).find("a").attr("href"); 
		$(activeTab).fadeIn(); 
		return false;
	});
	
	// Remove borders
	$('.product-list-li:first, .product-list-li:eq(1)').addClass('first');
	$('.products-tabs li:last, .footer-quick-links li:last, .ultraNav li:last').addClass('last');
	
	// Primary navigation menus
	function megaHoverOver(){
		$(this).find(".sub").stop().fadeTo('fast', 1).show();
	}
	//On Hover Out
	function megaHoverOut(){
		$(this).find(".sub").stop().fadeTo('fast', 0, function() { 
		  $(this).hide(); 
		});
	}	
	
	//Set custom configurations
	var config = {
		 sensitivity: 2, // number = sensitivity threshold (must be 1 or higher)
		 interval: 100, // number = milliseconds for onMouseOver polling interval
		 over: megaHoverOver, // function = onMouseOver callback (REQUIRED)
		 timeout: 450, // number = milliseconds delay before onMouseOut
		 out: megaHoverOut // function = onMouseOut callback (REQUIRED)
	};
	
	$(".sub").css({'opacity':'0'});
	$(".primaryNav li").hoverIntent(config);
	
	// Secondary navigation menus
	function secondaryHoverOver(){
		$(this).find(".subSecond").stop().fadeTo('fast', 1).show();
	}
	
	//On Hover Out
	function secondaryHoverOut(){
		$(this).find(".subSecond").stop().fadeTo('fast', 0, function() { 
		  $(this).hide(); 
		});
	}	
	
	//Set custom configurations
	var config = {
		 sensitivity: 2, // number = sensitivity threshold (must be 1 or higher)
		 interval: 100, // number = milliseconds for onMouseOver polling interval
		 over: secondaryHoverOver, // function = onMouseOver callback (REQUIRED)
		 timeout: 200, // number = milliseconds delay before onMouseOut
		 out: secondaryHoverOut // function = onMouseOut callback (REQUIRED)
	};
	
	$(".subSecond").css({'opacity':'0'});
	$(".sub-first li").hoverIntent(config); 
	
});

/********************************************/
// Window Load
/********************************************/
$(window).load(function() {
			
	// Slider
	$('.flexslider').flexslider();
	
	// Product Slider
	$('#es-carousel').elastislide({
		imageW 	: 177,
		minItems : 5,
		margin : 8
	});
	
	// Homepage Slider
	$('#es-carousel2').elastislide({
		imageW 	: 775,
		minItems : 1,
		margin : 0
	});
	
	// Colorbox
	$(".video-popup").colorbox({opacity:0.75});
	
});	
