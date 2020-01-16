
(function( $ ){

    var
    defaults = {
        visibleItems: 1,
        easing: 'linear',
        speed: 150,
        prev: '.prev',
        next: '.next',
        firstAfterEnd: false
    };

    /////////////////////////////////

    // PUBLIC METHODS

    //////////////////////////////////


    var methods = {

        init: function( options ) {

            var settings = $.extend( true, {}, defaults, options );

            return this.each(function(i) {
                var
                // jQuery objects
                $wrapper = $(this),
                $list = $(this).find('ul').filter(':first'),
                $listItem = $list.children('li'),

                listHeight = $list.height();
                listItemHeight = $listItem.height(),

                listItemCount = $listItem.length,
                listPosition = 0,
                listMoved = false,
                fromTop = 0,
                isAnimated = false,
                didResize = false,
                self = false;

                $wrapper.css('overflow', 'hidden');

                $wrapper.delegate(settings.prev, 'click', function(e) {
                    e.preventDefault();

                    if (isAnimated == false) {
                        listMoved = moveList.call(this, 1);
                    }
                });

                $wrapper.delegate(settings.next, 'click', function(e) {
                    e.preventDefault();

                    if (isAnimated == false) {
                        listMoved = moveList.call(this, -1);
                    }

                });

                $wrapper.on('moveUp', function() {
                    moveList(1);
                });

                $wrapper.on('moveDown', function() {
                    moveList(-1);
                });

                function moveList( binaryDirection ) {

                    listHeight = $list.height(); // in case the browser window has shrunk our scroller, and the list became taller
                    self = this;

                    // 1 moves the list up
                    if (binaryDirection == 1) {
                        if (listPosition == 0) {
                            return false;
                        }
                        listPosition--;
                    }
                    // -1 moves the list down
                    else {
                        if ( fromTop >= listHeight - listItemHeight * settings.visibleItems) {
                            if (settings.firstAfterEnd) {
                                isAnimated = true; // prevent us from animating while in an animation
                                $list.animate(
                                    { marginTop: 0 },
                                    { easing: settings.easing, duration: settings.speed, complete: function() {
                                        isAnimated = false; 
                                        checkListState.call(self); // for classing next and previous links
                                    }
                                });
                                listPosition = 0;
                                return true;   
                            } else {
                                return false;
                            }
                        }
                        listPosition++;
                    }
                    isAnimated = true; // prevent us from animating while in an animation
                    $list.animate(
                        { marginTop: '+=' + binaryDirection * listItemHeight },
                        { easing: settings.easing, duration: settings.speed, complete: function() {
                            isAnimated = false; 
                            checkListState.call(self); // for classing next and previous links
                        }
                    });
                    return true;
                }

                function checkListState() {
                    fromTop = parseInt($list.css('marginTop')) * -1;
                    // if a click resulted in action
                    if (listMoved == true) {
                        // ... and we're at the top or bottom of the list
                        if (fromTop >= listHeight - listItemHeight * settings.visibleItems || fromTop == 0) {
                            $(this).addClass('s-disabled')
                        }
                        else {
                           $(settings.next).removeClass('s-disabled');
                           $(settings.prev).removeClass('s-disabled');
                        }
                    }
                }
            });
        }
    };

    $.fn.scroller = function( method ) {

        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
        return $.error( 'Method ' + method + ' does not exist on jQuery.scroller' );
        }
    };

})(jQuery);
