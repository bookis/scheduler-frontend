$( document ).ready(function() {

  console.log('hi');
  $('body').on('click', '#schedule', function(){
    console.log("hello");
    $('.schedule-send').toggle();
    $('.email-create').toggle();
    // (use toggle versus add class)
      // $('.schedule-send').removeClass('schedule-send');
      return false;
  })

  $( ".datepicker").datepicker({
    altField: "#actualDate"
  });




});
