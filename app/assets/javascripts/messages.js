  $(document).on('turbolinks:load', function(){
     function buildHTML(message){
        var imagehtml = message.image == null ? "" : `<img src="${message.image}" class="lower-message__image">`
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

    $(function() {
      $(function() {
        if (location.pathname.match(/\/groups\/\d+\/messages/)) {
          setInterval(update, 5000);
        }
      });
      function update(){
        if($('.chat__contents__content')[0]){
          var message_id = $('.chat__contents__content:last').data('message-id');
        } else {
          return false
        }

        $.ajax({
          url: window.location.href,
          type: 'GET',
          data: { id : message_id },
          dataType: 'json'
        })
        .done(function(data){
          if (data.length){
          $.each(data, function(i, data){
            var html = buildHTML(data);
            $('.chat__contents').append(html)
          })
        }
        })
        .fail(function(){
          alert('自動更新に失敗しました')
        })
      }
    })
  });