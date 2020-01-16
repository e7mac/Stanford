$(function() {

	// loading div for ajax calls
	$loading = $('<div class="loading"></div>').css({ position: "absolute", top: '0', bottom: '0', left: '0', right: '0' });

	//
	// Activate jQuery plugins
	//

	// initialize sticky elements
	$('#main-nav-wrapper').sticky({
		fullWidth : true,
		setHeight : 90
	});

	$('#sticky-sidebar-wrapper').sticky({
		anchored : true,
		inFlow : false,
		absolute: true,
		stickyCss: {
			top: 10
		}
	});

	// Email this link
	$('#sticky-sidebar-wrapper').find('a.email, a.envelope-white').attr('href', 'mailto:?subject=' + document.title + '&body=' + window.location.href);

	// initialize tabs
	$('.tabs').tabs();

	if ($('.toggler').length) {
		$('.toggler').toggler({
			delay: 320
		});
	}


	if ($("body.checkout").length) {
		$('.cta_fallback a').click(function(e) {
			e.preventDefault();

			$(this).closest('form').fadeOut('fast', function() {
				$('#form_find_member').show();
			});
		});

		$('#form_find_member').submit(function(e) {
			e.preventDefault();

			var $form = $(this);
			var username    = $form.find('input[name="username"]').val();
			if (!username) {
				alert("You must enter an email address");
				return;
			};
			var action      = $form.attr('action');

			$.post(action, {username: username}, function(returnData) {
				$form.hide();

				$target = returnData.toLowerCase() == 'y' ? $('#login_form') : $('#register_form');
				$target.find('input[name="username"]').val(username);
				// $target.find('.fld_secondary').fadeIn('slow');
				// $target.find('.attention').fadeIn('slow').slideDown();
				$target.fadeIn();
				// $target.show();
			});
		});
	};

	// Signup steps
	$nl_reg_signup_form = $(".nl_reg_signup form");
	if ($nl_reg_signup_form.length) {

		initCheckoutValidation($nl_reg_signup_form);

		$nl_reg_signup_form.steps();

		// Validate the form before moving to the next step
		$(".step_link").bind('preStep', function(options) {
			if (!$nl_reg_signup_form.valid()) {
				return false;
			}
		});

		$nl_reg_signup_form.find('.step_link').bind('postStep', function(options) {
			visible_id = $nl_reg_signup_form.find(".step:visible").attr("id");
			$(".account-flow ul li").removeClass("active");
			$(".account-flow ul li[rel='" + visible_id + "']").addClass("active");
			
			return true;
		});

		$nl_reg_signup_form.submit(function(e) {
			if (!$(this).find(".form-subscribe .areas_of_interest input[type='checkbox']:checked").length) {
				alert("You must select at least one area of interest.");
				return false;
			};
		});

	};

	function scrollerNavClassing(e, elem, $pane, $items, pos) {

		function disable($obj) {
			$obj.addClass('s-disabled');
		}

		function enable($obj) {
			$obj.removeClass('s-disabled');
		}

		var
		$nav = $(this.navigation),
		$prev = $nav.filter(this.prev),
		$next = $nav.filter(this.next);

		if (pos == 0) {
			disable($prev);
		} else {
			enable($prev);
		}

		if (pos == $items.length - 1) {
			disable($next);
		} else {
			enable($next);
		}
	}

	if ($('#resource_center').length) {
		$scoller_container = $('#resource_center-scroller');
		$scoller_container.find('.scroller ul').carouFredSel(
			{
				direction: "up",
				align: "top",
				circular: false,
				infinite: false,
				width: 300,
				height: 420,
				items: {
					visible: 5,
					width: 300,
					height: 84
				},
				scroll: {
					items: 1,
					duration: 300
				},
				auto: false,
				prev: {
					button: $scoller_container.find('.scroller-navigation .up')
				},
				next: {
					button: $scoller_container.find('.scroller-navigation .down')
				}
			},
			{
				classnames: {
					disabled: "s-disabled"
				}
			}
		);
	}

	$industry_scroller = $('#industry_events-scroller');
	if ($industry_scroller.length) {
		$industry_scroller.find('.scroller ul').carouFredSel(
			{
				direction: "left",
				align: "left",
				circular: false,
				infinite: false,
				width: 913,
				height: 130,
				items: {
					visible: 6,
					width: 156,
					height: 130
				},
				scroll: {
					items: 3,
					duration: 300
				},
				auto: false,
				prev: {
					button: $industry_scroller.find('.scroller-navigation .prev')
				},
				next: {
					button: $industry_scroller.find('.scroller-navigation .next')
				}
			},
			{
				classnames: {
					disabled: "s-disabled"
				}
			}
		);
	}

	if ($("#about-hp-slideshow").length) {
		$("#about-hp-slideshow").carouFredSel({
			direction: "up",
			width: 617,
			height: 385,
			items: {
				visible: 1,
				width: 617,
				height: 385,
				filter: "a"
			},
			scroll: {
				fx: "crossfade",
				pauseOnHover: true
			},
			auto: 5000
		});	
	};

	if ($('#gtm-webinars-scroller').length) {
		$('#gtm-webinars-scroller').find('.scroller').serialScroll({
			items: 'li',
			prev: '.up',
			next: '.down',
			step: 3,
			axis: 'y',
			duration: 300,
			cycle: false,
			navigation: '#gtm-webinars-scroller .scroller-navigation a',
			onBefore: scrollerNavClassing
		})
	}

	if ($('.events').find('.scroller').length) {
		$('#corporate-sponsors-bar').scroller({
			visibleItems: 1,
			next: '.down',
			prev: '.up',
			firstAfterEnd: true
		});
		$("#corporate-sponsors-bar a").each(function() {
			sponsor_height = $(this).height();
			top_padding = ($(this).parent("li").height() - sponsor_height) / 2;
			$(this).find("img").css("padding-top", top_padding);
		});
		var corp_auto_rotate = setInterval(function() {
			$('#corporate-sponsors-bar').trigger("moveDown");
		}, 3500);
		$('#corporate-sponsors-bar .navigator').find(".up, .down").click(function() {
			clearInterval(corp_auto_rotate);
		});
	}

	// show print links if we have JavaScript
	if ($('.print-links,.print-link').length) {
		var forms = new Forms();
		forms.showPrintLinks('.print-links,.print-link');
	}

	// home page carousel
	if ($('.carousel').length > 0 ) {
		var carouselFeatured = new Carousel('.carousel');
		setInterval(function() {
			carouselFeatured.scroll();
		}, 3500);
	}

	// subnavigation logic
	if ($('#main-nav-wrapper').length) {
		expandCollapseSubnav('#main-nav-wrapper');
	}

	$article_research_feature = $('section.content-module.gtm-research .collection.horizontal');
	if ($article_research_feature.length) {
		$features = $article_research_feature.find("li");
		features_max_height = 0;
		$features.each(function() {
			if ($(this).height() > features_max_height) {
				features_max_height = $(this).height();
			};
		});
		$features.css("height", features_max_height + "px");
		$features.find("a").css("height", "100%");
	};

	// Account functions
	$('#pv_toggle_archive').click(function(e) {
		e.preventDefault();
		$('ul#pv_report_list').slideToggle();
	})

	$('#account-my-account form .checkboxes input[type="checkbox"]').change(function() {
		fieldValue  = $(this).is(':checked') ? 'y' : 'n';
		fieldName   = $(this).attr('id');
		$("input[name='" + fieldName + "']").val(fieldValue);
	});

	$('.edit-account').find('a[rel="change_un"], a[rel="change_pw"]').click(function(e) {
		e.preventDefault();
		$(this).slideUp();
		$("#" + $(this).attr('rel')).slideDown();
	});

	function expandCollapseSubnav(navigation) {
		var $navigation = $(navigation),
			$link = $navigation.find('a'),
			position = $link.position().left,
			$subnav,
			subnavHeight,
			$subnavSiblings,
			$visibleSiblings,
			isAnimated = false;


		if ($link.hasClass('hasSubnav')) {

			$navigation.delegate('a.hasSubnav', 'click', function(e) {
				e.preventDefault();

				if (!isAnimated) {
					$subnav = $($(this).data('related-subnav'));
					subnavHeight = $subnav.height();
					$visibleSiblings = $subnav.siblings().filter(":visible");

					$link.removeClass('subnavActive');

					if ($visibleSiblings.length) {
						$(this).addClass('subnavActive');
						isAnimated = true;
						$visibleSiblings.slideUp('fast', onComplete).removeClass('active');
					}

					else if ($subnav.filter(":visible").length) {
						isAnimated = true;
						$('header#global').animate(
							{ marginTop : "-=" + subnavHeight },
							{ easing : 'linear', duration : 'fast', complete: onComplete }
						);
					}

					else {
						$(this).addClass('subnavActive');
						isAnimated = true;
						$('header#global').animate(
							{ marginTop : "+=" + subnavHeight },
							{ easing : 'linear', duration : 'fast', complete: onComplete }
						);
					}
					$subnav.slideToggle('fast').toggleClass('active');
				}
			});
		}

		function onComplete() {
			isAnimated = false;
		}
	}

	ResourceCenterFeature();
	lazyloadSocial();

	function loadSocial( url, permalink, id, $toReplace, title ) {

		if (typeof title == "undefined") {
			title = "";
		};

		$toReplace.fadeOut( 100, function() {
			$toReplace.empty().append($loading);

			$.post(
				url,
				{
					permalink: permalink,
					id: id,
					title: title
				},

				function( data, status ) {

					if ( status == "success" ) {
						$loading.hide();
						$toReplace.append(data).fadeIn();

						setTimeout( function() {
							FB.XFBML.parse(document.getElementById('fb-share-' + id));
							gapi.plusone.go('gplus-share-' + id);
							$('#inshare-' + id).attr("type", "in/share");
							if (typeof IN != "undefined") {
								IN.parse(document.getElementById('linkedin-share-' + id));
							};
						}, 400);
					}
				}
			);
		});
	}

	function lazyloadSocial() {

		if ($('.post-info').find('.social').length) {
			$.each( $('.post-info'), function( i ) {
				var
				$postInfo = $(this),
				id = $(this).parents(".article-headline").data('id'),
				permalink = $(this).parents(".article-headline").data('permalink'),
				title = $(this).parents(".article-headline").data('title'),
				url = '/ajax/article-list-social';

				// this will unbind after the first call
				$postInfo.delegate('.social', 'hover', function(e) {
					$postInfo
						.removeClass( 'not-loaded' )
						.undelegate( 'hover' );

					loadSocial( url, permalink, id, $(this), title );
				});
			});
		}
	}

	function ResourceCenterFeature() {

		settings = {
			parent: '#resource_center',
			list: '.featured-list',
			replace: '.featured-content',
			eventOn: 'li a',
			event: 'click',
			url: '/ajax/resource_center-feature-content/'
		}

		if ( settings.parent ) {
			var
			$links = $(settings.list).find('a'),
			$content;

			$(settings.list).delegate(settings.eventOn, settings.event, function(e) {
				e.preventDefault();

				var
				url = settings.url + $(this).attr('rel'),
				id = $(this).data('id'),
				permalink = $(this).find('a').attr('href');

				if (settings.replaceIndividual) {
					$content = $(this).find(settings.replace)
				}
				else {
					$content = $(settings.replace);
				}

				$links.removeClass('active');
				$(this).addClass('active');
				loadSocial( url, permalink, id, $content );
			})
		}
	}
});

function initCheckoutValidation($form) {
	
	$form.find("#user-basic-info input, #user-basic-info select").not(".ignore").addClass("required");
	$form.validate({
		ignore              : '.ignore',
		errorClass          : 'invalid',
		errorElement        : 'span',
		errorPlacement      : function(error, element) {
			if (!element.is("input[type='password']")) {
				error.appendTo(element.siblings('label'));
			} else {
				error.appendTo(element.parent('div'));
			};
		},
		rules               : {
			password: {
				minlength   : 6,
				required    : true
			},
			password_confirm: {
				minlength   : 6,
				required    : true,
				equalTo     : "#password"
			},
			username        : {
				required    : true,
				email       : true
			},
			email           : {
				required    : true,
				email       : true
			}
		},
		messages            : {
			email           : {
				email       : "Enter a valid email"
			},
			username        : {
				email       : "Enter a valid email"
			}
		},
		focusCleanup        : false,
		onfocusout          : function(element) {$(element).valid();},
		onKeyUp             : true,
		validClass          : 'valid'
	});
};
