// Datos simulados de productos inspirados en el catálogo
const products = [
{
id: 1,
name: "Cofre de Regalo Marthilu IVILU",
price: 24.99,
image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300&q=80"
},
{
id: 2,
name: "Jarrón de Porcelana Marthilu IVILU",
price: 19.99,
image: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=300&q=80"
},
{
id: 3,
name: "Cuidado de Regalo Marthilu IVILU",
price: 24.99,
image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&q=80"
},
{
id: 4,
name: "Collar Artesanal Marthilu IVILU",
price: 16.99,
image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&q=80"
},
{
id: 5,
name: "Difusor Aromático OMG Shine 80 ml",
price: 11.99,
image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=300&q=80"
},
{
id: 6,
name: "Vela Aromática OMG Love 200 g",
price: 9.99,
image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=300&q=80"
},
{
id: 7,
name: "Difusor Aromático OMG Calm 80 ml",
price: 11.99,
image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=300&q=80"
},
{
id: 8,
name: "Vela Aromática Premium Frutilla",
price: 9.99,
image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&q=80"
}
];

// Estado del Carrito
let cart = [];

// Elementos del DOM
const productsGrid = document.getElementById('products-grid');
const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const openCartBtn = document.getElementById('open-cart-btn');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalPrice = document.getElementById('cart-total-price');
const checkoutBtn = document.getElementById('checkout-btn');

// Cargar Productos en la Cuadrícula
function renderProducts() {
productsGrid.innerHTML = '';
products.forEach(product => {
const card = document.createElement('div');
card.className = 'product-card';
card.innerHTML = <div class="product-img-wrapper"> <img src="${product.image}" alt="${product.name}"> </div> <h3 class="product-title">${product.name}</h3> <div class="product-price">$${product.price.toFixed(2)}</div> <div class="quantity-control"> <button class="qty-btn minus-btn" onclick="adjustQty(${product.id}, -1)">-</button> <input type="text" class="qty-input" id="qty-${product.id}" value="1" readonly> <button class="qty-btn plus-btn" onclick="adjustQty(${product.id}, 1)">+</button> </div> <button class="add-btn" onclick="addToCart(${product.id})">Lo quiero</button>;
productsGrid.appendChild(card);
});
}

// Ajustar cantidad local en la tarjeta
window.adjustQty = function(productId, delta) {
const input = document.getElementById(qty-${productId});
let currentVal = parseInt(input.value);
currentVal += delta;
if (currentVal < 1) currentVal = 1;
input.value = currentVal;
};

// Agregar al carrito
window.addToCart = function(productId) {
const product = products.find(p => p.id === productId);
const qtyInput = document.getElementById(qty-${productId});
const quantity = parseInt(qtyInput.value);

const existingItem = cart.find(item => item.id === productId);
if (existingItem) {
existingItem.quantity += quantity;
} else {
cart.push({ ...product, quantity });
}

// Reset de la tarjeta
qtyInput.value = 1;

updateCartUI();
openCart();
};

// Actualizar interfaz del carrito
function updateCartUI() {
// Cantidad de ítems
const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
cartCount.textContent = totalItems;

// Renderizar ítems
if (cart.length === 0) {
cartItemsContainer.innerHTML = 'Tu carrito está vacío.';
} else {
cartItemsContainer.innerHTML = cart.map(item => <div class="cart-item"> <div class="cart-item-info"> <h4>${item.name}</h4> <p>${item.quantity} x $${item.price.toFixed(2)} = <strong>$${(item.quantity * item.price).toFixed(2)}</strong></p> </div> <i class="fas fa-trash cart-item-remove" onclick="removeFromCart(${item.id})"></i> </div>).join('');
}

// Precio Total
const totalSum = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
cartTotalPrice.textContent = $${totalSum.toFixed(2)};
}

// Eliminar ítem
window.removeFromCart = function(productId) {
cart = cart.filter(item => item.id === productId);
updateCartUI();
};

// Abrir / Cerrar Modal Carrito
function openCart() {
cartModal.classList.add('active');
}

function closeCart() {
cartModal.classList.remove('active');
}

openCartBtn.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// Enviar pedido por WhatsApp
checkoutBtn.addEventListener('click', () => {
if (cart.length === 0) {
alert('Añade al menos un producto al carrito para continuar.');
return;
}

let message = "Hola Marthilu Exclusividades, me gustaría realizar el siguiente pedido:\n\n";
cart.forEach(item => {
message += • ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}\n;
});

const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
message += \n*Total a pagar:* $${total.toFixed(2)};

const whatsappPhone = "593992301548"; // Número configurado de tu logo
const whatsappUrl = https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)};

window.open(whatsappUrl, '_blank');
});

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
renderProducts();
});