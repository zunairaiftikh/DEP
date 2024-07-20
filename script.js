import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, get, onValue } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDo1QoY1vszjzzB3z255B6QmArXIibABJ8",
    authDomain: "practice-972fd.firebaseapp.com",
    projectId: "practice-972fd",
    storageBucket: "practice-972fd.appspot.com",
    messagingSenderId: "125680890263",
    appId: "1:125680890263:web:84ecb7fd02291371b414d2",
    measurementId: "G-DWMDHDXMRY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const products = [
    { id: 1, name: 'Classic Mug', price: 10, image: 'images/mug1.jpg' },
    { id: 2, name: 'Travel Mug', price: 15, image: 'images/mug2.jpg' },
    { id: 3, name: 'Magic Mug', price: 20, image: 'images/mug3.jpg' }
];

let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('product-list')) {
        displayProducts();
    }
    if (document.getElementById('cart-list')) {
        displayCart();
    }
});

function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear previous content if any
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}" width="350px" class="product-image">
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <button onclick="addToCart(${product.id})" class="btn">Add to Cart</button>
        `;
        productList.appendChild(productItem);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        alert(`${product.name} has been added to your cart.`);
        displayCart(); // Update the cart display after adding
    }
}

function displayCart() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = ''; // Clear previous content if any
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" width="150px" class="cart-image">
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>
        `;
        cartList.appendChild(cartItem);
    });
}

function placeOrder() {
    if (cart.length === 0) {
        alert('Your cart is empty.');
        return;
    }
    alert('Thank you for your order!');
    cart = [];
    displayCart(); // Update the cart display after placing the order
}
