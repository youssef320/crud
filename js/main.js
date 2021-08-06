let productName = document.querySelector("#productName"); // input kolo
let productPrice = document.querySelector("#productPrice");
let productCategory = document.querySelector("#productCategory");
let productDescription = document.querySelector("#productDescription");
let btnAdd = document.querySelector("#btnAdd");
let Search = document.querySelector("#Search");
let regxName = document.querySelector("#regxName");
let regxprice = document.querySelector("#regxprice");
let regxCate = document.querySelector("#regxCate");

let storeProduct = [];

if (localStorage.getItem("dataStorage") == null) {
    storeProduct = [];
}
else {
    storeProduct = JSON.parse(localStorage.getItem("dataStorage"));
    displayProduct();
}

btnAdd.addEventListener("click", function () {

    if (validationProducts() == true) {

        let product = {
            name: productName.value,
            price: productPrice.value,
            cate: productCategory.value,
            desc: productDescription.value
        }

        // Array
        storeProduct.push(product);
        console.log(storeProduct);

        //local storage
        localStorage.setItem("dataStorage", JSON.stringify(storeProduct));


        // function dispaly
        displayProduct();

        // function clear
        clearData();

    }
    else {
        alert("check your inputs")
    }

});

function displayProduct() {

    let cartoona = ``;

    for (let i = 0; i < storeProduct.length; i++) {

        cartoona += `<tr>
                        <td>${i + 1}</td>
                        <td>${storeProduct[i].name}</td>
                        <td>${storeProduct[i].price}</td>
                        <td>${storeProduct[i].cate}</td>
                        <td>${storeProduct[i].desc}</td>
                        <td><button onclick="updataProduct(${i})" class="btn btn-outline-primary">updata</button></td>
                        <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">delete</button></td>
                    </tr>`
    }

    document.querySelector("#tableProduct").innerHTML = cartoona;

};

function clearData() {
    productName.value = '';
    productPrice.value = '';
    productCategory.value = '';
    productDescription.value = '';
};

function updataProduct(indexUpdata) {

    productName.value = storeProduct[indexUpdata].name;
    productPrice.value = storeProduct[indexUpdata].price;
    productCategory.value = storeProduct[indexUpdata].cate;
    productDescription.value = storeProduct[indexUpdata].desc;


    storeProduct.splice(indexUpdata, 1)
    localStorage.setItem("dataStorage", JSON.stringify(storeProduct));
    displayProduct();

    document.querySelector("#btnAdd").innerHTML = "update";

    btnAdd.addEventListener("click", function () {
        document.querySelector("#btnAdd").innerHTML = "add products";
    })
};

function deleteProduct(indexdelete) {

    storeProduct.splice(indexdelete, 1)
    localStorage.setItem("dataStorage", JSON.stringify(storeProduct));
    displayProduct();

};

function searchProduct(searchTerm) {

    let cartoona = ``;

    for (let i = 0; i < storeProduct.length; i++) {

        if (storeProduct[i].name.toLowerCase().includes(searchTerm.toLowerCase()) == true) {

            cartoona += `<tr>
                        <td>${i + 1}</td>
                        <td>${storeProduct[i].name}</td>
                        <td>${storeProduct[i].price}</td>
                        <td>${storeProduct[i].cate}</td>
                        <td>${storeProduct[i].desc}</td>
                        <td><button onclick="updataProduct(${i})" class="btn btn-outline-primary">updata</button></td>
                        <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">delete</button></td>
                    </tr>`
        }
    }


    document.querySelector("#tableProduct").innerHTML = cartoona;

}

function validationName() {

    let regex = /^[A-Z][a-z]{3,8}$/;
    if (regex.test(productName.value) == true) {
        productName.classList.add("is-valid");
        productName.classList.remove("is-invalid");
        regxName.classList.replace("d-block", "d-none");
        return true;
    }
    else {
        productName.classList.add("is-invalid")
        productName.classList.remove("is-valid")
        regxName.classList.replace("d-none", "d-block")
        return false;
    }
}
function validationPrice() {

    let regex = /^[1-9][0-9]{1,4}$/;
    if (regex.test(productPrice.value) == true) {
        productPrice.classList.add("is-valid");
        productPrice.classList.remove("is-invalid");
        regxprice.classList.replace("d-block", "d-none");
        return true;
    }
    else {
        productPrice.classList.add("is-invalid")
        productPrice.classList.remove("is-valid")
        regxprice.classList.replace("d-none", "d-block")
        return false;
    }
}
function validationCate() {

    let regex = /^[A-Z][a-z]{3,8}$/;
    if (regex.test(productCategory.value) == true) {
        productCategory.classList.add("is-valid");
        productCategory.classList.remove("is-invalid");
        regxCate.classList.replace("d-block", "d-none");
        return true;
    }
    else {
        productCategory.classList.add("is-invalid")
        productCategory.classList.remove("is-valid")
        regxCate.classList.replace("d-none", "d-block")
        return false;
    }
}

productName.addEventListener("blur", validationName);
productPrice.addEventListener("blur", validationPrice);
productCategory.addEventListener("blur", validationCate);


function validationProducts() {

    validationName();
    validationPrice();
    validationCate();

    if (validationName() == true && validationName() != '' && validationPrice() == true && validationPrice() != '' && validationCate() == true && validationCate() != '') {
        return true;
    }
    else {
        return false;
    }
}