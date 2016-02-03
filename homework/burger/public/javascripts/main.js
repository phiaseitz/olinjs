var $editIngredForm = $("#ingredients-form");
var $addIngredForm = $("#add-ingredients-form");

console.log($editIngredForm);

var onSuccess = function(data, status) {
  console.log(data);
};

var onAddSuccess = function(data, status) {
  console.log(data.name);
  console.log(data.price);
  var ingredientsDiv = $editIngredForm.find("#current_ingredients")
  
  //How do I do this better? This is gross and ugly. 
  var ingredientHTMLarr = ["<div id=\"" + data.name + "_div\"> ",
    data.name + " costs $" + data.price,
    "<input type=\"submit\" name = \"action\" class = \"outbutton\" value=\"Out of Stock\">",
    "<input type=\"submit\" name = \"action\" class = \"editbutton\" value=\"Edit\"> <br>"]
  console.log(ingredientHTMLarr.join(separator = " "));

  ingredientsDiv.append(ingredientHTMLarr.join(separator = " "));
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