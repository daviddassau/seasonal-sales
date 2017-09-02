
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

var productArrayVariable = [];

// Function that combines the arrays in the two JSON files
function combinedArray(productsArray, categoriesArray){
    productsArray.forEach(function(product){
        var currentCategoryId = product["category_id"];
        // console.log("product category_id", currentCategoryId);
        categoriesArray.forEach(function(category){
            if(currentCategoryId === category.id){
                product["categoryName"] = category.name;
                product["seasonDiscount"] = category["season_discount"];
                product["discount"] = category.discount;
                product["salePrice"] = product.price - product.price * product.discount;
                // console.log(product);
            }
        });
    });
    productArrayVariable = productsArray;
    domString(productsArray);
}

function domString(products){
    var productString = "";
    // console.log(products);
    for(var i = 0; i < products.length; i++){
        productString += `<div class="col-md-4 col-sm-6">`;
        productString +=   `<div class="thumbnail">`;
        productString +=     `<div class="caption">`;
        productString +=       `<h2>${products[i].name}</h2>`;
        productString +=       `<h3>${products[i].categoryName}</h3>`;
        // productString +=       `<p>${products[i].price}</p>`;
        if(selectedSeason === products[i].seasonDiscount){
            productString += `<p>${products[i].salePrice}</p>`;
        } else {
            productString += `<p>${products[i].price}</p>`;
        }
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



var seasonSelector = document.getElementById("seasonSelector");
var selectedSeason = "";

seasonSelector.addEventListener('change', function(e){
    console.log(e);
    
    var selectOptions = e.target.childNodes;
    for(var i = 0; i < selectOptions.length; i++){
        if(selectOptions[i].selected) {
            // console.log(selectOptions[i].innerHTML);
            selectedSeason = selectOptions[i].innerHTML;
        }
    }
    domString(productArrayVariable);
});








