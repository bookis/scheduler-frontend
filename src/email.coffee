window.GmailApp or= {}

class GmailApp.Email
  @all: () ->
    this.allData or= [
      {
        id: Math.random(),
        to: "Luke@example.com",
        time: "2014-11-28",
        subject: "Lorem Ipsum",
        body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat"
      }
    ]

  @delete: (obj) ->
    id = obj.data("id")
    this.allData = this.allData.filter (obj) -> obj.id isnt id
    console.log "delete #{id} from server"
    obj.remove()

  @render: () ->
    emailsView = $("#view-emails").html()
    Mustache.parse(emailsView)
    rendered = Mustache.render(emailsView, {emails: this.all()});
    $(".emails-container").html(rendered)
