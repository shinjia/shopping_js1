<!-- cart.js -->
const PRODUCTS = [
    { id: 1, name: "Product A", description: "<p>Description of Product A</p>", price: 100 },
    { id: 2, name: "Product B", description: "<p>Description of Product B</p>", price: 200 },
    { id: 3, name: "Product C", description: "<p>Description of Product C</p>", price: 300 },
    { id: 4, name: "Product D", description: "<p>Description of Product D</p>", price: 400 },
    { id: 5, name: "Product E", description: "<p>Description of Product E</p>", price: 500 },
    { id: 6, name: "Product F", description: "<p>Description of Product F</p>", price: 600 },
    { id: 7, name: "Product G", description: "<p>Description of Product G</p>", price: 700 },
    { id: 8, name: "Product H", description: "<p>Description of Product H</p>", price: 800 },
    { id: 9, name: "Product I", description: "<p>Description of Product I</p>", price: 900 },
    { id: 10, name: "Product J", description: "<p>Description of Product J</p>", price: 1000 }
];

const CART_KEY = "shopping_cart";

function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function updateCartCount() {
    const cart = getCart();
    const itemCount = cart.length; // Count of unique items in the cart
    document.querySelectorAll("#cart-count").forEach(el => el.textContent = itemCount);
}

function addToCart(productId, quantity = 1) {
    const cart = getCart();
    const index = cart.findIndex(item => item.id === productId);
    if (index > -1) {
        cart[index].quantity += quantity;
    } else {
        cart.push({ id: productId, quantity });
    }
    saveCart(cart);
    updateCartCount();
}

function renderCartItems() {
    const cart = getCart();
    const tbody = document.querySelector("#cart-items tbody");
    tbody.innerHTML = "";
    let totalPrice = 0;

    cart.forEach(item => {
        const product = PRODUCTS.find(p => p.id === item.id);
        const row = document.createElement("tr");
        totalPrice += product.price * item.quantity;

        row.innerHTML = `
            <td>${product.name}</td>
            <td><input type="number" value="${item.quantity}" min="1" onchange="updateCartQuantity(${item.id}, this.value)"></td>
            <td>$${product.price * item.quantity}</td>
            <td><button onclick="removeFromCart(${item.id})">Remove</button></td>
        `;
        tbody.appendChild(row);
    });

    document.getElementById("total-price").textContent = `Total: $${totalPrice}`;
}

function removeFromCart(productId) {
    const cart = getCart().filter(item => item.id !== productId);
    saveCart(cart);
    renderCartItems();
    updateCartCount();
}

function updateCartQuantity(productId, quantity) {
    const cart = getCart();
    const index = cart.findIndex(item => item.id === productId);
    if (index > -1) {
        cart[index].quantity = parseInt(quantity, 10);
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
    }
    saveCart(cart);
    renderCartItems();
    updateCartCount();
}

function renderCheckoutItems() {
    const cart = getCart();
    const tbody = document.querySelector("#checkout-items tbody");
    tbody.innerHTML = "";
    let totalPrice = 0;

    cart.forEach(item => {
        const product = PRODUCTS.find(p => p.id === item.id);
        const row = document.createElement("tr");
        totalPrice += product.price * item.quantity;

        row.innerHTML = `
            <td>${product.name}</td>
            <td>${item.quantity}</td>
            <td>$${product.price * item.quantity}</td>
        `;
        tbody.appendChild(row);
    });

    document.getElementById("total-price-checkout").textContent = `Total: $${totalPrice}`;
}

function continueShopping() {
    window.location.href = "products.html";
}

function checkout() {
    window.location.href = "checkout.html";
}
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    if (document.querySelector("#cart-items")) {
        renderCartItems();
    }
    if (document.querySelector("#checkout-items")) {
        renderCheckoutItems();
    }
});
