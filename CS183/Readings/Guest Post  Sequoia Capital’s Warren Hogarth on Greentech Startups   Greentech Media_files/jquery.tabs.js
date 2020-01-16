(function($) {
    
    var 
    defaults = {
                
    },
    settings;

    var methods = {
        
        init: function( options ) {

            settings = $.extend( true, {}, defaults, options );
            
            return this.each(function() {
                var 
                $this = $(this),
                $content = $this.siblings();

                $content.hide();

                if ($content.filter(".default-tab").length) {
                    $content.filter(".default-tab").show();
                } else {
                    $content.filter(':first').show();
                }

                $this.find('a').click(function(e) {
                    e.preventDefault();
                    hash = this.hash,
                    $a = $(this);


                    $this.find('a').removeClass('active');
                    $a.addClass('active');

                    $content.hide();
                    $content.filter(hash).show();
                });
            });
        }
    };

    $.fn.tabs = function( method ) {
        
        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            return $.error( 'Method ' + method + ' does not exist on jQuery.tabs' );
        }
    };
})(jQuery);