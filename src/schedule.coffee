window.GmailApp or= {}

class GmailApp.Schedule
  constructor: (data) ->
    @id       = data.id
    @email_id = data.email_id
    @send_at  = Date.parse(data.send_at)
    @email    = GmailApp.Email.find(@email_id)

  @all: () ->
    this.allData or= []

  @fetch: (email_id) ->
    this.all()
    $.ajax("#{GmailApp.apiUrl}/emails/#{email_id}/schedules").then (response, status, xhr) =>
      $.each response, (i, data) =>
        this.allData.push new GmailApp.Schedule(data)

  @create: (email_id) ->
    $.ajax "#{GmailApp.apiUrl}/emails/#{email_id}/schedules", {type: "POST"}

  @delete: (obj) ->
    id = obj.data("id")
    $.ajax("#{GmailApp.apiUrl}/schedules/#{id}", type: "DELETE").then =>
      this.allData = this.allData.filter (obj) -> obj.id isnt id
      obj.remove()

  @render: () ->
    schedulesView = $("#view-schedules").html()
    Mustache.parse(schedulesView)
    rendered = Mustache.render(schedulesView, {schedules: this.all()});
    $(".emails-container").html(rendered)
