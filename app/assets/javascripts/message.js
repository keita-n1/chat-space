$(function() {
  function buildHTML(message){
    if ( message.image ) {
      var html =
        `<div class="message" data-message-id=${message.id}>
          <div class="upper-message">
            <div class="upper-message__user-name">
              ${message.user_name}
            </div>        
            <div class="upper-message__date">
              ${message.date}
            </div>
          </div>
          <div class="lower-message">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          <asset_path src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
        `<div class="message" data-message-id=${message.id}>
          <div class="upper-message">
            <div class="upper-message__user-name">
              ${message.user_name}
            </div>        
            <div class="upper-message__date">
              ${message.date}
            </div>
          </div>
          <div class="lower-message">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;      
    };
  }

  //自動更新
  var builsMessageHTML = function(message) {
    if (message.content && message.image.url) {

    }
  }
  //非同期通信
  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('form')[0].reset();
    })
    .fail(function(){
      alert('error');
    });
    return false;
  });

  //自動更新
  var reloadMessages = function() {
    last_message_id = $("#data-message_id")
    $.ajax({
      url:  group_messages_path,
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messaes) {
      console.log('success');
    })
    .fail(function() {
      console.log('error');
    });
  };
});