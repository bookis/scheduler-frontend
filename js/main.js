(function() {
  window.GmailApp || (window.GmailApp = {});

  GmailApp.Main = (function() {
    function Main() {
      this.welcomeView = $("#view-welcome").html();
      Mustache.parse(this.welcomeView);
      this.render();
    }

    Main.prototype.render = function() {
      return GmailApp.Email.fetch().then((function(_this) {
        return function() {
          var rendered;
          rendered = Mustache.render(_this.welcomeView, {
            emails: GmailApp.Email.all(),
            app: GmailApp
          });
          return $('[role=main]').html(rendered);
        };
      })(this));
    };

    return Main;

  })();

  $(function() {
    var app;
    app = new GmailApp.Main();
    GmailApp.Schedule.fetch().then(function() {
      return GmailApp.Schedule.render();
    });

    // $("body").on("click", ".new-window", function () {
    //   window.open("/", "TEST WINDOW");
    //   return false;
    // });
    $("body").on("click", ".new-schedule", function() {
      return $('.create-schedule').show();
    });
    $("body").on("submit", ".create-schedule", function(event) {
      event.preventDefault();
      return GmailApp.Schedule.create($(this)).then(function() {
        return GmailApp.Schedule.render();
      });
    });
    $("body").on("submit", ".create-email", function(event) {
      event.preventDefault();
      return GmailApp.Email.create($(this)).then(function() {
        return $('.create-schedule').show();
      });
    });
    return $("body").on("click", ".email .delete", function() {
      GmailApp.Schedule["delete"]($(this).parents(".email"));
      return false;
    });
  });

}).call(this);
