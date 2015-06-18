(function() {
  window.GmailApp || (window.GmailApp = {});
  GmailApp.server_uri = "http://localhost:3000"
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

    Schedule.fetch = function() {
      this.all();
      return $.ajax("http://localhost:3000/schedules").then((function(_this) {
        return function(response, status, xhr) {
          return $.each(response, function(i, data) {
            return _this.allData.push(new GmailApp.Schedule(data));
          });
        };
      })(this));
    };

    Schedule.create = function(form) {
      return $.ajax("http://localhost:3000/schedules", {
        data: form.serialize(),
        type: "POST",
        complete: (function(_this) {
          return function() {};
        })(this),
        success: (function(_this) {
          return function(response) {
            $(".create-schedule").hide();
            $(".errors-schedule ul").html("");
            return _this.allData.push(new GmailApp.Schedule(response));
          };
        })(this),
        error: (function(_this) {
          return function(response) {
            $(".errors-schedule ul").html("");
            return $.each(response.responseJSON, function(key, errors) {
              return $.each(errors, function(i, error) {
                return $(".errors-schedule ul").append("<strong>" + key + "</strong>: " + error);
              });
            });
          };
        })(this)
      });
    };

    Schedule["delete"] = function(obj) {
      var id;
      id = obj.data("id");
      return $.ajax("http://localhost:3000/schedules/" + id, {
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
