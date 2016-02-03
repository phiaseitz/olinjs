var $editIngredForm = $("#ingredients-form");
var $addIngredForm = $("#add-ingredients-form");

console.log($editIngredForm);

var onSuccess = function(data, status) {
  console.log(data);
};

var onAddSuccess = function(data, status) {
  console.log(data.name);
  console.log(data.price);
  var ingredientsTab = $editIngredForm.find("#current-ingredients")[0];
  console.log(ingredientsTab.length);
  var row = ingredientsTab.insertRow(-1);
  var nameCell = row.insertCell(0);
  nameCell.innerHTML = data.name;
  var priceCell = row.insertCell(1);
  priceCell.innerHTML = data.price;
  var stockCell = row.insertCell(2);
  stockCell.innerHTML = "<input type=\"submit\" name = \"action\" class = \"outbutton\" value=\"Out of Stock\">";
  var editCell = row.insertCell(3);
  editCell.innerHTML = "<input type=\"submit\" name = \"action\" class = \"editbutton\" value=\"Edit\"> <br>";
};

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

$editIngredForm.submit(function(event) {
  event.preventDefault();
  buttonClass = $editIngredForm.context.activeElement.className;
  if (buttonClass === 'outbutton'){
    $.post("setOutOfStock")
      .done(onSuccess)
      .error(onError);;
  } else if (buttonClass === 'editbutton'){
    $.post("editIngredient")
      .done(onSuccess)
      .error(onError);;
  }
});

$addIngredForm.submit(function(event){
  event.preventDefault();
  var name = $addIngredForm.find("#addName").val();
  var price = $addIngredForm.find("#addPrice").val();
  $.post("addIngredient", {
    name: name,
    price: price,
  })
    .done(onAddSuccess)
    .error(onError);;
})