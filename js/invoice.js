let products = [
    {
        id : 1,
        name : "apple",
        price : 1000
    },
    {
        id : 2,
        name : "orange",
        price : 800
    },
    {
        id : 3,
        name : "mango",
        price : 500
    },
    {
        id : 4,
        name : "banana",
        price : 300
    },
    {
        id : 5,
        name : "juice",
        price : 2000
    },
    {
        id : 7,
        name : "coconut",
        price : 2000
    },
    {
        id : 8,
        name : "kiwi",
        price : 1500
    },
];
// if(localStorage.getItem("products")){
//     products = JSON.parse(localStorage.getItem("products"))
// }

const invoiceNumber = document.querySelector("#invoice-number");
const invoiceDate = document.querySelector("#invoice-date");
const selectForm = document.querySelector("#formSelect");
const selectProduct = document.querySelector("#selectProduct");
const quantity = document.querySelector("#quantity");
const rows = document.querySelector("#rows");
const totalCost = document.querySelector(".total");
const productModal = document.querySelector(".productModal");
const newProductForm = document.querySelector("#newProductForm");

const newProductModal = new bootstrap.Modal("#newProductModal");
productModal.addEventListener("click",function(){
    newProductModal.toggle();

})

newProductForm.addEventListener("submit",function(e) {
    e.preventDefault();
    let formData = new FormData(this);
    products.push({
        id : Number(formData.get("id")),
        name : formData.get("name"),
        price : formData.get("price")
    })
    // localStorage.setItem("products",JSON.stringify(products))
    let bb = document.createElement('option');
    bb.innerText = formData.get("name");
    bb.value = formData.get("id");
    selectProduct.append(bb)
    console.log(bb)
    newProductModal.toggle();
  
})


//generate invoice number
const getRandomId = (min = 100000, max = 999999) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const num =  Math.floor(Math.random() * (max - min + 1)) + min;
    return num.toString().padStart(6, "0")
  };

let calculateCost = () =>{
    let costs  = document.querySelectorAll(".cost");
    let total = 0;
    costs.forEach(cost => total += parseFloat(cost.innerText));
    totalCost.innerText = total;
    var msg = new SpeechSynthesisUtterance();
    msg.text = total + "dollars";
    window.speechSynthesis.speak(msg);


}

products.forEach((product) => {
    let aa = document.createElement('option');
    aa.innerText = product.name;
    aa.value = product.id;
    selectProduct.append(aa)
    console.log(aa)
});

selectForm.addEventListener("submit", e => {
    event.preventDefault();
    let formData = new FormData(selectForm);
    let currentProduct = products.find(product => product.id === parseInt(formData.get("product")));
    const currentRow = document.querySelectorAll("[product-id]");
    const isExist = [...currentRow].find(row => row.getAttribute('product-id') == currentProduct.id);
    if(isExist){
        let currentRow =  isExist.querySelector(".quantity");
        currentRow.innerText = parseFloat(currentRow.innerText) + parseFloat(formData.get("quantity"));
        isExist.querySelector(".cost").innerText = currentRow.innerText * parseFloat(currentProduct.price);
        calculateCost();
    }else{
        const tr = document.createElement("tr");
        tr.setAttribute("product-id",currentProduct.id)
        tr.innerHTML = ` <td><button class=" d-print-none btn btn-sm btn-outline-danger del-row"><i class="bi bi-trash pe-none"></i></button></td>
        <td>${currentProduct.name}</td>
        <td>${currentProduct.price}</td>
        <td class="quantity">${formData.get('quantity')}</td>
        <td class="cost ">${currentProduct.price * formData.get('quantity') }</td>`;
        rows.append(tr);
        selectForm.reset();
        calculateCost();
    }
})

rows.addEventListener("click",(e) => {
    if(e.target.classList.contains("del-row")){
        if(confirm("Are u sure to delete")){
            e.target.closest("tr").remove();
            calculateCost();
        };
    }
})

 invoiceNumber.value = getRandomId();
 invoiceDate.valueAsDate = new Date();

