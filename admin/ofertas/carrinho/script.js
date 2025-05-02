const openCartBtn = document.getElementById('open-cart');
const closeCartBtn = document.getElementById('close-cart');
const cartModal = document.getElementById('cart-modal');
const cartOverlay = document.getElementById('cart-overlay');

function openCart() {
  cartModal.classList.remove('closed');
}

function closeCart() {
  cartModal.classList.add('closed');
}

openCartBtn.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);
