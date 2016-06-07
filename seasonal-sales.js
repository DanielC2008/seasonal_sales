var productContainer = document.getElementById("productDiv");
var departmentContainer = document.getElementById("departmentDiv");
var departmentData = "";
var discountWinter = document.getElementsByClassName("category--1");
var discountAutumn = document.getElementsByClassName("category--2");
var discountSpring = document.getElementsByClassName("category--3");


var select = document.getElementById("discountSelect");
select.addEventListener("change", discountPrice);

function discountPrice() {
	for (i = 0; i < discountWinter.length; i++){
		if (select.value === "Winter"){
			var discounted =(discountWinter[i].innerHTML - (discountWinter[i].innerHTML * .1));
			var newPrice = discounted.toFixed(2);
			discountWinter[i].innerHTML += ` ${newPrice}`;
		}
		else if (select.value === "Autumn"){
			var discounted =(discountAutumn[i].innerHTML - (discountAutumn[i].innerHTML * .25));
			var newPrice = discounted.toFixed(2);
			discountAutumn[i].innerHTML += ` ${newPrice}`;
		}	
		else if (select.value === "Spring"){
			var discounted =(discountSpring[i].innerHTML - (discountSpring[i].innerHTML * .15));
			var newPrice = discounted.toFixed(2);
			discountSpring[i].innerHTML += ` ${newPrice}`;
		}		
	}
}

var productRequest = new XMLHttpRequest();
productRequest.addEventListener("load", sortProducts);
productRequest.addEventListener("error", errorCode);
productRequest.open("GET", "product.json")
productRequest.send();

var departmentRequest = new XMLHttpRequest();
departmentRequest.addEventListener("load", sortDepartments);
departmentRequest.addEventListener("error", errorCode);
departmentRequest.open("GET", "departments.json")
departmentRequest.send();

function errorCode() {
	alert("ERROR");
}


function sortDepartments() {
 var data = JSON.parse(event.target.responseText)
 departmentData = data.categories;

}

function sortProducts() {
	var data = JSON.parse(event.target.responseText)
	for ( i = 0; i < data.products.length; i++) {
		var holdProduct = "";
		var currentProduct = data.products[i];
		holdProduct += `<div>`;
		holdProduct += `<h3>${currentProduct.id + 1} .</h3>`;
		holdProduct += `<h1>${currentProduct.name}</h1>`;
		// added a specific class based on the category id to easily discount
		holdProduct += `<h2 class="category--${currentProduct.category_id}">${currentProduct.price}</h2>`; 
		holdProduct += `</div>`;
	  productContainer.innerHTML += holdProduct;
	}
	
}




