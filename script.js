const products = [
  {
    id: 1,
    name: "Cofre de Regalo Marthilu - Charm",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop&q=60",
    category: "Regalos y Exclusividades"
  },
  {
    id: 2,
    name: "Florero de Porcelana Marthilu",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=500&auto=format&fit=crop&q=60",
    category: "Decoración de Hogar"
  },
  {
    id: 3,
    name: "Arreglo Floral Especial Marthilu",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&auto=format&fit=crop&q=60",
    category: "Regalos y Exclusividades"
  },
  {
    id: 4,
    name: "Collar Artesanal Marthilu",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&auto=format&fit=crop&q=60",
    category: "Accesorios de Moda"
  },
  {
    id: 5,
    name: "Vela Aromática Artesanal Marthilu",
    price: 11.99,
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=500&auto=format&fit=crop&q=60",
    category: "Cuidado Personal"
  }
];

let cart = [];

document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);
  setupCartModal();
  setupSearch();
  setupSort();
});

// Renderizar tarjetas de productos
function renderProducts(items) {
  const grid = document.getElementById('products-grid');
  if (!grid) return;
  grid.innerHTML = '';

  items.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-img-wrapper">
        <img src="${product.image}" alt="${product.name}" class="product-img">
      </div>
      <div class="product-info">
        <h4 class="product-title">${product.name}</h4>
        <div class="product-price">$${product.price.toFixed(2)}</div>
        <button class="btn-buy" onclick="addToCart(${product.id})">Agregar al Carrito</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Agregar producto al carrito y abrir panel
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existingItem = cart.find(item => item.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartUI();
  toggleCartModal(true); // Abre el panel para que revise sus productos
}

// Actualizar Interfaz del Carrito
function updateCartUI() {
  const cartBadge = document.getElementById('cart-count');
  const cartContainer = document.getElementById('cart-items-container');
  const totalPriceElem = document.getElementById('cart-total-price');

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartBadge) cartBadge.textContent = totalItems;

  if (!cartContainer) return;
  cartContainer.innerHTML = '';

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p style="text-align:center; color:#777; margin-top:20px;">Tu carrito está vacío.</p>';
    if (totalPriceElem) totalPriceElem.textContent = '$0.00';
    return;
  }

  let total = 0;
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';
    itemDiv.innerHTML = `
      <img src="${item.image}" class="cart-item-img" alt="${item.name}">
      <div class="cart-item-details">
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
        <div class="cart-item-qty">
          <button onclick="changeQty(${item.id}, -1)">-</button>
          <span>${item.quantity}</span>
          <button onclick="changeQty(${item.id}, 1)">+</button>
        </div>
      </div>
    `;
    cartContainer.appendChild(itemDiv);
  });

  if (totalPriceElem) totalPriceElem.textContent = `$${total.toFixed(2)}`;
}

// Cambiar cantidad en el carrito
function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== id);
  }
  updateCartUI();
}

// Abrir / Cerrar Panel del Carrito
function setupCartModal() {
  const openBtn = document.getElementById('open-cart-btn');
  const closeBtn = document.getElementById('close-cart-btn');
  const overlay = document.getElementById('cart-overlay');

  if (openBtn) openBtn.addEventListener('click', () => toggleCartModal(true));
  if (closeBtn) closeBtn.addEventListener('click', () => toggleCartModal(false));
  if (overlay) overlay.addEventListener('click', () => toggleCartModal(false));
}

function toggleCartModal(show) {
  const modal = document.getElementById('cart-modal');
  const overlay = document.getElementById('cart-overlay');

  if (show) {
    modal.classList.add('open');
    overlay.classList.add('open');
  } else {
    modal.classList.remove('open');
    overlay.classList.remove('open');
  }
}

// Enviar pedido detallado a WhatsApp
function sendWhatsAppOrder() {
  if (cart.length === 0) {
    alert('Tu carrito está vacío.');
    return;
  }

  let message = '¡Hola Marthilu Exclusividades! Quiero realizar el siguiente pedido:\n\n';
  let total = 0;

  cart.forEach(item => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    message += `• ${item.name} x${item.quantity} - $${subtotal.toFixed(2)}\n`;
  });

  message += `\n*Total a pagar: $${total.toFixed(2)}*`;

  const encodedUrl = `https://wa.me/593992301548?text=${encodeURIComponent(message)}`;
  window.open(encodedUrl, '_blank');
}

// Filtrar por categorías
function filterCategory(cat) {
  document.querySelectorAll('.category-pill').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  if (cat === 'todos') {
    renderProducts(products);
  } else {
    const filtered = products.filter(p => p.category === cat);
    renderProducts(filtered);
  }
}

// Búsqueda
function setupSearch() {
  const input = document.getElementById('search-input');
  const btn = document.getElementById('search-btn');

  const doSearch = () => {
    const term = input.value.toLowerCase().trim();
    const filtered = products.filter(p => p.name.toLowerCase().includes(term));
    renderProducts(filtered);
  };

  if (btn) btn.addEventListener('click', doSearch);
  if (input) input.addEventListener('keyup', e => { if (e.key === 'Enter') doSearch(); });
}

// Ordenar
function setupSort() {
  const select = document.getElementById('sort-select');
  if (!select) return;

  select.addEventListener('change', e => {
    let sorted = [...products];
    if (e.value === 'low-high') sorted.sort((a,b) => a.price - b.price);
    if (e.value === 'high-low') sorted.sort((a,b) => b.price - a.price);
    renderProducts(sorted);
  });
}
