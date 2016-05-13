$( document ).ready(function() {

  $('#datepicker').attr("placeholder", Date());

  $('body').on('click', '#datepicker', function(){
    var picker = new Pikaday({ field: $('#datepicker')[0], reposition:false });
    return false;
  })

  $('body').on('click', '#plus', function(){
      $('.email-form').toggle();
      return false;
    })

  $('body').on('click', '.outbox', function(){
      $('.blue-box').hide();
      $('.email-form').hide();
      $('.emails-container').toggle();
      $('.email-container').toggle();
      return false;
    })

});
