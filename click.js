const cartItemsContainer = document.getElementById('cart-items');
const checkoutButton = document.getElementById('checkout-now');
const checkoutForm = document.getElementById('checkout-form');
const originalPriceEl = document.getElementById('original-price');
const estimatedTotalEl = document.getElementById('estimated-total');
const thankYouModal = document.getElementById('thank-you-modal');
const customerEmailEl = document.getElementById('customer-email');
const continueSummaryButton = document.getElementById('continue-summary');
const emailInput = document.getElementById('customer-email-input');
const form = document.getElementById('checkout-form-submit');

const feedbackModal = document.getElementById('feedback-modal');
const feedbackButton = document.querySelector('.feedback-btn');

if (feedbackButton) {
  feedbackButton.addEventListener('click', () => {
    feedbackModal.style.display = 'block';
  });
}

function closeFeedbackModal() {
  feedbackModal.style.display = 'none';
}

function submitFeedback() {
  const feedback = document.getElementById('feedback-text').value;
  if (feedback.trim() === "") {
    alert("Please enter your feedback before submitting.");
    return;
  }
  alert("Thank you for your feedback!");
  document.getElementById('feedback-text').value = "";
  feedbackModal.style.display = 'none';
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderCart() {
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    checkoutButton.style.display = 'none';
    return;
  }

  cartItemsContainer.innerHTML = '';
  let totalPrice = 0;

  cart.forEach(item => {
    const itemPrice = parseFloat(item.price.replace('₱', '').replace(',', ''));
    totalPrice += itemPrice * item.quantity;

    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
      <img src="${item.imgSrc}" alt="${item.name}">
      <div class="cart-item-info">
        <h3>${item.name}</h3>
        <p>Size: ${item.size}</p>
        <p>Quantity: ${item.quantity}</p>
        <p>Price: ₱${itemPrice.toFixed(2)}</p>
      </div>
    `;
    cartItemsContainer.appendChild(div);
  });

  originalPriceEl.textContent = `₱${totalPrice.toFixed(2)}`;
  const estimatedTotal = totalPrice + 550;
  estimatedTotalEl.textContent = `₱${estimatedTotal.toFixed(2)}`;
}

checkoutButton.addEventListener('click', () => {
  checkoutButton.style.display = 'none';
  checkoutForm.style.display = 'flex';
});

function validateForm() {
  const requiredFields = [
    'first-name', 'last-name', 'address-line-1', 'postal-code', 'city', 'state', 'phone', 'customer-email-input'
  ];
  for (let fieldId of requiredFields) {
    const field = document.getElementById(fieldId);
    if (!field.value) {
      alert('Please fill in all required fields.');
      return false;
    }
  }
  return true;
}

form.addEventListener('submit', function(event) {
  event.preventDefault();
  if (!validateForm()) return;

  localStorage.removeItem('cart');
  customerEmailEl.textContent = emailInput.value;
  thankYouModal.style.display = 'block';
  cart = [];
  renderCart();
});

continueSummaryButton.addEventListener('click', function() {
  if (!validateForm()) return;

  localStorage.removeItem('cart');
  customerEmailEl.textContent = emailInput.value;
  thankYouModal.style.display = 'block';
  cart = [];
  renderCart();
});

window.addEventListener('click', function(event) {
  if (event.target === thankYouModal) {
    thankYouModal.style.display = 'none';
  }
});
