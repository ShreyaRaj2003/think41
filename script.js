// script.js
const products = [
  {
    name: "iPhone 14",
    category: "Phones",
    brand: "Apple",
    price: 999,
    image: "https://m.media-amazon.com/images/I/71yzJoE7WlL._SX679_.jpg"
  },
  {
    name: "Galaxy S22",
    category: "Phones",
    brand: "Samsung",
    price: 849,
    image: "https://m.media-amazon.com/images/I/71qYqf3q8BL._SX679_.jpg"
  },
  {
    name: "Pixel 7",
    category: "Phones",
    brand: "Google",
    price: 799,
    image: "https://m.media-amazon.com/images/I/71tC5QTBWUL._SX679_.jpg"
  },
  {
    name: "MacBook Pro",
    category: "Laptops",
    brand: "Apple",
    price: 1999,
    image: "https://m.media-amazon.com/images/I/71an9eiBxpL._SX679_.jpg"
  },
  {
    name: "Galaxy Tab S8",
    category: "Tablets",
    brand: "Samsung",
    price: 699,
    image: "https://m.media-amazon.com/images/I/71gJp2WZdmL._SX679_.jpg"
  }
];

const categorySelect = document.getElementById("category");
const brandContainer = document.getElementById("brandContainer");
const productList = document.getElementById("product-list");
const minPrice = document.getElementById("minPrice");
const maxPrice = document.getElementById("maxPrice");
const resetBtn = document.getElementById("resetBtn");

function getUniqueValues(key) {
  return [...new Set(products.map(p => p[key]))];
}

function renderFilters() {
  getUniqueValues("category").forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    categorySelect.appendChild(opt);
  });

  getUniqueValues("brand").forEach(brand => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="checkbox" value="${brand}" class="brand"> ${brand}`;
    brandContainer.appendChild(label);
  });
}

function renderProducts(productsToRender) {
  productList.innerHTML = "";
  productsToRender.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>Brand: ${p.brand}</p>
      <p>Category: ${p.category}</p>
      <p>Price: $${p.price}</p>
    `;
    productList.appendChild(card);
  });
}

function applyFilters() {
  let filtered = [...products];
  const selectedCategory = categorySelect.value;
  const selectedBrands = [...document.querySelectorAll(".brand:checked")].map(cb => cb.value);
  const min = parseFloat(minPrice.value) || 0;
  const max = parseFloat(maxPrice.value) || Infinity;

  if (selectedCategory) filtered = filtered.filter(p => p.category === selectedCategory);
  if (selectedBrands.length > 0) filtered = filtered.filter(p => selectedBrands.includes(p.brand));
  filtered = filtered.filter(p => p.price >= min && p.price <= max);

  renderProducts(filtered);
}

categorySelect.addEventListener("change", applyFilters);
brandContainer.addEventListener("change", applyFilters);
minPrice.addEventListener("input", applyFilters);
maxPrice.addEventListener("input", applyFilters);
resetBtn.addEventListener("click", () => {
  categorySelect.value = "";
  document.querySelectorAll(".brand").forEach(cb => cb.checked = false);
  minPrice.value = "";
  maxPrice.value = "";
  renderProducts(products);
});

renderFilters();
renderProducts(products);