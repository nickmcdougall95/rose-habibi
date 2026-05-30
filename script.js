const products = [
  {
    name: "Habibi Gold Bikini",
    price: 79,
    category: "Bikinis",
    description: "Luxury gold-inspired bikini.",
    image: "images/gold-bikini.jpg",
    buttonText: "Add to Cart"
  },
  {
    name: "Dubai Rose Bikini",
    price: 89,
    category: "Bikinis",
    description: "Luxury floral swimwear.",
    image: "images/rose-bikini.jpg",
    buttonText: "Add to Cart"
  },
  {
    name: "Dubai Rose Cover-Up",
    price: 59,
    category: "Cover Ups",
    description: "Elegant beach cover-up.",
    image: "images/cover-up.jpg",
    buttonText: "Add to Cart"
  },
  {
    name: "Model Portfolio Package",
    price: 299,
    category: "Services",
    description: "Portfolio development for models.",
    image: "images/model-service.jpg",
    buttonText: "Book Service"
  }
];

let cart = JSON.parse(localStorage.getItem("roseHabibiCart")) || [];
let discountPercent = 0;

function displayProducts(items) {
  const container = document.getElementById("products");
  if (!container) return;

  container.innerHTML = "";

  items.forEach(function(product) {
    container.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}" class="product-photo">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <span>$${product.price}.00</span>
        <button onclick="addToCart('${product.name}')">${product.buttonText}</button>
      </div>
    `;
  });
}

function addToCart(productName) {
  const product = products.find(function(item) {
    return item.name === productName;
  });

  cart.push(product);
  saveCart();
  updateCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCart();
}

function saveCart() {
  localStorage.setItem("roseHabibiCart", JSON.stringify(cart));
}

function applyCoupon() {

  const code =
  document.getElementById("coupon-code")
  .value
  .toUpperCase();

  const message =
  document.getElementById("coupon-message");

  if(code === "WELCOME10") {

    discountPercent = 10;

    message.textContent =
    "10% discount applied!";

  }

  else if(code === "MIAMI15") {

    discountPercent = 15;

    message.textContent =
    "15% discount applied!";

  }

  else if(code === "HABIBI25") {

    discountPercent = 25;

    message.textContent =
    "25% discount applied!";

  }

  else {

    discountPercent = 0;

    message.textContent =
    "Invalid code.";

  }

  updateCart();

}

function updateCart() {
  const cartCount = document.getElementById("cart-count");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (cartCount) {
    cartCount.textContent = cart.length;
  }

  if (!cartItems) return;

  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach(function(item, index) {
    total = total + item.price;

    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${item.name}</span>
        <strong>$${item.price}.00</strong>
        <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
  });

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
  }

  const discountAmount =
total * (discountPercent / 100);

const finalTotal =
total - discountAmount;

if(cartTotal){

cartTotal.textContent =
finalTotal.toFixed(2);

}
}

function filterProducts(category) {
  if (category === "All") {
    displayProducts(products);
  } else {
    const filteredProducts = products.filter(function(product) {
      return product.category === category;
    });

    displayProducts(filteredProducts);
  }
}

displayProducts(products);
updateCart();

/* --- TO ADD NEW PRODUCTS ADD THIS ----
{
  name: "New Product Name",
  price: 99,
  description: "Write the product description here.",
  imageText: "Product Image",
  buttonText: "Add to Cart"
},

*/