// Arreglo de productos de Marthilu Exclusividades
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
    name: "Cofre de Regalo Marthilu - Deluxe",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=500&auto=format&fit=crop&q=60",
    category: "Regalos y Exclusividades"
  },
  {
    id: 6,
    name: "Vela Aromática Artesanal Marthilu",
    price: 11.99,
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=500&auto=format&fit=crop&q=60",
    category: "Cuidado Personal"
  },
  {
    id: 7,
    name: "Set Cuidado Personal Marthilu",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=60",
    category: "Cuidado Personal"
  },
  {
    id: 8,
    name: "Joya Artesanal Marthilu - Gold",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&auto=format&fit=crop&q=60",
    category: "Accesorios de Moda"
  }
];

// Variables del Carrito
let cart = [];

// Cargar productos al iniciar el documento
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);
  setupSearch();
  setupSort();
});

// Función para renderizar tarjetas de productos
function renderProducts(items) {
  const grid = document.getElementById('products-grid');
  const totalCount = document.getElementById('total-products');
  
  if (!grid) return;
  grid.innerHTML = '';
  
  if (totalCount) {
    totalCount.textContent = items.length;
  }

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
        <div class="quantity-control">
          <button class="qty-btn minus" onclick="decreaseQty(${product.id})">-</button>
          <span class="qty-value" id="qty-${product.id}">1</span>
          <button class="qty-btn plus" onclick="increaseQty(${product.id})">+</button>
        </div>
        <button class="btn-buy" onclick="addToCart(${product.id})">Lo quiero</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Funciones de control de cantidad
function increaseQty(id) {
  const qtySpan = document.getElementById(`qty-${id}`);
  let currentVal = parseInt(qtySpan.textContent);
  qtySpan.textContent = currentVal + 1;
}

function decreaseQty(id) {
  const qtySpan = document.getElementById(`qty-${id}`);
  let currentVal = parseInt(qtySpan.textContent);
  if (currentVal > 1) {
    qtySpan.textContent = currentVal - 1;
  }
}

// Añadir al Carrito con notificación
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const qtySpan = document.getElementById(`qty-${id}`);
  const quantity = parseInt(qtySpan.textContent);

  const existingItem = cart.find(item => item.id === id);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  updateCartCount();
  alert(`¡Se agregaron ${quantity} unidades de "${product.name}" al carrito!`);
}

// Actualizar contador del carrito
function updateCartCount() {
  const countBadge = document.getElementById('cart-count');
  if (countBadge) {
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    countBadge.textContent = totalItems;
  }
}

// Funcionalidad de Búsqueda
function setupSearch() {
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');

  const performSearch = () => {
    const term = searchInput.value.toLowerCase().trim();
    const filtered = products.filter(p => p.name.toLowerCase().includes(term));
    renderProducts(filtered);
  };

  if (searchBtn) searchBtn.addEventListener('click', performSearch);
  if (searchInput) searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') performSearch();
  });
}

// Funcionalidad de Ordenar por Precio/Nombre
function setupSort() {
  const sortSelect = document.getElementById('sort-select');
  if (!sortSelect) return;

  sortSelect.addEventListener('change', (e) => {
    const value = e.target.value;
    let sorted = [...products];

    if (value === 'low-high') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (value === 'high-low') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (value === 'name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }

    renderProducts(sorted);
  });
}
