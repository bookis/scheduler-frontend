(function() {
  window.GmailApp || (window.GmailApp = {});

  GmailApp.Email = (function() {
    function Email() {}

    Email.all = function() {
      return this.allData || (this.allData = [
        {
          id: Math.random(),
          to: "Luke@example.com",
          time: "2014-11-28",
          subject: "Lorem Ipsum",
          body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat"
        }
      ]);
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
