(function() {

  jQuery(function($) {
    $('.expandable').click(function() {
      $(this).hide().fadeOut(500)
      $(this).parent().children('.expansion').fadeIn(1000)
    });

  });

$('.expansion').hide()



}).call(this);