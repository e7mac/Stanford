/*
    Global blogs js for headers and footers.
*/
/* Mobify *********************************************************************/
    var _mm = "http://m.wired.com/";
    if ( document.domain.indexOf("wired.com") >= 0 ) {
        var m = document.createElement('script');
            m.type = 'text/javascript';
            m.async = true;
            m.src = 'http' + (document.location.protocol[4] == 's' ? 's' : '') + '://m.wired.com/mobify/redirect.js';
        var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(m, s);
    }

jQuery(function(){

/* Top Nav ********************************************************************/

    // Mouseovers
    jQuery('#pnav_list a.primaryLink').bind('mouseover', function() {
        jQuery(this).addClass('over');
    }).bind('mouseout', function() {
        jQuery(this).removeClass('over');
    });

    // Dropdowns for the top nav
    jQuery('#pnav_list a.primaryLink').bind('mouseenter', function() {
        // hide all the menus that may be showing already
        jQuery('.dropdownMenu').hide();
        jQuery(this).parentsUntil('#pnav_list').find('.dropdownMenu').show();
        jQuery(this).addClass('over');
    });

    // Actions on leaving the dropdown
    jQuery('#pnav_list li .dropdownMenu').bind('mouseleave', function() {
        jQuery(this).delay(500).fadeOut(200);
        jQuery(this).parentsUntil('#pnav_list').find('a.primaryLink').removeClass('over');
    });

    // Close button on subscribe
    jQuery('#gh_close_sub_flyout').bind('click', function() {
        jQuery('.dropdownMenu').fadeOut(200);
    });

/* Footer ********************************************************************/

    // Select links
    jQuery('#footer_dropdowns_subscribe, #footer_dropdowns_sites, #footer_dropdowns_international').bind('change', function() {
        window.open(jQuery(this).val());
    });

    // Text Size Widgets
    jQuery('#footer a#small').bind('click', function(){
        setActiveStyleSheet('small');
        return false;
    });
    jQuery('#footer a#normal').bind('click', function(){
        setActiveStyleSheet('normal');
        return false;
    });
    jQuery('#footer a#large').bind('click', function(){
        setActiveStyleSheet('large');
        return false;
    });
    jQuery('#footer a#largest').bind('click', function(){
        setActiveStyleSheet('largest');
        return false;
    });

/* Sign In/Sign Out ***********************************************************/

    // Check if the user is logged in
    var username_string = CN.cookie.get('amg_user_info');
    if (username_string !== '') {
        jQuery('#gh_greeting').html('<span class="gh_username">Hi, ' + username_string + '&nbsp;|&nbsp;</span><a href="/user/logout">Sign Out</a>&nbsp;|');
    } else {
        jQuery('#gh_greeting').html('<a href="/user/login">Sign In</a>&nbsp;|');
    }

});

/* Text size widget */
function setActiveStyleSheet(title) {
    var i, a, main;
    for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
        if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
            a.disabled = true;
            if(a.getAttribute("title") == title) a.disabled = false;
        }
    }
}

function getActiveStyleSheet() {
    var i, a;
    for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
        if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title") && !a.disabled) return a.getAttribute("title");
    }
    return null;
}

function getPreferredStyleSheet() {
    var i, a;
    for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
        if(a.getAttribute("rel").indexOf("style") != -1
            && a.getAttribute("rel").indexOf("alt") == -1
            && a.getAttribute("title")) {
            return a.getAttribute("title");
        }
    }
    return null;
}

// Initialize the footer
var textPref = CN.cookie.get("style");
var ActiveStyleSheetTitle = textPref ? textPref : getPreferredStyleSheet();
setActiveStyleSheet(ActiveStyleSheetTitle);

/* Reviews */
function resizeImage(img,new_width,new_height) {
    if(img.width == new_width && img.height == new_height){
        img.className = "prod_review_img_on";
        return
    }
    else {
        if (jQuery(img).height() > jQuery(img).width()) {
            var h = new_height;
            var w = Math.ceil($(img).width() / jQuery(img).height() * new_height);
        } else {
            var w = new_width;
            var h = Math.ceil(jQuery(img).height() / jQuery(img).width() * new_width);
        }
        jQuery(img).css({ height: h, width: w });
        img.className = "prod_review_img_offset";
    }
}
