window.GmailApp or= {}

$.ajaxSetup {xhrFields: {
  withCredentials: true
}}

class GmailApp.Email
  constructor: (data) ->
    @id = data.id
    @subject = data.subject
    @to = data.to
    @body = data.body

  @all: () ->
    this.allData or= []

  @fetch: () ->
    this.all()
    $.ajax("#{GmailApp.apiUrl}/emails").then (response, status, xhr) =>
      $.each response, (i, data) =>
        this.allData.push new GmailApp.Email(data)

  @find: (id) ->
    this.all().filter( (email) -> email.id == id)[0]

  @delete: (obj) ->
    id = obj.data("id")
    this.allData = this.allData.filter (obj) -> obj.id isnt id
    console.log "delete #{id} from server"
    obj.remove()

  @create: (form) ->
    $.ajax "#{GmailApp.apiUrl}/emails", {
      data: form.serialize(),
      type: "POST",
      complete: () =>
      success: (response) =>
        this.allData.push new GmailApp.Email(response)
      error: (response) =>
        $(".errors-email ul").html("")
        $.each response.responseJSON, (key, errors) ->
          $.each errors, (i, error) ->
            $(".errors-schedule ul").append("<strong>#{key}</strong>: #{error}")
    }

  @render: () ->
    emailsView = $("#view-emails").html()
    Mustache.parse(emailsView)
    rendered = Mustache.render(emailsView, {emails: this.all()});
    $(".emails-container").html(rendered)
