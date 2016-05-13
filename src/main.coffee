window.GmailApp or= {}

class GmailApp.Main
  constructor: () ->
    @welcomeView = $("#view-welcome").html()
    Mustache.parse(@welcomeView)
    this.render =>
      
      this.renderEmails()

  renderEmails: (callback) ->
    emailsView = $("#view-emails").html()
    emailsHtml = Mustache.render(emailsView, {emails: GmailApp.Email.all()})
    $(".emails-container").html(emailsHtml)
    if callback then callback()

  render: (callback) ->
    GmailApp.Email.fetch().then =>
      rendered = Mustache.render(this.welcomeView, {
        daysToMinutes: () ->
          (val, render) ->
            render(val) * 24 * 60
      })
      $('[role=main]').html(rendered)
      callback()

$ ->
  app = new GmailApp.Main()


  $("body").on "click", ".refresh-schedules", () ->
    email = GmailApp.Email.find($(this).data("id"))
    GmailApp.Schedule.create(email.id).then (data) ->
      GmailApp.Schedule.fetch(email.id).then (data) ->
        emailView = $("#view-email").html()
        Mustache.parse(emailView)
        rendered = Mustache.render(emailView, {email: email, schedules: data});
        $(".email-container").html(rendered)
    false

  $("body").on "click", ".email-master", () ->
    email = GmailApp.Email.find($(this).data("id"))
    GmailApp.Schedule.fetch(email.id).then (data) ->
      emailView = $("#view-email").html()
      Mustache.parse(emailView)
      rendered = Mustache.render(emailView, {email: email, schedules: data});
      $(".email-container").html(rendered)
    false

  $("body").on "submit", ".create-schedule", (event) ->
    event.preventDefault()
    GmailApp.Schedule.create($(this)).then ->
      GmailApp.Schedule.render()

  $("body").on "submit", ".create-email", (event) ->
    event.preventDefault()
    GmailApp.Email.create($(this)).then (email) ->
      GmailApp.Schedule.create(email.id).then (data) ->
        GmailApp.Schedule.fetch(email.id).then (data) ->
          app.renderEmails ->
            emailView = $("#view-email").html()
            Mustache.parse(emailView)
            rendered = Mustache.render(emailView, {email: email, schedules: data});
            $(".email-container").html(rendered)

  $("body").on "click", ".email .delete", () ->
    GmailApp.Schedule.delete($(this).parents(".email"))
    false
