(function() {
  window.GmailApp || (window.GmailApp = {});

  GmailApp.apiUrl = "http://www.scheduled.email";

}).call(this);

(function() {
  window.GmailApp || (window.GmailApp = {});

  $.ajaxSetup({
    xhrFields: {
      withCredentials: true
    }
  });

  GmailApp.Email = (function() {
    function Email(data) {
      this.id = data.id;
      this.subject = data.subject;
      this.to = data.to;
      this.body = data.body;
    }

    Email.all = function() {
      return this.allData || (this.allData = []);
    };

    Email.fetch = function() {
      this.all();
      return $.ajax(GmailApp.apiUrl + "/emails").then((function(_this) {
        return function(response, status, xhr) {
          return $.each(response, function(i, data) {
            return _this.allData.push(new GmailApp.Email(data));
          });
        };
      })(this));
    };

    Email.find = function(id) {
      return this.all().filter(function(email) {
        return email.id === id;
      })[0];
    };

    Email["delete"] = function(obj) {
      var id;
      id = obj.data("id");
      this.allData = this.allData.filter(function(obj) {
        return obj.id !== id;
      });
      console.log("delete " + id + " from server");
      return obj.remove();
    };

    Email.create = function(form) {
      return $.ajax(GmailApp.apiUrl + "/emails", {
        data: form.serialize(),
        type: "POST",
        complete: (function(_this) {
          return function() {};
        })(this),
        success: (function(_this) {
          return function(response) {
            return _this.allData.push(new GmailApp.Email(response));
          };
        })(this),
        error: (function(_this) {
          return function(response) {
            $(".errors-email ul").html("");
            return $.each(response.responseJSON, function(key, errors) {
              return $.each(errors, function(i, error) {
                return $(".errors-schedule ul").append("<strong>" + key + "</strong>: " + error);
              });
            });
          };
        })(this)
      });
    };

    Email.render = function() {
      var emailsView, rendered;
      emailsView = $("#view-emails").html();
      Mustache.parse(emailsView);
      rendered = Mustache.render(emailsView, {
        emails: this.all()
      });
      return $(".emails-container").html(rendered);
    };

    return Email;

  })();

}).call(this);

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

(function() {
  window.GmailApp || (window.GmailApp = {});

  GmailApp.Schedule = (function() {
    function Schedule(data) {
      this.id = data.id;
      this.email_id = data.email_id;
      this.send_at = Date.parse(data.send_at);
      this.email = GmailApp.Email.find(this.email_id);
    }

    Schedule.all = function() {
      return this.allData || (this.allData = []);
    };

    Schedule.fetch = function(email_id) {
      this.all();
      return $.ajax(GmailApp.apiUrl + "/emails/" + email_id + "/schedules").then((function(_this) {
        return function(response, status, xhr) {
          return $.each(response, function(i, data) {
            return _this.allData.push(new GmailApp.Schedule(data));
          });
        };
      })(this));
    };

    Schedule.create = function(email_id) {
      return $.ajax(GmailApp.apiUrl + "/emails/" + email_id + "/schedules", {
        type: "POST"
      });
    };

    Schedule["delete"] = function(obj) {
      var id;
      id = obj.data("id");
      return $.ajax(GmailApp.apiUrl + "/schedules/" + id, {
        type: "DELETE"
      }).then((function(_this) {
        return function() {
          _this.allData = _this.allData.filter(function(obj) {
            return obj.id !== id;
          });
          return obj.remove();
        };
      })(this));
    };

    Schedule.render = function() {
      var rendered, schedulesView;
      schedulesView = $("#view-schedules").html();
      Mustache.parse(schedulesView);
      rendered = Mustache.render(schedulesView, {
        schedules: this.all()
      });
      return $(".emails-container").html(rendered);
    };

    return Schedule;

  })();

}).call(this);
