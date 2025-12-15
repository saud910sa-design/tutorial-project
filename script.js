// Global Variables
let current = {};
let cart = []; // Array to store cart items with quantities
let total = 0;

// Show Page Function
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

// Open Product Function
function openProduct(productElement) {
  const name = productElement.querySelector('h3').innerText;
  const priceText = productElement.querySelector('.price').innerText;
  const price = parseInt(priceText.replace(' ر.س', '').trim());
  const img = productElement.querySelector('img').src;

  current = {name, price, img};
  document.getElementById('p-name').innerText = name;
  document.getElementById('p-price').innerText = price + ' ر.س';
  document.getElementById('p-img').src = img;
  showPage('product');
}

// Add to Cart Function
function addToCart() {
  // Check if product already exists in cart
  const existingItem = cart.find(item => item.name === current.name);
  
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      name: current.name,
      price: current.price,
      quantity: 1
    });
  }
  
  updateCart();
}

// Update Cart Display
function updateCart() {
  const cartItemsContainer = document.getElementById('cartItems');
  cartItemsContainer.innerHTML = '';
  
  total = 0;
  let itemCount = 0;
  
  cart.forEach((item, index) => {
    // Create cart item element
    const div = document.createElement('div');
    div.className = 'cart-item';
    
    div.innerHTML = `
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${item.price} ر.س × ${item.quantity}</div>
      </div>
      <div class="cart-item-controls">
        <button class="cart-item-btn" onclick="decreaseQuantity(${index})">-</button>
        <span class="cart-item-quantity">${item.quantity}</span>
        <button class="cart-item-btn" onclick="increaseQuantity(${index})">+</button>
      </div>
    `;
    
    cartItemsContainer.appendChild(div);
    
    total += item.price * item.quantity;
    itemCount += item.quantity;
  });
  
  // Update total price
  document.getElementById('total').innerText = 'الإجمالي: ' + total + ' ر.س';
  
  // Update cart count badge
  const cartCount = document.getElementById('cartCount');
  cartCount.innerText = itemCount;
  
  // Show/hide badge based on count
  if (itemCount > 0) {
    cartCount.style.display = 'flex';
  } else {
    cartCount.style.display = 'none';
  }
}

// Increase Quantity
function increaseQuantity(index) {
  cart[index].quantity++;
  updateCart();
}

// Decrease Quantity
function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    // Remove item if quantity becomes 0
    cart.splice(index, 1);
  }
  updateCart();
}

// Toggle Cart Function
function toggleCart() {
  document.getElementById('cart').classList.toggle('active');
}

// Initialize cart count display
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('cartCount').style.display = 'none';
});