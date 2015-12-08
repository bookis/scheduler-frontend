(function() {
  window.GmailApp || (window.GmailApp = {});

  GmailApp.Main = (function() {
    function Main() {
      this.welcomeView = $("#view-welcome").html();
      Mustache.parse(this.welcomeView);
      this.render((function(_this) {
        return function() {
          return _this.renderEmails();
        };
      })(this));
    }

    Main.prototype.renderEmails = function(callback) {
      var emailsHtml, emailsView;
      emailsView = $("#view-emails").html();
      emailsHtml = Mustache.render(emailsView, {
        emails: GmailApp.Email.all()
      });
      $(".emails-container").html(emailsHtml);
      if (callback) {
        return callback();
      }
    };

    Main.prototype.render = function(callback) {
      return GmailApp.Email.fetch().then((function(_this) {
        return function() {
          var rendered;
          rendered = Mustache.render(_this.welcomeView, {
            daysToMinutes: function() {
              return function(val, render) {
                return render(val) * 24 * 60;
              };
            }
          });
          $('[role=main]').html(rendered);
          return callback();
        };
      })(this));
    };

    return Main;

  })();

  $(function() {
    var app;
    app = new GmailApp.Main();
    $("body").on("click", ".refresh-schedules", function() {
      var email;
      email = GmailApp.Email.find($(this).data("id"));
      GmailApp.Schedule.create(email.id).then(function(data) {
        return GmailApp.Schedule.fetch(email.id).then(function(data) {
          var emailView, rendered;
          emailView = $("#view-email").html();
          Mustache.parse(emailView);
          rendered = Mustache.render(emailView, {
            email: email,
            schedules: data
          });
          return $(".email-container").html(rendered);
        });
      });
      return false;
    });
    $("body").on("click", ".email-master", function() {
      var email;
      email = GmailApp.Email.find($(this).data("id"));
      GmailApp.Schedule.fetch(email.id).then(function(data) {
        var emailView, rendered;
        emailView = $("#view-email").html();
        Mustache.parse(emailView);
        rendered = Mustache.render(emailView, {
          email: email,
          schedules: data
        });
        return $(".email-container").html(rendered);
      });
      return false;
    });
    $("body").on("submit", ".create-schedule", function(event) {
      event.preventDefault();
      return GmailApp.Schedule.create($(this)).then(function() {
        return GmailApp.Schedule.render();
      });
    });
    $("body").on("submit", ".create-email", function(event) {
      event.preventDefault();
      return GmailApp.Email.create($(this)).then(function(email) {
        return GmailApp.Schedule.create(email.id).then(function(data) {
          return GmailApp.Schedule.fetch(email.id).then(function(data) {
            return app.renderEmails(function() {
              var emailView, rendered;
              emailView = $("#view-email").html();
              Mustache.parse(emailView);
              rendered = Mustache.render(emailView, {
                email: email,
                schedules: data
              });
              return $(".email-container").html(rendered);
            });
          });
        });
      });
    });
    return $("body").on("click", ".email .delete", function() {
      GmailApp.Schedule["delete"]($(this).parents(".email"));
      return false;
    });
  });

}).call(this);
