  $(document).on('turbolinks:load', function(){
     function buildHTML(message){
        var imagehtml = message.image == null ? "" : `<img src="${message.image}" class="lower-message__image">`
        var html = `<div class="message" data-message-id=${message.id}>
                      <div class="message__upper">
                        <div class="message__upper-name">
                        ${message.user_name}
                        </div>
                        <div class="message__upper-date">
                        ${message.created_at}
                        </div>
                      </div>
                      <div class="lower-message">
                        <p class="message__upper-text">
                        ${message.content}
                        </p>
                        ${imagehtml}
                      </div>
                    </div> `
        return html;
      }

    $('#new_message').on('submit', function(e) {
      e.preventDefault();
      var formData = new FormData(this);
      var href = window.location.href;

      $.ajax({
        url: href,
        type: "POST",
        data: formData,
        dataType: 'json',
        contentType: false,
        processData: false,
      })
      .done(function(message){
        var html = buildHTML(message);
      $('.messages').append(html)
      $('.btn').prop('disabled', false);
      $(".messages").animate({scrollTop: $(".messages")[0].scrollHeight},'fast');
      $("#new_message").get(0).reset();
    })
      .fail(function() {
        alert('メッセージを入力してください');
      })
    });

    $(function(){
      setInterval(reloadMessages, 10000);
      });
    function reloadMessages() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      var last_message_id = $('.message:last').data("message-id");
      $.ajax({
        url: 'api/messages',
        type: 'get',
        dataType: 'json',
        data: {last_id: last_message_id}
      })

      .done(function(messages) {
      var inserthtml = '';
        messages.forEach(function(message){
          inserthtml =  buildHTML(message);
          $('.messages').append(inserthtml);
      })
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })
      .fail(function() {
        alert('error');
      })
    } else {
      clearInterval(reloadMessages);
    }
  };
});