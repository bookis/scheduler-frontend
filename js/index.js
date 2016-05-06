$( document ).ready(function() {

  var picker = new Pikaday({ field: $('#datepicker')[0] });

  console.log('hi');
  $('body').on('click', '#schedule', function(){
    console.log("hello");
    $('.schedule-send').toggle();
    $('.email-create').toggle();
    var picker = new Pikaday({ field: $('#datepicker')[0] });
    // (use toggle versus add class)
      // $('.schedule-send').removeClass('schedule-send');
      return false;
  })

  $('body').on('click', '.go-back', function(){
      parent.history.back();
      return false;
  })

  $('body').on('click', '#datepicker', function(){
    console.log("datepicker");

  });

});
