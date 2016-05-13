$( document ).ready(function() {

  $('#datepicker').attr("placeholder", Date());

  $('body').on('click', '#datepicker', function(){
  //   // (use remove class versus toggle for schedule send)
  //   $('.schedule-send').removeClass('schedule-send');
  //   $('.email-create').toggle();
    var picker = new Pikaday({ field: $('#datepicker')[0], reposition:false });
    return false;

  })
  //
  $('body').on('click', '#plus', function(){
      console.log("havplenty");
      $('.email-create').toggle();
      $('.blue-box').css("background-color", "red");
      // $('.blue-box').css("margin-top", "0px");
    })

  $('body').on('click', '.outbox', function(){
      $('.emails-container').toggle();
      $('.email-container').toggle();
    })



});
