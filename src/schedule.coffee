window.GmailApp or= {}

class GmailApp.Schedule
  constructor: (data) ->
    @id       = data.id
    @email_id = data.email_id
    @send_at  = Date.parse(data.send_at)
    @email    = GmailApp.Email.find(@email_id)

  @all: () ->
    this.allData or= []

  @fetch: () ->
    this.all()
    $.ajax("http://localhost:3000/schedules").then (response, status, xhr) =>
      $.each response, (i, data) =>
        this.allData.push new GmailApp.Schedule(data)

  @create: (form) ->
    $.ajax "http://localhost:3000/schedules", {
      data: form.serialize(),
      type: "POST",
      complete: () =>
      success: (response) =>
        $(".create-schedule").hide()
        $(".errors-schedule ul").html("")
        this.allData.push new GmailApp.Schedule(response)
      error: (response) =>
        $(".errors-schedule ul").html("")
        $.each response.responseJSON, (key, errors) ->
          $.each errors, (i, error) ->
            $(".errors-schedule ul").append("<strong>#{key}</strong>: #{error}")
    }

  @delete: (obj) ->
    id = obj.data("id")
    $.ajax("http://localhost:3000/schedules/#{id}", type: "DELETE").then =>
      this.allData = this.allData.filter (obj) -> obj.id isnt id
      obj.remove()

  @render: () ->
    schedulesView = $("#view-schedules").html()
    Mustache.parse(schedulesView)
    rendered = Mustache.render(schedulesView, {schedules: this.all()});
    $(".emails-container").html(rendered)
