(function($) {
  $(document).ready(function() {
    var sliderBox = $('.sliderBox');
    var sliderCont = $('.sliderCont');
    var sliderBoxIns = $('.sliderBoxIns');
    var sliderBoxW = $(sliderBoxIns).width();
    var slidesCount = $('.slideItem').length;
    var slideW = sliderBoxW/3;
    var startL = 0;
    $('.slideItem').css('width', slideW);
    $(sliderBoxIns).css('height', $('.slideItem').height());

    sliderCont.css('width',(slideW*slidesCount));
    if (sliderCont.width() > $(sliderBox).width()) {
      $('.arrw.rightArrw').css('display','block');
    }


    $('.arrw.rightArrw').click(function(){
      startL = parseInt($('.sliderCont').css('left'));

      console.log(startL);
      startL -= slideW;
      $('.sliderCont').animate({
        left: startL
      }, 200);
      $('.arrw').css('display','block');
      if (startL == (-(sliderCont.width() - sliderBoxW))) {
        $('.arrw.rightArrw').css('display','none');
      }
    });

    $('.arrw.leftArrw').click(function(){
      startL = parseInt($('.sliderCont').css('left'));
      console.log(startL);
      startL += slideW;
      $('.sliderCont').animate({
        left: startL
      }, 200);
      $('.arrw').css('display','block');

      if (startL == 0) {
        $('.arrw.leftArrw').css('display','none');
      }
    });


    $('.slideItem > a').click(function(ev){
      ev.preventDefault();
      var certifName = $(this).find('.testName');
      certifName = $(certifName).text();
      $('#modalCertif .testName').text(certifName);

      $('#modalCertif').modal('open');

    });
  });
})(jQuery);
