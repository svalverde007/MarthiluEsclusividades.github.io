// Productos por defecto
const defaultProducts = [
  { id: 1, name: 'Cofre de Regalo Marthilu - Charm', price: 24.99, category: 'Regalos', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500' },
  { id: 2, name: 'Florero de Porcelana Marthilu', price: 19.99, category: 'Decoración', image: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=500' },
  { id: 3, name: 'Arreglo Floral Especial Marthilu', price: 24.99, category: 'Regalos', image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=500' },
  { id: 4, name: 'Collar de Perlas Marthilu', price: 16.95, category: 'Accesorios', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500' }
];

// Cargar productos almacenados o usar los por defecto
let products = JSON.parse(localStorage.getItem('marthilu_products'));

if (!products || products.length === 0) {
  products = defaultProducts;
  localStorage.setItem('marthilu_products', JSON.stringify(products));
}

let cart = [];

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);
  updateCartBadge();
});

// Renderizar Productos en Pantalla
function renderProducts(itemsToRender) {
  const container = document.getElementById('products-container');
  if (!container) return;

  container.innerHTML = '';

  itemsToRender.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-img-wrapper">
        <img src="${product.image}" alt="${product.name}" class="product-img" onerror="this.src='https://via.placeholder.com/300x200?text=Sin+Imagen'">
      </div>
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-price">$${Number(product.price).toFixed(2)}</p>
        <button class="btn-buy" onclick="addToCart(${product.id})">Agregar al Carrito</button>
      </div>
    `;
    container.appendChild(card);
  });
}

// Modal Administrador
function openAdminModal() {
  document.getElementById('admin-overlay').classList.add('open');
  document.getElementById('admin-modal').classList.add('open');
}

function closeAdminModal() {
  document.getElementById('admin-overlay').classList.remove('open');
  document.getElementById('admin-modal').classList.remove('open');
}

// Guardar Nuevo Producto
function handleAddNewProduct(event) {
  event.preventDefault();

  const name = document.getElementById('prod-name').value;
  const price = parseFloat(document.getElementById('prod-price').value);
  const category = document.getElementById('prod-category').value;
  const image = document.getElementById('prod-img').value;

  const newProduct = {
    id: Date.now(),
    name: name,
    price: price,
    category: category,
    image: image
  };

  products.push(newProduct);
  localStorage.setItem('marthilu_products', JSON.stringify(products));

  renderProducts(products);
  closeAdminModal();
  document.getElementById('add-product-form').reset();
  alert('¡Producto agregado con éxito!');
}

// Carrito
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const itemInCart = cart.find(item => item.id === productId);
  if (itemInCart) {
    itemInCart.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartBadge();
  renderCart();
}

function updateCartBadge() {
  const badge = document.getElementById('cart-count');
  if (badge) {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = count;
  }
}

function toggleCart() {
  document.getElementById('cart-overlay').classList.toggle('open');
  document.getElementById('cart-modal').classList.toggle('open');
}

function renderCart() {
  const container = document.getElementById('cart-items');
  const totalPrice = document.getElementById('cart-total-price');
  if (!container) return;

  container.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='https://via.placeholder.com/60'">
      <div class="cart-item-details">
        <h4 class="cart-item-title">${item.name}</h4>
        <p class="cart-item-price">$${Number(item.price).toFixed(2)}</p>
        <div class="cart-item-qty">
          <button type="button" onclick="changeQty(${item.id}, -1)">-</button>
          <span>${item.quantity}</span>
          <button type="button" onclick="changeQty(${item.id}, 1)">+</button>
        </div>
      </div>
    `;
    container.appendChild(div);
  });

  if (totalPrice) {
    totalPrice.textContent = `$${total.toFixed(2)}`;
  }
}

function changeQty(id, change) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.quantity += change;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== id);
  }
  updateCartBadge();
  renderCart();
}

// Enviar Pedido por WhatsApp
function sendWhatsAppOrder() {
  if (cart.length === 0) {
    alert('Tu carrito está vacío.');
    return;
  }

  const phoneNumber = '593992301548';
  let message = '¡Hola Marthilu Exclusividades! 👋\nQuiero realizar el siguiente pedido:\n\n';
  let total = 0;

  cart.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    message += `${index + 1}. *${item.name}*\n   Cantidad: ${item.quantity}\n   Subtotal: $${subtotal.toFixed(2)}\n\n`;
  });

  message += `*TOTAL A PAGAR: $${total.toFixed(2)}*`;
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
}
