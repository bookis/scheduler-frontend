$( document ).ready(function() {

  console.log('hi');
  $('body').on('click', '#schedule', function(){
    console.log("hello");
    $('.schedule-send').removeClass('schedule-send');
      return false;
  })
});
