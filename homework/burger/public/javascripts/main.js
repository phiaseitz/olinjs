var $form = $("#ingredients-form");

var onSuccess = function(data, status) {
  console.log(data);
  console.log($form);
};

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

$form.submit(function(event) {
  event.preventDefault();
  $.post("updateIngredients")
    .done(onSuccess)
    .error(onError);;
});