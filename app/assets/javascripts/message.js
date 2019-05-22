$(function() {
  function buildHTML(message){
    var image = message.image ? `<img src=${message.image} >` : ''
      var html =
        `<div class="message" data-id=${message.id}>
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
          <div class=""lower-message__image">
            ${image}
          </div>
        </div>`
      return html;
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
    var last_message_id = $('.message:last').data('id');
    var current_group_id = $('.left-header__title').data('group-id')
    var url = `/groups/${current_group_id}/api/messages`
    $.ajax({
      url: url,
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id, group_id: current_group_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message){
        insertHTML = buildHTML(message)
        $('.messages').append(insertHTML);
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        clearInterval(setInterval(reloadMessages, 5000))
      })
    })
    .fail(function() {
      alert('error');
    });
  };
  url = location.href;
  group_id = $(".left-header__title").data('group-id');
  if(url === `http://localhost:3000/groups/${group_id}/messages`){
    setInterval(reloadMessages, 5000);
  }
  
});