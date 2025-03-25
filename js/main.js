const productsContainer = document.getElementById('product-container');

const cartIcon = document.getElementById("imgCarrito");
const cartPopup = document.getElementById("cart-popup");
const cartItemsList = document.getElementById("cart-items-list");
const cartTotal = document.getElementById("cart-total");
const closeCartPopup = document.getElementById("close-cart-popup");
let cart = [];

//get data for products array...

async function getData() {
    try {
        const response = await fetch("./db/data.json");
        const data = await response.json();
        return data;
        
    } catch (error) {
        //sweet alert...
        alert(`${error}`);
        return null;
    }
    
}

getData().then(data => {
    if (data) {
        const productsArray = [];
        productsArray.push(...data);
        initializeProductsFrontEnd(productsArray)
    }
    else{
        //sweet alert....No data found

    }
})



//functions...
//Generate Product Cards
function generateProductCard(product) {
    const productCard = document.createElement("div");
    productCard.className = "col-md-4";

    productCard.innerHTML = `
        <div class="card">
            <img src="${product.image}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <p class="price">$${product.price}</p>

                <!-- Size Selector -->
                <select class="form-select size-select cantidad-select">
                    ${product.size.map(size => `<option value="${size}">Tamaño: ${size}</option>`).join('')}
                </select>

                <!-- Quantity Selector -->
                <select class="form-select quantity-select cantidad-select">
                    ${[1, 2, 3, 4, 5].map(q => `<option value="${q}">${q} U.</option>`).join('')}
                </select>

                <button class="btn btn-primary btn-add-cart">Agregar al Carrito</button>
            </div>
        </div>
    `;

    return productCard;
}


// ✅ Add to Cart Array
function addToCart(product) {
    const existingProduct = cart.find(item => item.name === product.name && item.size === product.size);

    if (existingProduct) {
        existingProduct.quantity += product.quantity;
    } else {
        cart.push(product);
    }

    updateCartDisplay();
}

// Update Cart Display
function updateCartDisplay() {
    cartItemsList.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-details">
                <h6>${item.name}</h6>
                <p>${item.size} | Cantidad: ${item.quantity}</p>
                <p class="cart-price">$${item.price * item.quantity}</p>
                <button class="btn btn-danger btn-sm remove-item" data-index="${index}">Eliminar</button>
            </div>
        `;

        cartItemsList.appendChild(cartItem);
    });

    cartTotal.innerHTML = `Total: $${total}`;
    document.getElementById("cart-count").innerText = cart.length;
}




function initializeProductsFrontEnd(productsArray) {
    for(const product of productsArray) {
        
        productsContainer.appendChild(generateProductCard(product))
                
    }
}



//Event listener 
// 🛒 Add Product to Cart
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("btn-add-cart")) {
        const card = event.target.closest(".card");
        const productName = card.querySelector(".card-title").innerText;
        const productPrice = parseInt(card.querySelector(".price").innerText.replace("$", ""));
        const productImage = card.querySelector("img").src;
        const productSize = card.querySelector(".size-select").value;
        const productQuantity = parseInt(card.querySelector(".quantity-select").value);

        const product = {
            name: productName,
            price: productPrice,
            image: productImage,
            size: productSize,
            quantity: productQuantity
        };

        addToCart(product);
    }
});


// Remove Item from Cart
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-item")) {
        const index = event.target.getAttribute("data-index");
        cart.splice(index, 1);
        updateCartDisplay();
    }
});

// Show Cart Pop-up
cartIcon.addEventListener("click", function (event) {
    event.stopPropagation();
    if (cart.length === 0) {
        cartItemsList.innerHTML = "<p class='text-center'>Tu carrito está vacío.</p>";
    }
    cartPopup.classList.remove("d-none");
   
});

// Close Cart Pop-up
closeCartPopup.addEventListener("click", function () {
    cartPopup.classList.add("d-none");
});

// Close Cart Pop-up when Clicking Outside
document.addEventListener("click", function (event) {
    if (!cartPopup.contains(event.target) && event.target !== cartIcon) {
        cartPopup.classList.add("d-none");
    }
});





//CheckOUt
const checkoutBtn = document.getElementById("checkout-btn");


const checkoutPopup = document.getElementById("checkout-popup");
const closeCheckoutPopup = document.getElementById("close-checkout-popup");
const checkoutForm = document.getElementById("checkout-form");
const paymentMethod = document.getElementById("payment-method");
const installmentsSection = document.getElementById("installments-section");
const installmentsSelect = document.getElementById("installments");
const payBtn = document.getElementById("pay-btn");

const textBoxPhone = document.getElementById("phone");
const textBoxFullName = document.getElementById("full-name");
const textBoxAddress = document.getElementById("address");



// Close Checkout Pop-up
closeCheckoutPopup.addEventListener("click", function () {
    checkoutPopup.classList.add("d-none");
});

// Show Installments Section for Credit Card
paymentMethod.addEventListener("change", function () {
    if (paymentMethod.value === "credit") {
        installmentsSection.classList.remove("d-none");
    } else {
        installmentsSection.classList.add("d-none");
    }
});


function cleanCheckoutInputs() {
    textBoxAddress.value = "";
    textBoxFullName.value = "";
    textBoxPhone.value = "";
    paymentMethod.value = "debit";
    installmentsSelect.value = "1";

    installmentsSection.classList.add("d-none");
    
}

// Handle Payment
checkoutForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const customerInfo = {
        name: textBoxFullName.value,
        address: textBoxAddress.value,
        phone: textBoxPhone.value,
        paymentMethod: paymentMethod.value,
        installments: paymentMethod.value === "credit" ? parseInt(installmentsSelect.value) : 1
    };

    const purchaseData = {
        InfoCliente: customerInfo,
        Cart: cart
    };

    cleanCheckoutInputs();

    localStorage.setItem("compra", JSON.stringify(purchaseData));
    
    alertPopupText.innerText = "Compra realizada con éxito! ✅";
    alertPopup.classList.remove("d-none");
    
    cart = [];
    updateCartDisplay();
    checkoutPopup.classList.add("d-none");
});



// 🏷️ Element for Displaying Total in Checkout Pop-up
const checkoutTotalDisplay = document.getElementById("checkout-total");





// Function to Calculate and Display Total Price
function updateCheckoutTotal() {
    let totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    let paymentMethodSelected = paymentMethod.value;
    let installments = paymentMethodSelected === "credit" ? parseInt(installmentsSelect.value) : 1;
    
    if (installments === 1) {
        checkoutTotalDisplay.innerText = `Total a pagar: $${totalAmount}`;
    } else {
        let installmentValue = Math.round(totalAmount / installments);
        checkoutTotalDisplay.innerText = `Total a pagar: $${totalAmount} \n ${installments} cuotas de $${installmentValue} sin interés`;
    }
}

// 🚀 Open Checkout Pop-up (Only if Cart is Not Empty)
checkoutBtn.addEventListener("click", function () {
    if (cart.length === 0) {
      
        alertPopupText.innerText = "El carrito está vacío. Agrega productos antes de proceder al pago.";
        alertPopup.classList.remove("d-none");
        return;
    }
    
    cartPopup.classList.add("d-none");
    checkoutPopup.classList.remove("d-none");
    updateCheckoutTotal(); // Update total price display
    
});


// Update Total Display on Payment Method Change
paymentMethod.addEventListener("change", function () {
    if (paymentMethod.value === "credit") {
        installmentsSection.classList.remove("d-none");
    } else {
        installmentsSection.classList.add("d-none");
    }
    updateCheckoutTotal();
});

// Update Total Display on Installments Change
installmentsSelect.addEventListener("change", updateCheckoutTotal);


//alert pop-up
const alertPopup = document.getElementById("alert-popup");
const alertPopupText = document.getElementById("alert-popup-text");
const alertPopupOkBtn = document.getElementById("alert-popup-ok-btn");

//Closes alert pop-up

alertPopupOkBtn.addEventListener("click", () => {
    
    alertPopup.classList.add("d-none");

});