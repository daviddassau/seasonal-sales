
var mainContainerDiv = document.getElementById("mainSSContainer");

function domString(productParam){
	var productString = "";
	for(var i = 0; i < productParam.length; i++){
		productString += `<div class="mainProductDiv">`;
		productString +=   `<h2 class="productName">${productParam[i].name}</h2>`;
		productString +=   `<h3 class="departmentName">${productParam[i].name}</h3>`;
		productString +=   `<div class="productPrice">${productParam[i].price}</div>`; 
		productString += `</div>`;
	} 
	writeToDom(productString);
}

// function to print to dom
function writeToDom(productString){
	mainContainerDiv.innerHTML += productString;
}

// function to ...
function productsJSONLoad(){
	var data = JSON.parse(this.responseText);
	domString(data.products);
}

// function to ...
function departmentsJSONLoad(){
	var data = JSON.parse(this.responseText);
	// domString(data.categories);
}

// function to ...
function productsJSONError(){
	console.log("It is broken");
}

// function to ...
function departmentsJSONError(){
	console.log("It is broken");
}


//
var myRequest = new XMLHttpRequest();
myRequest.addEventListener("load", productsJSONLoad);
myRequest.addEventListener("error", productsJSONError);
myRequest.open("GET", "products.json");
myRequest.send();


//
var myRequest = new XMLHttpRequest();
myRequest.addEventListener("load", departmentsJSONLoad);
myRequest.addEventListener("error", departmentsJSONError);
myRequest.open("GET", "departments.json");
myRequest.send();

