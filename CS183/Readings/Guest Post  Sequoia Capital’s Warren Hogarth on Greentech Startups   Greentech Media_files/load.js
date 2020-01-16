Modernizr.load([
	{
		load: '//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js',
		complete: function () {
			if ( !window.jQuery ) {
				Modernizr.load('/assets/js/jquery-1.7.1.min.js');
			}
		}
	},
	{
		//jQuery plugins
		load: [ 
			'/assets/js/jquery.sticky.js',
			'/assets/js/jquery.tabs.js',
			'/assets/js/jquery.scroller.js',
			'/assets/js/jquery.toggler.js',
			'/assets/js/jquery.scrollTo.js',
			'/assets/js/jquery.serialScroll.js',
			'/assets/js/jquery.steps.js',
			'/assets/js/jquery.carouFredSel-5.5.0-packed.js',
			'/assets/js/jquery.validate.min.js',
			'/assets/js/forms.js',
			'/assets/js/carousel.js',
			'/assets/js/social.js'
		]
	},
	{
		test: Modernizr.input.placeholder,
		nope: '/assets/js/placeholder.js'  
	},
	{
		test: window.location.pathname.indexOf("/checkout") != -1,
		yep: ['/assets/js/jquery.gtm_utils.js', '/assets/js/checkout.js']
	},
	'/assets/js/init.js?v.1331929167'
]);
