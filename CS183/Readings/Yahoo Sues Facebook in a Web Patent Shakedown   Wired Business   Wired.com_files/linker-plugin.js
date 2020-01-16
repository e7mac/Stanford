/**
 * Contextly plugin js for make see See Also links.
 */
var contextly_site_url = "https://contextly.com/sites/";
var contextly_site_api_url = "http://api.contextly.com/sites/api-plugin.php";

var contextly_site_key = false;
var contextly_page_snippet_id = false;
var contextly_page_site_url = false;
var contextly_registration_url = false;

var contextly_window_name = "mainapp";
var contextly_window_params = "width=1150,height=600,resizable=1,scrollbars=1,menubar=1";
var contextly_window_provider_param = "#easyXDM_linker_channel_provider";

var contextly_tinymce_selected_text = false;
var contextly_tinymce_editor = null;

/**
 * Call contextly plugin ajax function and return response in callback function.
 * 
 * @param {string} method name of api call.
 * @param {function} callback_function function with reponse of api call.
 */
function contextly_plugin_ajax(method, params, callback_function) {
	var data = false;
	
	if (jQuery.fn.jquery < "1.4") {
		data = {
			method: method,
			params: JSON.stringify(params)
		};
	} else {
		data = {
			method: method,
			params: params
		};
	}
	
	jQuery.ajax(
	{
		url: contextly_site_api_url,
		method: "post",
		data: data,
		dataType: "jsonp",
		success: callback_function
	});
}

/**
 * Main method for display contextly window for make see also.
 */
function contextly_create_see_also() {
	if (contextly_registration_url) {
		window.open(contextly_registration_url); return;
	} else if (contextly_page_site_url) {
		var win = window.open(
	    	contextly_page_site_url + 
	    		"?site_key=" + contextly_site_key + 
	    		"&page_id=" + contextly_post_object.post.ID +
	    		"&edit_snippet_id=" + contextly_page_snippet_id +	
	    		contextly_window_provider_param,
	    	contextly_window_name, 
	    	contextly_window_params
	    );
		
		var proxy = new easyXDM.Socket(
			{
				onMessage: function(data, origin) {
					contextly_display_links(data);
				},
				channel: "linker_channel",
				remote: contextly_site_url + "../resources/html/remote.html"
			}
		);
	}
}

/**
 * Display links action for refresh links on page.
 * @param array data reponse data.
 */
function contextly_display_links(data) {
	if (data) {
		var json = eval("(" + data + ")");
		if (json.status == "ok") {
			contextly_load_page_links();
		}
	}
}

/**
 * Load page links.
 */
function contextly_load_page_links() {
	contextly_post_object.post.post_content = false;
	contextly_plugin_ajax(
		"init",
		{
			post: contextly_post_object
		},
		function (response) {
			if (response.status == "ok") {
				if (response.msg) {
					// Display response message
					jQuery("#linker_widget").html(response.msg);
					contextly_registration_url = response.registration_url;
				} else {
					// All fine and we can display response
					if (response.links_html) {
						contextly_page_snippet_id = response.site_snippet_id;
						contextly_page_site_url = response.site_linker_url;
						contextly_site_key = response.site_key;
						
						jQuery("#linker_widget").html(response.links_html);
						
						// We need to be sure that our control is last in content element
						if (!jQuery("#linker_widget").is(":last-child")) {
							jQuery("#linker_widget").parent().append(jQuery("#linker_widget"));
						} 
						
						// Check for a custom position on page
						if (typeof contextly_settings != "undefined" && typeof contextly_settings.target_id != "undefined" && contextly_settings.target_id) {
							if (typeof contextly_settings.block_position != "undefined" && contextly_settings.block_position == "before") {
								jQuery("#linker_widget").insertBefore(jQuery("#" + contextly_settings.target_id));
							} else {
								jQuery("#linker_widget").insertAfter(jQuery("#" + contextly_settings.target_id));
							}
						}
						
						// Load needed css template for plugin
						if (response.site_css_url) {
							contextly_load_css(response.site_css_url);
						}
						
						// Add custom css code if needed
						if (response.site_custom_css_code) {
							jQuery("head").append(jQuery("<style type='text/css'>" + response.site_custom_css_code + "</style>"));
						}
						
						// Add css fixes for old IE browsers 
						if (typeof response.ie_css_url != "undefined" && response.ie_css_url) {
							contextly_load_css(response.ie_css_url);
						}
					}
					contextly_registration_url = false;
				}
			} else {
				jQuery("#linker_widget").html("");
			}
		}
	);
}

function contextly_load_css(css_url) {
	jQuery("head").append("<link>");
	var css_node = jQuery("head").children(":last");
    css_node.attr({
		rel:  "stylesheet",
		media: "screen",
		type: "text/css",
		href: css_url
    });
}

/**
 * Helper function for display tabs in tab style plugin. 
 */
function currentlinkerover(type) {
	var yscroll = contextly_get_page_scroll();
	jQuery("#linker_content_recent,#linker_content_local,#linker_content_previous,#linker_content_web,#linker_content_interesting").hide();
	jQuery("#linker_tab_recent,#linker_tab_local,#linker_tab_previous,#linker_tab_web,#linker_tab_interesting").attr("class", "");
	jQuery("#linker_content_" + type).show();
	jQuery("#linker_tab_" + type).attr("class", "active");
	window.scroll(0, yscroll);
}

/**
 * Helper function to toggle more links
 */
function ctxmore(type) {
	jQuery('.li'+type).toggleClass("show");
	var pmore = jQuery('#pmore'+type);
	pmore.toggleClass("show");
	if(pmore.hasClass('show')) {
		pmore.find('a').text('Show Less');
	} else {
		pmore.find('a').text('Show More');
	}
}
 
 
/**
 * Get page scroll position.
 */
function contextly_get_page_scroll() {
	var yScroll = 0;
	if (self.pageYOffset) {
		yScroll = self.pageYOffset;
	} else if (document.documentElement && document.documentElement.scrollTop) {
		yScroll = document.documentElement.scrollTop;
	} else if (document.body) {
		yScroll = document.body.scrollTop;
	}
	return yScroll;
}

/**
 * Create contextly tinymce link.
 */
function contextly_linker_timymce_link() {
	if (contextly_registration_url) {
		window.open(contextly_registration_url); return;
	} else if (contextly_page_site_url) {
		var win, proxy;
		win = window.open(
	    	contextly_page_site_url + 
	    		"?site_key=" + contextly_site_key + 
	    		"&page_id=" + contextly_post_object.post.ID +
	    		"&tinymce_link_text=" + contextly_tinymce_selected_text +
	    		"&edit_snippet_id=" + contextly_page_snippet_id +
	    		contextly_window_provider_param,
	    	contextly_window_name, 
	    	contextly_window_params
	    );
		
		proxy = new easyXDM.Socket(
			{
				onMessage: function(data, origin) {
					contextly_display_links(data);
					contextly_create_linker_timymce_link(data);
				},
				channel: "linker_channel",
				remote: contextly_site_url + "../resources/html/remote.html"
			}
		);
	}
}

/**
 * Response method for insert contextly link data into editor. 
 */
function contextly_create_linker_timymce_link(data) {
	if (data) {
		var json = eval("(" + data + ")");
		if (json.status == "ok") {
			var ed = contextly_tinymce_editor;
			var attrs = {
					href : json.link_url,
					title : json.link_title
				}, e;
			e = ed.dom.getParent(ed.selection.getNode(), 'A');
			if ( ! attrs.href || attrs.href == 'http://' ) return;
			if (e == null) {
				ed.getDoc().execCommand("unlink", false, null);
				ed.getDoc().execCommand("CreateLink", false, "#mce_temp_url#", {skip_undo : 1});
				tinymce.each(ed.dom.select("a"), function(n) {
					if (ed.dom.getAttrib(n, 'href') == '#mce_temp_url#') {
						e = n;
						ed.dom.setAttribs(e, attrs);
					}
				});
				if ( jQuery(e).text() == '#mce_temp_url#' ) {
					ed.dom.remove(e);
					e = null;
				}
			} else {
				ed.dom.setAttribs(e, attrs);
			}
			if ( e && (e.childNodes.length != 1 || e.firstChild.nodeName != 'IMG') ) {
				ed.focus();
				ed.selection.select(e);
				ed.selection.collapse(0);
			}
		} else if (json.status == "error") {
			alert(json.message);
		}
	}
}

var contextly_jquery_flag = false;
function contextly_init_jquery() {
    if (typeof(jQuery) == 'undefined') {
        if (!contextly_jquery_flag) {
            contextly_jquery_flag = true;
            
            var script = document.createElement('script');
  			script.setAttribute("type","text/javascript");
  			script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  			if (typeof script!="undefined")
  				document.getElementsByTagName("head")[0].appendChild(script)
  				
        }
        setTimeout("contextly_init_jquery()", 50);
    } else {
        jQuery(function() {  
            contextly_load_page_links();
        });
    }
}

contextly_init_jquery();
