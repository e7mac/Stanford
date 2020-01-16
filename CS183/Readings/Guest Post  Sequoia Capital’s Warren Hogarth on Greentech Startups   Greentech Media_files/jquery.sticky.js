/*
* jQuery Sticky is in ALPHA, version 0.2
* https://github.com/jordancooperman/sticky
*
* author: Jordan Cooperman
* email: jordancooperman@gmail.com
* twitter: @jordancooperman
*
* Copyright 2011, Jordan Cooperman
* Free to use under the MIT license.
* http://www.opensource.org/licenses/mit-license.php
*
*/

(function( $ ){

    var
    defaults = {
        absolute: false,
        anchored: false,
        anchoredTo: '.sticky-blockade',
        inFlow: true,
        fullWidth: false,
        delay: 10,
        setHeight: false,
        stickyCss: {
            top: 0,
            position: "fixed",
            bottom: 'auto',
            zIndex: 1000
        },
        unstickyCss: {
            position: "static"
        }
    },

    // keeps track of the height
    // of all sticky elements on the page
    stickiesHeight = 0,

    // cached values
    sticky = 'sticky',
    prefix = 'sticky',
    div = 'div';


    /////////////////////////////////

    // HELPER METHODS

    //////////////////////////////////

    // convience function for creating new jQuery objects
    // adapted from jquery.colorbox.js, jack@colorpowered.com
    function $tag( tag, id, css ) {
        var element = document.createElement(tag);

        if (id) {
            element.id = prefix + id;
        }

        if (css) {
            $(element).css(css);
        }

        return $(element);
    }

    // convenience function for wrapping elements
    function wrapElement( element, css ) {
        var $wrapper = $tag(div, '-wrapper', css);

        $(element).before($wrapper);
        $(element).appendTo($wrapper);
    }

    // the main update function 
    function update() {

        var
        $this = $(this),
        $wrapper = $this.parent(),
        data = $.data(this, sticky),
        settings = data._settings,
        didScroll = false;

        // avoid attaching events directly to the window
        $(window).scroll(function() {
            didScroll = true;
        });

        checkConditions();

        setInterval(function() {
            if ( didScroll) {
                didScroll = false;

                checkConditions();
            }

        }, settings.delay);

        function checkConditions() {

            // if a sticky element in the flow changes size
            // recalculate the offset of absolutely positioned sticky elements
            if ( $wrapper.offset().top != data._offset ) {
                data._offset = $wrapper.offset().top;
            }

            // if we scroll to the topCatch of our sticky elements
            if ( data._offset - data.topCatch - settings.stickyCss.top <= $(document).scrollTop() ) {
                $this.css( settings.stickyCss ).css( 'top', data.topCatch + settings.stickyCss.top );

                if ( settings.fullWidth === true ) {
                    $this.css( "width", "100%" );
                }

                if ( settings.anchored === true && $this.height() + settings.stickyCss.top + data.topCatch + $(document).scrollTop() >= $(settings.anchoredTo).offset().top ) {
                    $this.addClass('anchored');
                    $wrapper.css({
                        height: "100%"
                    });

                    $this.css(settings.unstickyCss);
                    $this.css({
                        position: "absolute",
                        bottom: 30,
                        top: "auto",
                        zIndex: 999
                    });

                } else if (settings.anchored === true && $this.hasClass('anchored')) {
                    $this.removeClass('anchored');
                    $this.css(settings.stickyCss).css( 'top', data.topCatch + settings.stickyCss.top );
                    $wrapper.css({
                        height: "auto"
                    });

                }

            } else {
                $this.css( settings.unstickyCss );
            }
        }
    }

    /////////////////////////////////

    // PUBLIC METHODS

    //////////////////////////////////


    var methods = {

        init: function( options ) {

            var settings = $.extend( true, {}, defaults, options );

            return this.each(function(i) {

                var
                $this = $(this),
                data = $.data(this, sticky, {
                _settings: settings,    
                _offset: $this.offset().top,
                _height: $this.height(),
                _width: $this.width(),
                topCatch: 0
                });

                // if the plugin has not been initializated
                if ( ! data ) {

                    $this.data(this, sticky, {
                        target : $this,
                        sticky : sticky,
                        settings : settings
                    });
                }

                // set where our sticky elements will catch
                data.topCatch = stickiesHeight;
                stickiesHeight += settings.setHeight != false ? settings.setHeight : data._height;

                // add wrapper with the height of our element
                // to prevent the page from jumping when we
                // fix the element's position
                if ( settings.inFlow === true ) {
                    wrapElement( this, {
                        height: data._height
                    });

                // add wrapper with same top position of our element
                // to keep a reference to the top offset
                } else if ( settings.absolute === true ) {
                    wrapElement( this, {
                    position: "absolute",
                    top: $this.css('top')
                    });
                    
                    $this.css('top', '0');
                }

                update.apply( this );
            });
        }
    };

    $.fn.sticky = function( method ) {

        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
        return $.error( 'Method ' + method + ' does not exist on jQuery.sticky' );
        }
    };

})(jQuery);
