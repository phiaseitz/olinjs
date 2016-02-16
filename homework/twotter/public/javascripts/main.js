var $newTwoteForm = $("#new-twote-form");
var $logInOutForm = $("#log-in-out-form");

var currentUser;


var onSuccess = function(data, status) {
  console.log(data);
};


var onNewTwoteSuccess = function(data, status) {
  console.log(data);


  var twoteTextHTML = '<p class="twote-text"> ' + data.twote.text + '</p>';
  var twoteAuthorHTML = '<p class="twote-author"> -' + data.user.username + '</p>';
  var deleteButtonHTML = '<button id="delete_' + data.twote._id + '" onclick="deleteTwote(this)" class="deleteTwote">X</button>';

  var newTwoteRow = '<tr id="twote_' + data.twote._id + '" class="twote_' + data.user._id + '"> <td class="twote"> <div class="twote-header">' + twoteTextHTML + deleteButtonHTML + '</div>' + twoteAuthorHTML + ' </td> </tr>';

  $('#twotes tr:first').after(newTwoteRow);

};

var onDeleteSuccess = function(data, status) {
  console.log(data);
  $("#twote_" + data._id).remove();
}

var onSignInSuccess = function(data, status) {
  currentUser = data;
  console.log(data);

  window.location.href = '/';
  //Update the posting form (enable the user to post a twote);
  // $('.my_class').load('my/url/path/with/content/to/load');
  console.log("hi");

  var newTwoteHeader = $newTwoteForm.find("#new-twote-header");
  console.log(newTwoteHeader);
  newTwoteHeader.innerHTML = 'Post a new twote as ' + data.username + '!';
  
  // var twoteText = $newTwoteForm.find("#twote-text")[0];
  // twoteText.removeAttribute("disabled");
  
  // var postTwoteButton = $newTwoteForm.find("#post-twote")[0];
  // postTwoteButton.removeAttribute("disabled");
};

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

var getLoginForm = function(){
  console.log("hello")
  $.get("login");
} 

var logOutUser = function(){
  console.log("beep");
  $.get("home");
}

//TODO: Make this work for only the current user
var deleteTwote = function(context){
  var twoteId = context.id.replace('delete_', '');
  console.log(twoteId);

  $.post("deleteTwote", {id: twoteId})
    .done(onDeleteSuccess)
    .error(onError);
}

//TODO: Actually hightlight twotes: (probably by assigning a class to those twotes)
var highlightUserTwotes = function(context){
  console.log(context);
  var userTableRow = context.parentElement.parentElement;
  var userId = userTableRow.id.replace('user_', '');

  var userTwotes = $(".twote_" + userId);

  // userTwotes.forEach(function (userTwote){
  //   userTwote.addClass("selected");
  // })
  userTwotes.addClass("selected");
}

var unHighlightUserTwotes = function(context){
  var userTableRow = context.parentElement.parentElement;
  var userId = userTableRow.id.replace('user_', '');

  var userTwotes = $(".twote_" + userId);

  // userTwotes.forEach(function (userTwote){
  //   userTwote.addClass("selected");
  // })
  userTwotes.removeClass("selected");
}

$newTwoteForm.submit(function(event) {

  event.preventDefault();

  var text = $newTwoteForm.find("#twote-text").val();
  var userId = $newTwoteForm.find("#new-twote").attr("class");

  $newTwoteForm[0].reset();

  $.post("newTwote", {
    userId: userId,
    text: text
  })
    .done(onNewTwoteSuccess)
    .error(onError);
});


