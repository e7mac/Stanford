//jQuery(function(){

    // Next/Previous post links open on scroll
    jQuery(window).scroll( function(event) {
        var scrollPosition = jQuery(window).scrollTop();
        //var winHeight = jQuery(document).height();
        var articleHeight = jQuery('div.entry').height();
        var articleOffset = jQuery('div.entry').offset();
        var scrollTrigger = articleOffset.top + articleHeight/3;

        if ( scrollPosition > scrollTrigger ) {
            jQuery('#post_nav').css('visibility','visible');
        } else {
            jQuery('#post_nav').css('visibility','hidden');
        }
    });

    // Sections dropdown
    jQuery('#entrySections .button a').click(function() {
        jQuery('#entrySectionsMask').toggleClass('open');
        return false;
    });

    jQuery('body.archive #entrySections li:nth-child(2) a').click(function() {
        return false;
    });

//});
