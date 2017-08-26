
var mainContainerDiv = document.getElementById("mainSSContainer");
var jsonProductArray = [];
var jsonDepartmentsArray = [];
var count = 0;

function counter(){
	count++
	if (count === 2) {
		console.log("You got 2");
	}
}


function domString(){
	var productString = "";
	for(var i = 0; i < products.length; i++){
		productString += `<div class="mainProductDiv">`;
		productString +=   `<h2 class="productName">${products[i].name}</h2>`;
		productString +=   `<h3 class="departmentName">${departments[i].id}</h3>`;
		productString +=   `<div class="productPrice">${products[i].price}</div>`; 
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
	jsonProductArray = data.products;
	counter();
}

// function to ...
function departmentsJSONLoad(){
	var data = JSON.parse(this.responseText);
	jsonDepartmentsArray = data.departments;
	counter();
}

// function to ...
// function productsJSONError(){
// 	console.log("It is broken");
// }

// // function to ...
// function departmentsJSONError(){
// 	console.log("It is broken");
// }


//
var myRequest = new XMLHttpRequest();
myRequest.addEventListener("load", productsJSONLoad);
// myRequest.addEventListener("error", productsJSONError);
myRequest.open("GET", "products.json");
myRequest.send();


//
var myRequest = new XMLHttpRequest();
myRequest.addEventListener("load", departmentsJSONLoad);
// myRequest.addEventListener("error", departmentsJSONError);
myRequest.open("GET", "departments.json");
myRequest.send();

