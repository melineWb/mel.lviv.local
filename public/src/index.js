$(document).ready(function(){
  $('.parallax').parallax();
  $(".button-collapse").sideNav();
  $(".dropdown-button").dropdown();

  let windH = $(window).height();
  $('.topIndexBlc').css('height', windH);
  let blcTopHeight = $('.descTopInsider').height();
  blcTopHeight = (windH - blcTopHeight) / 2;
  $('.descTopInsider').css('paddingTop', blcTopHeight);

  $('.LinkDown').click(function(){
    let scrollH = windH - 64;
    $("html, body").animate({scrollTop: scrollH}, 500);
  });
});
