window.GmailApp or= {}

class GmailApp.Main
  constructor: () ->
    @welcomeView = $("#view-welcome").html()
    Mustache.parse(@welcomeView)
    this.render()

  render: () ->
    GmailApp.Email.fetch().then =>
      rendered = Mustache.render(this.welcomeView, {emails: GmailApp.Email.all()});
      $('[role=main]').html(rendered)

$ ->
  app = new GmailApp.Main()
  GmailApp.Schedule.fetch().then ->
    GmailApp.Schedule.render()

  $("body").on "click", ".new-schedule", () ->
    $('.create-schedule').show()

  $("body").on "submit", ".create-schedule", (event) ->
    event.preventDefault()
    GmailApp.Schedule.create($(this)).then ->
      GmailApp.Schedule.render()

  $("body").on "submit", ".create-email", (event) ->
    event.preventDefault()
    GmailApp.Email.create($(this)).then ->
      $('.create-schedule').show()

  $("body").on "click", ".email .delete", () ->
    GmailApp.Schedule.delete($(this).parents(".email"))
    false
