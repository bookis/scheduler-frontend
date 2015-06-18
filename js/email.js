(function() {
  window.GmailApp || (window.GmailApp = {});

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
      return $.ajax("http://localhost:3000/emails").then((function(_this) {
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
      return $.ajax("http://localhost:3000/emails", {
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
