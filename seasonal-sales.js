
var mainContainerDiv = document.getElementById("mainSSContainer");
var jsonProductArray = []; // empty array for products objects
var jsonDepartmentsArray = []; //empty array for departments/categories objects 
var count = 0; //counter, set to zero, to count through each array

// function to count...
function counter(){
	count++
	if (count === 2) {
		domProducts();
		console.log(jsonDepartmentsArray,jsonProductArray);
	}
}




function domProducts() {
    let productString = ''; 
    jsonProductArray.forEach(function(index){
            productString += `<div id='productCards'>`;
            productString +=     `<h2>${index.name}</h2>`; 
            if (index.category_id === 1) {
            productString +=     `<h3>${jsonDepartmentsArray[0].name}</h3>`;
            } else if (index.category_id === 2) {
                productString +=     `<h3>${jsonDepartmentsArray[1].name}</h3>`;    
            } else if (index.category_id === 3) {
                productString +=     `<h3>${jsonDepartmentsArray[2].name}</h3>`;    
            }
            productString +=     `<h4>${index.price}</h4>`;
            productString += `</div>`;      
    });             
    writeToDom(productString);
};





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
	jsonDepartmentsArray = data.categories;
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
var myRequest2 = new XMLHttpRequest();
myRequest2.addEventListener("load", departmentsJSONLoad);
// myRequest2.addEventListener("error", departmentsJSONError);
myRequest2.open("GET", "departments.json");
myRequest2.send();

