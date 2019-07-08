  $(document).on('turbolinks:load', function(){
     function buildHTML(message){
        var imagehtml = message.image == null ? "" : `<img src="${message.image.url}" class="lower-message__image">`
        var html = `<div class="message">
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
        processData: false
      })
      .done(function(message){
        var html = buildHTML(message);
      $('.messages').append(html)
      $('.btn').prop('disabled', false);
      $(".messages").animate({scrollTop: $(".messages")[0].scrollHeight},'fast');
      $('.hidden').remove();
      $("#new_message").get(0).reset();
    })
      .fail(function() {
        alert('メッセージを入力してください');
      })
    });

    function buildinsetHTML(message){
      var imagehtml = message.image == null ? "" : `<img src="${message.image.url}" class="lower-message__image">`
      var html = `<div class="message">
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

    var reloadMessages = function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data("message-id");
      $.ajax({
        url: 'api/messages',
        type: 'get',
        dataType: 'json',
        data: {last_id: last_message_id}
      })
      .done(function(messages) {
      var insethtml = '';
        messages.forEach(function(message){
          insethtml =  buildinsetHTML(message);
          $('.messages').append(insethtml);
      })
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })
      .fail(function() {
        alert('error');
      });
    }
    };
   setInterval(reloadMessages, 5000)
});