var $editIngredForm = $("#ingredients-form");
var $addIngredForm = $("#add-ingredients-form");
var $orderForm = $("#order-form");
var $kitchenForm = $("#kitchen-form");

var onCompleteOrderSuccess = function(data, status) {
  console.log(data);

  $kitchenForm.find("#" +  data._id).remove();
};


var onOrderSubmitSuccess = function (data, status) {
  var $orderMessage = $("#order-message");

  $orderMessage.html("<h2> Order Submitted Successfully! </h2>");
}

var onEditSuccess = function(data, status) {
  //Disable name and price textboxes
  $editIngredForm.find("#" + data._id + "_namebox").attr("disabled", "disabled"); 
  $editIngredForm.find("#" + data._id + "_pricebox").attr("disabled", "disabled"); 

  //Put back the edit button. 
  var ingredientRow = $("#" + data._id)[0].cells;
  var editCell = ingredientRow[4];
  editCell.innerHTML = "<input id = \"" + data._id +"_editbutton\" type=\"button\" name = \"action\" class = \"editbutton\" onclick = \"enableEditing(this)\" value=\"Edit\">";

};

var onToggleSuccess = function(data, status) {
  // var ingredientsTab = $editIngredForm.find("#current-ingredients")[0];
  var ingredientRow = $("#" + data._id)[0].cells;

  //Update stock status. 
  var stockSatusCell = ingredientRow[2];
  stockSatusCell.innerHTML = data.inStock ? "Yes" : "No";

  var stockButton = $("#" + data._id + "_stockbutton");

  if (data.inStock) {
    stockButton.prop('value', 'Out of Stock');
  } else {
    stockButton.prop('value', 'Back In Stock');
  }
}

var onAddSuccess = function(data, status) {
  var ingredientsTab = $editIngredForm.find("#current-ingredients")[0];
  
  var row = ingredientsTab.insertRow(-1);

  row.id = data._id;
  //Add the name
  var nameCell = row.insertCell(0);
  nameCell.innerHTML = "<input id = \"" + data._id +"_namebox\" type = \"text\" disabled = \"disabled\" value =" + data.name + ">";
  // Add the price
  var priceCell = row.insertCell(1);
  priceCell.innerHTML = "<input id = \"" + data._id +"_pricebox\" type = \"text\" disabled = \"disabled\" value =" + data.price + ">"
  //Add the stock status cell
  var stockSatusCell = row.insertCell(2);
  stockSatusCell.innerHTML = data.inStock ? "Yes" : "No";
  //Add the in/out of stock button
  var stockButtonCell = row.insertCell(3);
  stockButtonCell.innerHTML = "<input id = \"" + data._id +"_stockbutton\" type=\"submit\" name = \"action\" class = \"outbutton\" value=\"Out of Stock\">";
  //Add the edit button
  var editCell = row.insertCell(4);
  editCell.innerHTML = "<input id = \"" + data._id +"_editbutton\" type=\"button\" name = \"action\" class = \"editbutton\" onclick = \"enableEditing(this)\" value=\"Edit\">";
};

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

var addIngredientToOrder = function(context){
  var ingredientRow = context.parentElement.parentElement.cells;
  var ingredientPrice = +ingredientRow[2].innerHTML;
  
  var orderCostField = $orderForm.find("#orderCost")[0];
  var orderPrice = +orderCostField.innerHTML;
  
  if (context.checked){
    orderPrice += ingredientPrice;
  } else {
    orderPrice -= ingredientPrice;
  }

  orderCostField.innerHTML = orderPrice;
}

var enableEditing = function(context) {
  var ingredientRow = context.parentElement.parentElement;
  
  var inputs = ingredientRow.getElementsByTagName("input");

  for(var i = 0; i < inputs.length; i++) {
    if (inputs[i].type === "text"){
      inputs[i].removeAttribute("disabled");
    }
  }

  var editCell  = ingredientRow.cells[4];
  editCell.innerHTML = "<input type=\"submit\" name = \"action\" class = \"savebutton\" value=\"Save\">"
}

$editIngredForm.submit(function(event) {
  event.preventDefault();
  var buttonPressed = $editIngredForm.context.activeElement;
  var ingredientId = buttonPressed.parentElement.parentElement.id;
  if (buttonPressed.className === 'outbutton'){
    $.post("toggleIngredientStock", {
      mongoId: ingredientId,
    })
      .done(onToggleSuccess)
      .error(onError);;
  } else if (buttonPressed.className === 'savebutton'){
    var newName = $editIngredForm.find("#" + ingredientId + "_namebox").val();
    var newPrice = $editIngredForm.find("#" + ingredientId + "_pricebox").val();
    $.post("editIngredient", {
        mongoId: ingredientId,
        name: newName, 
        price: newPrice,
      })
      .done(onEditSuccess)
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
    .error(onError);
});

$orderForm.submit(function(event){
  event.preventDefault();
  var orderIngredients = $orderForm.find('input:checkbox:checked');

  var orderIngredientIds = orderIngredients.map(function(i){
    console.log(typeof(i));
    return orderIngredients[i].id.replace("_include", "");
  }).toArray();

  var orderCostField = $orderForm.find("#orderCost")[0];
  var orderPrice = +orderCostField.innerHTML;

  console.log(orderIngredientIds.length);
  console.log(orderIngredientIds);

  $.post("addOrder", {
      ingredients: orderIngredientIds,
      price: orderPrice,
    })
    .done(onOrderSubmitSuccess)
    .error(onError);
});

$kitchenForm.submit(function(event){
  event.preventDefault();

  var buttonPressed = $kitchenForm.context.activeElement;
  var orderId = buttonPressed.parentElement.parentElement.id;

  $.post("completeOrder", {
    mongoId: orderId,
  })

  .done(onCompleteOrderSuccess)
  .error(onError);



})

