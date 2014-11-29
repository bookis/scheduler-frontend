(function() {
  window.GmailApp || (window.GmailApp = {});

  GmailApp.Main = (function() {
    function Main() {
      var rendered, welcomeView;
      welcomeView = $("#view-welcome").html();
      Mustache.parse(welcomeView);
      rendered = Mustache.render(welcomeView);
      this.render(rendered);
    }

    Main.prototype.render = function(html) {
      return $('[role=main]').html(html);
    };

    return Main;

  })();

  $(function() {
    new GmailApp.Main();
    GmailApp.Email.render();
    $("body").on("click", ".new-schedule", function() {
      console.log("show schedule");
      return $('.create-schedule').show();
    });
    $("body").on("submit", ".create-schedule", function(event) {
      event.preventDefault();
      console.log("create schedule on server");
      GmailApp.Email.all().push({
        id: Math.random(),
        time: "2014-11-30",
        to: "test@example.com",
        subject: "Blah"
      });
      return GmailApp.Email.render();
    });
    return $("body").on("click", ".email .delete", function() {
      GmailApp.Email["delete"]($(this).parents(".email"));
      return false;
    });
  });

}).call(this);
