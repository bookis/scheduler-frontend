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
      return $.ajax("http://localhost:3000/emails/" + email_id + "/schedules").then((function(_this) {
        return function(response, status, xhr) {
          return $.each(response, function(i, data) {
            return _this.allData.push(new GmailApp.Schedule(data));
          });
        };
      })(this));
    };

    Schedule.create = function(email_id) {
      return $.ajax("http://localhost:3000/emails/" + email_id + "/schedules", {
        type: "POST"
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
