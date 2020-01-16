jQuery(document).ready(function(){
    jQuery('#submit-signup-email').click(function(){
        jQuery('#submission-msg').html('');
    });

    jQuery('#signup-email').click(function() {
        jQuery('#submission-msg').html('');
    });

    jQuery('#signup-email').bind('focus', function() {
        // Only clear the field if it's the test message
        if (jQuery('#signup-email').attr('value') == 'email address') {
            jQuery('#signup-email').attr('value', '');
        }
    });

    jQuery("#signup-email-form").validate({
        debug: false,
        rules: {
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            email: "Email address seems invalid. Please try again."
        },
        submitHandler: function(form) {
            // Uses localized variable found in functions.php: WP_VARS.THEME_URI
            // Submits to an action created by the widget
            jQuery.post(
                WP_VARS.ajaxurl,
                jQuery("#signup-email-form").serialize(),
                function(data) {
                    jQuery('#submission-msg').html('You&#8217;ll be the first to know when our community is live. Thanks!');
                });
            }
    });
});