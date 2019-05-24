$(function() {

  var index_list = $("#user-search-result");
  var index_chat_list = $("#js-chat-member")
//インクリメンタルサーチ
  function appendUser(user) {
    var html =
     `<div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
      </div>`
      index_list.append(html);
  }
//追加をクリックしたら点火
  $(document).on("click", ".user-search-add", function() { 
    $(this).parent().remove();
      var user_name = $(this).attr('data-user-name')
      var user_id = $(this).attr('data-user-id')
      var html =
      `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user'>
         <input name='group[user_ids][]' type='hidden' value=${user_id}>
         <p class='chat-group-user__name'>${user_name}</p>
         <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
      </div>`
      index_chat_list.append(html);
  })
//削除をクリックしたら点火
  $(document).on("click", ".user-search-remove", function() {
    $(this).parent().remove();
  })

  function appendErrMsgToHTML(msg) {
    var html = `<p class="chat-group-user__name">${ msg }</p>`
    index_list.append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    if (input == "") {
      index_list.empty();
      appendErrMsgToHTML("一致するユーザーが見つかりません");
      return
    }
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      index_list.empty();
      if (users.length !== 0) {
        users.forEach(function(user) {
          appendUser(user);
        });
      }
      else {
        appendErrMsgToHTML("一致するユーザーが見つかりません");
      }
    })
    .fail(function() {
      alert('検索に失敗しました');
    })
  });
});