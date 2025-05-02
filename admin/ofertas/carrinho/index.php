<!-- Botão do carrinho no cabeçalho -->
<button id="open-cart" class="cart-button" aria-label="Abrir carrinho de compras">
    <ion-icon name="cart-outline"></ion-icon>
    <span id="cart-count" class="cart-counter">0</span>
</button>

<!-- Modal do carrinho -->
<div class="modal closed" id="cart-modal" aria-hidden="true">
  <div class="modal-overlay" id="cart-overlay" tabindex="-1"></div>
  <div class="modal-content">
    <div class="modal-header">
      <h2 id="cart-modal-title">Seu Carrinho</h2>
      <button class="modal-close" id="close-cart" aria-label="Fechar carrinho">&times;</button>
    </div>
    
    <div class="modal-body">
      <div id="cart-items" aria-live="polite">
          <!-- Itens do carrinho serão inseridos aqui via JavaScript -->
          <p class="empty-cart-message">O carrinho está vazio no momento.</p>
      </div>
    </div>
    
    <div class="modal-footer">
      <div class="cart-summary">
        <div class="cart-total">
            <span class="total-label">Total:</span>
            <span id="cart-total-price" class="total-value">R$ 0,00</span>
        </div>
        <button id="checkout-button" class="checkout-btn" disabled>
          Finalizar Compra
        </button>
      </div>
    </div>
  </div>
</div>

<!-- Exemplo de produto com botão de compra -->
<div class="product-card">
    <!-- Outros elementos do produto -->
    <div class="product-actions">
      <button class="buy-now-btn" 
              onclick="buyNow(1, 'Produto Exemplo', 99.90, 'imagem-produto.jpg')"
              aria-label="Comprar Produto Exemplo agora">
          Comprar Agora
      </button>
    </div>
</div>

<!-- Inclua isso no head do seu documento -->
<link rel="stylesheet" href="style.css">
<script src="https://unpkg.com/ionicons@5.2.3/dist/ionicons.js"></script>
<script src="script.js"></script>