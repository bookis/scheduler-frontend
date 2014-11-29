window.GmailApp or= {}

class GmailApp.Main
  constructor: () ->
    welcomeView = $("#view-welcome").html()
    Mustache.parse(welcomeView)
    rendered = Mustache.render(welcomeView);
    this.render(rendered)

  render: (html) ->
    $('[role=main]').html(html)

$ ->
  new GmailApp.Main()
  GmailApp.Email.render()

  $("body").on "click", ".new-schedule", () ->
    console.log("show schedule")
    $('.create-schedule').show()

  $("body").on "submit", ".create-schedule", (event) ->
    event.preventDefault()
    console.log "create schedule on server"
    GmailApp.Email.all().push {id: Math.random(), time: "2014-11-30", to: "test@example.com", subject: "Blah"}
    GmailApp.Email.render()

  $("body").on "click", ".email .delete", () ->
    GmailApp.Email.delete($(this).parents(".email"))
    false
