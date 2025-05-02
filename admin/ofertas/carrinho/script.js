// Elementos do carrinho
const openCartBtn = document.getElementById('open-cart');
const closeCartBtn = document.getElementById('close-cart');
const cartModal = document.getElementById('cart-modal');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');
const checkoutBtn = document.getElementById('checkout-button');

// Carrinho de compras (armazenado na memória)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Funções para abrir/fechar o modal
function openCart() {
    updateCartDisplay();
    cartModal.classList.remove('closed');
}

function closeCart() {
    cartModal.classList.add('closed');
}

// Atualiza a exibição do carrinho
function updateCartDisplay() {
    // Limpa os itens existentes
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-message">O carrinho está vazio no momento.</p>';
        cartCount.textContent = '0';
        cartTotalPrice.textContent = 'R$ 0,00';
        return;
    }
    
    // Calcula o total
    let total = 0;
    
    // Adiciona cada item ao carrinho
    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <div class="cart-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${index})">
                <ion-icon name="trash-outline"></ion-icon>
            </button>
        `;
        
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    // Atualiza contador e total
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartTotalPrice.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Adiciona produto ao carrinho (chamado pelos botões "Adicionar ao carrinho")
function addToCart(productId, productName, productPrice, productImage, quantity = 1) {
    // Verifica se o produto já está no carrinho
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: quantity
        });
    }
    
    // Salva no localStorage e atualiza a exibição
    saveCart();
    updateCartDisplay();
    
    // Mostra notificação
    showNotification(`${productName} adicionado ao carrinho!`);
}

// Remove item do carrinho
function removeFromCart(index) {
    const removedItem = cart.splice(index, 1)[0];
    saveCart();
    updateCartDisplay();
    showNotification(`${removedItem.name} removido do carrinho`);
}

// Atualiza quantidade de um item
function updateQuantity(index, change) {
    const newQuantity = cart[index].quantity + change;
    
    if (newQuantity < 1) {
        removeFromCart(index);
    } else {
        cart[index].quantity = newQuantity;
        saveCart();
        updateCartDisplay();
    }
}

// Salva o carrinho no localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Finaliza a compra
function checkout() {
    if (cart.length === 0) return;
    
    // Aqui você pode adicionar a lógica para processar o pagamento
    alert('Compra finalizada! Total: ' + cartTotalPrice.textContent);
    cart = [];
    saveCart();
    updateCartDisplay();
    closeCart();
}

// Mostra notificação
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Event listeners
openCartBtn.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);
checkoutBtn.addEventListener('click', checkout);

// Inicializa o carrinho
updateCartDisplay();