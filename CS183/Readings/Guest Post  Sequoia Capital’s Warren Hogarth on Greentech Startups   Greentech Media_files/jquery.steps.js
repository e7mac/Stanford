/**
 * 'Steps' plugin.
 *
 * @author          Stephen Lewis
 * @package         jquery.steps.js
 * @version         0.1.0
 */

(function($) {

    // Plugin definition.
    $.fn.steps = function(options) {
        var opts = $.extend({}, $.fn.steps.defaults, options);

        return this.each(function() {
            // Hide all but the first step.
            $container = $(this);
            $container.find('.' + opts.stepClass).first().show();
            $container.find('.' + opts.stepClass).slice(1).hide();

            // Hijack the step links.
            $container.find('.' + opts.linkClass).click(function(event) {
                event.preventDefault();

                $link   = $(this);
                $target = $($link.attr('href'), $container).filter('.' + opts.stepClass);

                if ($target.length !== 1) {
                    return false;
                }

                // Pre-transition event. Only checks return value from last listener at present.
                if ($link.triggerHandler('preStep', [{'stepsContainer' : $container, 'targetStep' : $target}]) === false) {
                    return false;
                }

                // Transition to the new step.
                $container.find('.' + opts.stepClass).fadeOut('fast', function() {
                    // Target gets reset when triggerHandler is called, for some unknown reason.
                    $target = $($link.attr('href'), $container).filter('.' + opts.stepClass);
                    $target.fadeIn('slow', function() {
                        // Post-transition event.
                        $link.triggerHandler('postStep', [{'stepsContainer' : $container, 'targetStep' : $target}]);
                    });
                });
            });
        });
    }

    // Plugin defaults.
    $.fn.steps.defaults = {
        'linkClass'         : 'step_link',
        'stepClass'         : 'step'
    };

})(jQuery);

/* End of file      : jquery.steps.js */
