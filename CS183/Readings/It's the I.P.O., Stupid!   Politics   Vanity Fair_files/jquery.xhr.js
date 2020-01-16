/**
 * jQuery.XHR
 * Copyright (c) 2008 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 8/7/2008
 *
 * @projectDescription Registry of XHR implementations
 *
 * @author Ariel Flesler
 * @version 1.0.0
 */
;(function( $ ){
	
	var as = $.ajaxSettings;
	
	$.xhr = {
		registry: {
			xhr: as.xhr	
		},
		register:function( name, fn ){
			this.registry[name] = fn;
		}
	};
	
	// The built-in method is used by default
	// To set another one as default, use $.ajaxSetup({ transport:'my_xhr' })
	as.transport = 'xhr';
	
	// This handler is used instead, don't override it
	as.xhr = function(){
		return $.xhr.registry[ this.transport ]( this );
	};
	
})( dmJQuery );