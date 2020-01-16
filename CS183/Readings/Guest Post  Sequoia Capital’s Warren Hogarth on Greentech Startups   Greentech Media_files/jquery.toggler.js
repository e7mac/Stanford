$.fn.toggler = function( options ) {

    var defaults = {
        toggleEvent: 'click',
        delay: 250,
        forceClose: true,
        startClosed: false
    },
    settings = $.extend( defaults, options );

    return this.each(function() {
        var $this = $(this);

        $this
            .addClass('toggler')
            .siblings()
            .addClass('toggle-content');
        if (settings.startClosed == false) {
            if ($this.siblings().is(':visible')) {
                $this
                    .addClass('active')
                    .siblings()
                    .addClass('toggle-open');
            }
            else {
                $this
                    .removeClass('active')
                    .siblings()
            }
        }

        $this.bind(settings.toggleEvent, function(e) {
            e.preventDefault();

            if (settings.forceClose == true) {

                if ( $this.siblings().hasClass('toggle-open') ) {
                    $this
                        .removeClass('active')
                        .siblings()
                        .slideUp(settings.delay, function() {
                            $(this).toggleClass('toggle-open')
                        });
                }

                else {

                    $('.toggle-content')
                        .slideUp(settings.delay, function(){
                            $(this).removeClass('toggle-open')
                        })
                        .siblings('.toggler')
                        .removeClass('active');


                    $this
                        .addClass('active')
                        .siblings()
                        .slideDown(settings.delay, function() {
                            $(this).toggleClass('toggle-open')
                        });

                }
            }

            else {
                $this.toggleClass('active');
                $this.siblings().slideToggle().toggleClass('toggle-open');
            }
        });
    });
}
