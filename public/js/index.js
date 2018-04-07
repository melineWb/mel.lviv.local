(function($) {
  $(document).ready(function() {
    $('#sliderImgGal').fullSlider();
    var wW = $(window).width();
    var wH = $(window).height();

    $('.loginpage').css('min-height', wH);
    $('body').css('min-height', wH);

    var loginFromH = $('.loginform').height()/2;
    $('.loginform').css('top', $(window).height()/2 - loginFromH);

    $('#addVariant').click(function(ev){
      ev.preventDefault();
      var leters = ['a','b','c','d','e','f','g','h','i','j','k'];
      var container = $('.variantBlc');
      var countAnswers = $(container).find('.lineVariantEdit');
      countAnswers = countAnswers.length;
      container.append("<div class='row lineVariantEdit'>\
          <div class='col s2 testAnsw right-align'>\
            <input type='checkbox' name='"+ leters[countAnswers] +"' id='"+ leters[countAnswers] +"'/>\
            <label for='"+ leters[countAnswers] +"'>"+ leters[countAnswers] +"</label>\
          </div>\
          <div class='col s10 testAnsw'>\
            <div class='input-field'>\
              <label for='answer"+ countAnswers +"'>Answer "+ leters[countAnswers] +"</label>\
              <input class='validate' type='text' name='answer"+ countAnswers +"' id='answer"+ countAnswers +"')/>\
            </div>\
          </div>\
        </div>");
      // console.log(countAnswers);
    })

    $('.parallax').parallax();
    $('.modal').modal();
    $('.collapsible').collapsible();
    $('select').material_select();
    $(".button-collapse").sideNav();

  });
})(jQuery);
