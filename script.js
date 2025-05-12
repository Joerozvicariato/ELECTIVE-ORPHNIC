// Function to handle login
function handleLogin(event) {
  event.preventDefault();

  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  if (!emailInput || !passwordInput) {
    alert('Login form elements not found.');
    return;
  }

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (email && password) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    window.location.href = 'index.html';
  } else {
    alert('Please enter both email and password.');
  }
}

// Function to check login status
function checkLoginStatus() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const userEmail = localStorage.getItem('userEmail');
  const loginStatus = document.getElementById('loginStatus');

  if (isLoggedIn === 'true' && userEmail && loginStatus) {
    loginStatus.textContent = `Logged in as: ${userEmail}`;
  }
}

// Function to handle logout
function handleLogout() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userEmail');
  window.location.href = 'login.html';
}

// Product data
const products = [
  {
    id: 1,
    name: "H3 Wireless Gaming Headset",
    image: "https://c.animaapp.com/mac51o5lTkqeso/img/item1.png",
    rating: 4.5,
    price: 350
  },
  {
    id: 2,
    name: "Kingston Fury Beast RGB 32GB (2x16GB) 6000MT/s DDR5 CL30 Memory",
    image: "https://c.animaapp.com/mac51o5lTkqeso/img/item1-1.png",
    rating: 4,
    price: 350
  },
  {
    id: 3,
    name: "GOWENIC DDR4 Motherboard, LGA 1150 Motherboard",
    image: "https://c.animaapp.com/mac51o5lTkqeso/img/item1-2.png",
    rating: 3.5,
    price: 350
  },
  {
    id: 4,
    name: "Cooler Master 240 Core II AIO CPU Liquid Cooler",
    image: "https://c.animaapp.com/mac51o5lTkqeso/img/item1-3.png",
    rating: 4,
    price: 350
  }
];

// Generate star ratings
function generateStarRating(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  let starsHTML = '';

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      starsHTML += '<span class="star full">★</span>';
    } else if (i === fullStars && halfStar) {
      starsHTML += '<span class="star half">★</span>';
    } else {
      starsHTML += '<span class="star empty">☆</span>';
    }
  }

  return starsHTML;
}

// Render product cards
function renderProductCards() {
  const productGrid = document.querySelector('.product-grid');
  if (!productGrid) return;

  productGrid.innerHTML = '';

  products.forEach(product => {
    const productCard = document.createElement('article');
    productCard.className = 'item-card';
    productCard.dataset.productId = product.id;

    productCard.innerHTML = `
      <div class="product-details">
        <img class="item" src="${product.image}" alt="${product.name}" />
        <h3 class="title">${product.name}</h3>
        <div class="rating">${generateStarRating(product.rating)}</div>
        <div class="price">
          <span class="currency">₱</span>
          <span class="price-2">${product.price}</span>
        </div>
        <button class="add-cart-button" aria-label="Add to cart">
          <img class="cart-icon-2" src="https://c.animaapp.com/mac51o5lTkqeso/img/carticon.png" alt="Cart icon" />
        </button>
        <button class="buy-button"><span class="text-wrapper-4">BUY</span></button>
      </div>
    `;
    productGrid.appendChild(productCard);
  });
}
document.addEventListener('DOMContentLoaded', () => {
  const filterLinks = document.querySelectorAll('.sidebar a');
  const productCards = document.querySelectorAll('.product-card');

  filterLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const filter = link.getAttribute('data-filter');

      productCards.forEach(card => {
        if (filter === 'All' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex'; // show
        } else {
          card.style.display = 'none'; // hide
        }
      });
    });
  });
});