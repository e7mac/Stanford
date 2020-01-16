function Carousel(selector) {

    // ensure that the only way to get back an instance is using new
    if (! (this instanceof arguments.callee)) {
        return new arguments.callee(arguments);
    }

    var carouselArray = [],
        carousel = selector,
        $carouselHeader = $(carousel).siblings('.carousel-header'),
        $slider = $(carousel).children('.slider'),
        $carouselItem = $(selector).find('li'),
        $indicator = $('.indicator'),
        fromTop = $slider.offset().top,
        $link,
        toMove,
        titleText,
        href;

    this.init = function() {
        // add each carousel list item into our array
        $.each($carouselItem, function(i) {
           carouselArray[i] = {
               // ...and save a reference to its DOM element and width
               element: this,
               width: $(this).width()
           };
        });
    }

    this.scroll = function() {
        $link = $(carouselArray[2].element).find('a'),
        titleText = $link.attr('title'),
        href = $link.attr('href'),
        toMove = carouselArray[0].width*-1;

        // do nothing with the carousel if we can't see it
        if ($(document).scrollTop() >= fromTop) {
            return;
        }
        // otherwise, let 'er loose!
        else {
            $(carouselArray[1].element)
                .removeClass('active')
                .find('.overlay')
                .fadeIn();

            if ($carouselHeader.length) {
                $carouselHeader.find('h1').html(titleText).parent('a').attr('href', href);
            }

            $(carouselArray[0].element).animate(
                { marginLeft: toMove },
                { duration: 450, complete: this.reorder }
            );

            $(carouselArray[2].element)
                .addClass('active')
                .find('.overlay')
                .fadeOut();
        }
    }

    this.reorder = function() {
        $(carouselArray[0].element).css("margin", "");

        // append element to the end of carousel
        $slider.append($(carouselArray[0].element));

        // ...and append it to the end of the array
        carouselArray[carouselArray.length] = (carouselArray[0]);

        // remove the appended object from our array
        carouselArray.shift();
    }

    this.init();

}
