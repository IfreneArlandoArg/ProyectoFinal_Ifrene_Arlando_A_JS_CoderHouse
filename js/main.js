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
        showSweetAlert("error","Oops...",`${error}`);
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
        showSweetAlert("error","Oops...","No data found!");

    }
})



//functions...

//Sweet Alert...

function showSweetAlert(icon, title, text){

return    Swal.fire({
        title: title,
        icon: icon,
        text: text,
        theme: "dark",
        draggable: true
      });
}

//Generate invoice pdf
function generateInvoicePDF(data) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const { InfoCliente, Cart } = data;

    const fecha = new Date().toLocaleDateString();
    const facturaId = "FAC-" + Math.floor(100000 + Math.random() * 900000);

    doc.setFontSize(16);
    doc.text("Factura de Compra - Pago Confirmado", 20, 20);

    doc.setFontSize(10);
    doc.text(`Fecha: ${fecha}`, 20, 28);
    doc.text(`N° Factura: ${facturaId}`, 150, 28);

    doc.setFontSize(12);
    doc.text(`Cliente: ${InfoCliente.name}`, 20, 40);
    doc.text(`Dirección: ${InfoCliente.address}`, 20, 48);
    doc.text(`Teléfono: ${InfoCliente.phone}`, 20, 56);
    doc.text(`Método de Pago: ${InfoCliente.paymentMethod === "credit" ? "Tarjeta de Crédito" : "Tarjeta de Débito"}`, 20, 64);
    
    if (InfoCliente.paymentMethod === "credit") {
        doc.text(`Cuotas: ${InfoCliente.installments}`, 20, 72);
    }

    let y = InfoCliente.paymentMethod === "credit" ? 88 : 80;
    doc.setFontSize(13);
    doc.text("Detalle de Productos", 20, y);

    y += 10;
    doc.setFontSize(11);
    Cart.forEach((item, index) => {
        doc.text(`${index + 1}. ${item.name} | Talle: ${item.size} | Cant: ${item.quantity} | Subtotal: $${item.price * item.quantity}`, 20, y);
        y += 8;
    });

    const total = Cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    y += 10;
    doc.setFontSize(14);
    doc.text(`TOTAL PAGADO: $${total}`, 20, y);

    y += 15;
    doc.setFontSize(11);
    doc.text("Gracias por tu compra. Esta factura confirma que el pago fue recibido con éxito.", 20, y);

    const blob = doc.output("blob");
    const url = URL.createObjectURL(blob);

    
    return  { url, facturaId };
}





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

// Update Cart Display with Increment and Decrement Buttons
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
                <p>${item.size} | Cantidad: 
                    <button class="btn btn-sm btn-secondary decrease-item" data-index="${index}">-</button>
                    ${item.quantity}
                    <button class="btn btn-sm btn-secondary increase-item" data-index="${index}">+</button>
                </p>
                <p class="cart-price">$${item.price * item.quantity}</p>
                <button class="btn btn-danger btn-sm remove-item" data-index="${index}">Eliminar</button>
            </div>
        `;

        cartItemsList.appendChild(cartItem);
    });

    cartTotal.innerHTML = `Total: $${total}`;
    document.getElementById("cart-count").innerText = cart.length;

    // Agregar botón "Vaciar Carrito" si hay productos
    if (cart.length > 0) {
        if (!document.getElementById("empty-cart-button")) {
            const emptyCartBtn = document.createElement("button");
            emptyCartBtn.id = "empty-cart-button";
            emptyCartBtn.className = "btn btn-warning mt-2";
            emptyCartBtn.innerText = "Vaciar Carrito";
            emptyCartBtn.addEventListener("click", emptyCart);
            cartPopup.appendChild(emptyCartBtn);
        }
    } else {
        const emptyCartBtn = document.getElementById("empty-cart-button");
        if (emptyCartBtn) emptyCartBtn.remove();
    }
}

// Event listener for cart actions
document.addEventListener("click", function (event) {
   

    if (event.target.classList.contains("remove-item")) {
        const index = event.target.getAttribute("data-index");
        cart.splice(index, 1);
        updateCartDisplay();
    }

    if (event.target.classList.contains("increase-item")) {
        const index = event.target.getAttribute("data-index");
        cart[index].quantity++;
        updateCartDisplay();
    }

    if (event.target.classList.contains("decrease-item")) {
        const index = event.target.getAttribute("data-index");
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            cart.splice(index, 1);
        }
        updateCartDisplay();
    }
});

// Vaciar carrito
function emptyCart() {
    cart = [];
    updateCartDisplay();
}

// Mostrar/Ocultar el carrito
cartIcon.addEventListener("click", () => {
    cartPopup.classList.toggle("show");
});

// Cerrar el carrito
closeCartPopup.addEventListener("click", () => {
    cartPopup.classList.remove("show");
});

// Cargar productos al inicio
document.addEventListener("DOMContentLoaded", () => {
    getData();
    updateCartDisplay();
});

//fin



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
const textBoxEmail = document.getElementById("email");




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
    textBoxEmail.value = "";
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
        email: textBoxEmail.value,
        paymentMethod: paymentMethod.value,
        installments: paymentMethod.value === "credit" ? parseInt(installmentsSelect.value) : 1
    };

    const purchaseData = {
        InfoCliente: customerInfo,
        Cart: cart
    };

    cleanCheckoutInputs();

    localStorage.setItem("compra", JSON.stringify(purchaseData));

    
   
   const { url, facturaId} = generateInvoicePDF(purchaseData);

      // 🎯 Fill the hidden form dynamically
    document.getElementById("facturaID").value = facturaId;
    document.getElementById("to_name").value = customerInfo.name;
    document.getElementById("to_email").value = customerInfo.email;
    document.getElementById("total").value = `${cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}`;
    document.getElementById("orderDate").value = `${new Date().toLocaleDateString()}`;

    
    document.getElementById("content").value = getStringProductsFromCart(cart);

    

    // 📧 Send form with EmailJS
    const emailForm = document.getElementById("emailForm");

    
    emailjs.sendForm("service_b8k2mxn", "template_migk0l1", emailForm)
        .then(() => {
            Swal.fire({
                icon: "success",
                title: "Compra completa!",
                html: `<p>Factura enviada exitosamente al ${customerInfo.email}</p>
                       <p>Se puede descargar desde el enlace de descarga de factura.<br>👇🏽</p>
                       <a href="${url}" download="factura_${facturaId}.pdf" target="_blank"><strong>Descargar factura ${facturaId}</strong></a>`,
                theme: "dark",
                footer: `<a href="#" target="_blank" >© ${new Date().getFullYear()} Indumentaria Hombre </a>`,
                draggable: true
            });
        })
        .catch((error) => {
            console.log(error);
            
            Swal.fire({
                icon: "warning",
                title: "Compra completa!",
                html: `<p>No se pudo enviar la factura por email</p> 
                       <p>${customerInfo.email}</p> 
                       <p>Se puede descargar desde el enlace de descarga de factura.<br>👇🏽</p>
                       <a href="${url}" download="factura_${facturaId}.pdf" target="_blank"><strong>Descargar factura ${facturaId}</strong></a>`,
                theme: "dark",
                footer: `<a href="#" target="_blank" >© ${new Date().getFullYear()} Indumentaria Hombre </a>`,
                draggable: true
            });
        });




    cleanEmailForm();
    cart = [];
    updateCartDisplay();
    checkoutPopup.classList.add("d-none");
});

function getStringProductsFromCart(pCart){
    
    let productsString = '\n';
    
    
    pCart.forEach((item, index) => {
        productsString += `${index + 1}. ${item.name} | Talle: ${item.size} | Cant: ${item.quantity} | Subtotal: $ ${item.price * item.quantity}\n`;
        
    });


    return productsString; 

}

function cleanEmailForm(){
    document.getElementById("facturaID").value = "";
    document.getElementById("to_name").value = "";
    document.getElementById("to_email").value = "";
    document.getElementById("total").value = "";
    document.getElementById("orderDate").value = "";

    
    document.getElementById("content").value = "";
}






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
      
        showSweetAlert("error","Carrito vacío!","Agregar productos antes de proceder al pago.");
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


