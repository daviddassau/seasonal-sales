
// function to ...
function productsJSONLoad(){
    var productsData = JSON.parse(this.responseText).products;
    getCategories(productsData);
}

function shitsBroke(){

}

// XHR Request for products.json
var myProducts = new XMLHttpRequest();
myProducts.addEventListener("load", productsJSONLoad);
myProducts.addEventListener("error", shitsBroke);
myProducts.open("GET", "products.json");
myProducts.send();


function getCategories(productsParam){
    var myCategories = new XMLHttpRequest();
    myCategories.addEventListener("load", departmentsJSONLoad);
    myCategories.addEventListener("error", shitsBroke);
    myCategories.open("GET", "departments.json");
    myCategories.send();

    function departmentsJSONLoad() {
        var categoriesData = JSON.parse(this.responseText).categories;
        combinedArray(productsParam, categoriesData);
    }
}

function combinedArray(productsArray, categoriesArray){
    productsArray.forEach(function(product){
        var currentCategoryId = product["category_id"];
        // console.log("product category_id", currentCategoryId);
        categoriesArray.forEach(function(category){
            if(currentCategoryId === category.id){
                product["categoryName"] = category.name;
                product["seasonDiscount"] = category["season_discount"];
                product["discount"] = category.discount;
                console.log(product);
            }
        });
    });
    domString(productsArray);
}

function domString(products){
    var productString = "";
    console.log(products);
    for(var i = 0; i < products.length; i++){
        productString += `<div class="col-sm-4">`;
        productString +=   `<div class="card" style="width: 20rem;">`;
        productString +=     `<div class="card-body">`;
        productString +=       `<h2>${products[i].name}</h2>`;
        productString +=       `<h3>${products[i].categoryName}</h3>`;
        productString +=       `<p>${products[i].price}</p>`;
        productString +=     `</div>`;
        productString +=   `</div>`;
        productString += `</div>`;
    }
    writeToDom(productString);
}

function writeToDom(strang){
    //put in the DOM
    mainSSContainer.innerHTML = strang;
}








// function domProducts() {
//     let productString = ''; 
//     jsonProductArray.forEach(function(index){
//             productString += `<div id='productCards'>`;
//             productString +=     `<h2>${index.name}</h2>`; 
//             if (index.category_id === 1) {
//             productString +=     `<h3>${jsonDepartmentsArray[0].name}</h3>`;
//             } else if (index.category_id === 2) {
//                 productString +=     `<h3>${jsonDepartmentsArray[1].name}</h3>`;    
//             } else if (index.category_id === 3) {
//                 productString +=     `<h3>${jsonDepartmentsArray[2].name}</h3>`;    
//             }
//             productString +=     `<h4>${index.price}</h4>`;
//             productString += `</div>`;      
//     });             
//     writeToDom(productString);
// };





// // function to print to dom
// function writeToDom(productString){
// 	mainContainerDiv.innerHTML += productString;
// }

// // function to ...
// function productsJSONLoad(){
// 	var data = JSON.parse(this.responseText);
// 	jsonProductArray = data.products;
// 	counter();
// }

// // function to ...
// function departmentsJSONLoad(){
// 	var data = JSON.parse(this.responseText);
// 	jsonDepartmentsArray = data.categories;
// 	counter();
// }


