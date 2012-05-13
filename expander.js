(function() {

  jQuery(function($) {
    $('.expandable').click(function() {
      $(this).hide().fadeOut(700)
      $(this).parent().children('.expansion').fadeIn(700)
    });

  });

$('.expansion').hide()



}).call(this);