(function($) {
  $.fn.fullSlider = function() {
    let itemSliders = $(this).find('.itemSlid');
    let fullW = $(this).width();
    let itemWidth = $(this).width() / itemSliders.length;

    let setWidth = () => {
      itemSliders.each(function() {
        $(this).css('width', itemWidth);

        let pictFull = $(this).find('img');
        let pictFullW = $(pictFull).width();
        pictFullW =  - ((pictFullW - itemWidth) / 2);
        $(pictFull).css('marginLeft', pictFullW);
      });
    }

    setWidth();

    $(itemSliders)
      .on( "mouseenter", function() {
        let pictFull = $(this).find('img');
        let pictFullW = $(pictFull).width();
        let newWidth = (fullW - pictFullW) / (itemSliders.length - 1);
        $(itemSliders).width(newWidth);
        $(this).css('width', pictFullW);
        $(pictFull).css('marginLeft', 0);
      })
      .on( "mouseleave", function() {
        setWidth();
      });
  };
})(jQuery);
