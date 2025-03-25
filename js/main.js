const productsContainer = document.getElementById('product-container');

const cartIcon = document.getElementById("imgCarrito");
const cartPopup = document.getElementById("cart-popup");
const cartItemsList = document.getElementById("cart-items-list");
const cartTotal = document.getElementById("cart-total");
const closeCartPopup = document.getElementById("close-cart-popup");
let cart = [];


const productsArray = [
    {
        "id": 1,
        "name": "Camisa Formal",
        "description": "Camisa blanca de algodón premium para ocasiones especiales.",
        "size": ["S", "M", "L", "XL", "XXL"],
        "price": 49990,
        "image": "https://images.unsplash.com/photo-1603252109303-2751441dd157?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3"
    },
    {
        "id": 2,
        "name": "Pantalón de Vestir",
        "description": "Elegante y cómodo pantalón beige, ideal para la oficina o eventos.",
        "size": ["S", "M", "L", "XL", "XXL"],
        "price": 59990,
        "image": "https://hips.hearstapps.com/hmg-prod/images/mejores-pantalones-hombre-primavera-octobre-editions-1648213151.jpg"
    },
    {
        "id": 3,
        "name": "Zapatos de Cuero",
        "description": "Estilo y durabilidad en un solo calzado (marrón).",
        "size": [30, 35, 40.5, 42, 44],
        "price": 79990,
        "image": "https://cdn.shopify.com/s/files/1/0519/8302/4306/files/Zoom-shoes-Blog-for-7-reasons-to-love-genuine-leather-shoes-for-men-section-image-03_480x480.jpg"
    },
    {
        "id": 4,
        "name": "Camiseta Polo",
        "description": "Camiseta polo azul marino, perfecta para un look casual y elegante.",
        "size": ["S", "M", "L", "XL", "XXL"],
        "price": 35990,
        "image": "https://ss261.liverpool.com.mx/xl/1138513340.jpg"
    },
    {
        "id": 5,
        "name": "Jeans Slim Fit",
        "description": "Vaqueros ajustados azul oscuro con un diseño moderno.",
        "size": ["S", "M", "L", "XL", "XXL"],
        "price": 64990,
        "image": "https://images.unsplash.com/photo-1714729382642-59f19c74440e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        "id": 6,
        "name": "Blazer Negro",
        "description": "Blazer negro de corte elegante, ideal para ocasiones formales.",
        "size": ["S", "M", "L", "XL", "XXL"],
        "price": 129990,
        "image": "https://hips.hearstapps.com/hmg-prod/images/sean-opry-is-seen-attending-boss-during-mens-new-york-news-photo-1712071610.jpg?crop=0.669xw:1.00xh;0.194xw,0&resize=640:*"
    },
    {
        "id": 7,
        "name": "Sweater de Lana",
        "description": "Sweater de lana beige, perfecto para el invierno.",
        "size": ["S", "M", "L", "XL", "XXL"],
        "price": 69990,
        "image": "https://www.bananarepublic.cl/media/catalog/product/b/r/br568513_br01_1_1.jpg?optimize=medium&bg-color=255,255,255&height=1305&width=960&canvas=960:1305"
    },
    {
        "id": 8,
        "name": "Zapatillas Deportivas",
        "description": "Zapatillas deportivas blancas cómodas y resistentes.",
        "size": [39, 40, 41, 42, 43, 44],
        "price": 99990,
        "image": "https://images.unsplash.com/photo-1738166936510-2c3e45422945?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        "id": 9,
        "name": "Chaqueta de Cuero",
        "description": "Chaqueta de cuero negra para un look moderno y audaz.",
        "size": ["S", "M", "L", "XL"],
        "price": 149990,
        "image": "https://acdn-us.mitiendanube.com/stores/001/344/226/products/dsc012471-704fd877988630a84e16265435413275-480-0.jpg"
    },
    {
        "id": 10,
        "name": "Camisa de Lino",
        "description": "Camisa de lino beige para un estilo fresco y cómodo.",
        "size": ["S", "M", "L", "XL", "XXL"],
        "price": 45990,
        "image": "https://i.pinimg.com/474x/39/55/9c/39559c576b171c7d1ece530bb9c25868.jpg"
    },
    {
        "id": 11,
        "name": "Pantalón Cargo",
        "description": "Pantalón cargo verde oliva con múltiples bolsillos.",
        "size": ["S", "M", "L", "XL", "XXL"],
        "price": 52990,
        "image": "https://i.pinimg.com/736x/9a/5c/3e/9a5c3e21bf3030f44366a2780559ed3c.jpg"
    },
    {
        "id": 12,
        "name": "Botines de Cuero",
        "description": "Botines de cuero negro de alta calidad.",
        "size": [39, 40, 41, 42, 43, 44],
        "price": 129990,
        "image": "https://dcuero.com.ec/wp-content/uploads/2022/01/IMG_1010.jpg"
    },
    {
        "id": 13,
        "name": "Abrigo de Invierno",
        "description": "Abrigo largo negro con forro térmico.",
        "size": ["S", "M", "L", "XL"],
        "price": 179990,
        "image": "https://m.media-amazon.com/images/I/5166AmNdPwL._AC_UF894,1000_QL80_.jpg"
    },
    {
        "id": 14,
        "name": "Camiseta Básica",
        "description": "Camiseta blanca básica de algodón suave.",
        "size": ["S", "M", "L", "XL", "XXL"],
        "price": 19990,
        "image": "https://images.unsplash.com/photo-1581655353564-df123a1eb820?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        "id": 15,
        "name": "Pantalón Jogger",
        "description": "Pantalón jogger gris ideal para un look relajado.",
        "size": ["S", "M", "L", "XL", "XXL"],
        "price": 39990,
        "image": "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/a748464ac9135a211430a4e293fe9377.jpg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp"
    },
    {
        "id": 16,
        "name": "Cinturón de Cuero",
        "description": "Cinturón de cuero negro con hebilla metálica.",
        "size": ["Único"],
        "price": 29990,
        "image": "https://images.unsplash.com/photo-1664285612706-b32633c95820?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        "id": 17,
        "name": "Chaleco Acolchado",
        "description": "Chaleco acolchado negro para días fríos.",
        "size": ["S", "M", "L", "XL"],
        "price": 89990,
        "image": "https://cdn.laredoute.com/cdn-cgi/image/width=400,height=400,fit=pad,dpr=1/products/6/b/0/6b05def1ff05c101cb6dd853309a407d.jpg"
    },
    {
        "id": 18,
        "name": "Mocasines",
        "description": "Mocasines marrones elegantes y cómodos.",
        "size": [39, 40, 41, 42, 43, 44],
        "price": 84990,
        "image": "https://images.unsplash.com/photo-1616243344308-04fb7e776cfe?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        "id": 19,
        "name": "Bufanda de Lana",
        "description": "Bufanda de lana gris para mayor calidez.",
        "size": ["Único"],
        "price": 19990,
        "image": "https://realfabrica.com/cdn/shop/files/Bufanda-de-Lana-Gris-Perla-Cadiz.jpg?v=1713785487"
    },
    {
        "id": 20,
        "name": "Guantes de Cuero",
        "description": "Guantes de cuero negro con interior térmico.",
        "size": ["S", "M", "L"],
        "price": 34990,
        "image": "https://http2.mlstatic.com/D_NQ_NP_689487-MLA69472407497_052023-O.webp"
    }
];



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




initializeProductsFrontEnd(productsArray);


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
    //alert("Compra realizada con éxito!");
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
       // alert("El carrito está vacío. Agrega productos antes de proceder al pago.");
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