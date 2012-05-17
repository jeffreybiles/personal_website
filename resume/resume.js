(function() {

  jQuery(function($) {
    $('#resume_switcher #serious').click(function() {
      $('#resumes').children().hide();
      $('#serious_resume').fadeIn(700);
    });


    $('#resume_switcher #exciting').click(function() {
      $('#resumes').children().hide();
      $('#exciting_resume').fadeIn(700);
    });


    $('#resume_switcher #buzzword').click(function() {
      $('#resumes').children().hide();
      $('#buzzword_resume').fadeIn(700);
    });

  });

  $('#resumes').children().hide();


}).call(this);