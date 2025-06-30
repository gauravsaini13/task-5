const products = [
  {
    id: 1,
    name: "T-Shirt",
    category: "clothing",
    price: 499,
    image: "https://m.media-amazon.com/images/I/61XgREZTV6L._AC_UL1500_.jpg"
  },
  {
    id: 2,
    name: "Laptop",
    category: "electronics",
    price: 49999,
    image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6062/6062100_rd.jpg"
  },
  {
    id: 3,
    name: "Jeans",
    category: "clothing",
    price: 999,
    image: "https://image.hm.com/assets/hm/64/ac/64ac7590b2e6ddff2827e2ea5c73bf9a6af95559.jpg?imwidth=1260"
  },
  {
    id: 4,
    name: "Smartphone",
    category: "electronics",
    price: 29999,
    image: "https://th.bing.com/th/id/OIP.KyrBu1s2mkrqDl3Bdo8QtAHaHa?o=7rm=3&rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3",
    
  }
];



const productList = document.getElementById("productList");
const cartList = document.getElementById("cartList");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderProducts(filteredProducts) {
  productList.innerHTML = "";
  filteredProducts.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(card);
  });
}

function renderCart() {
  cartList.innerHTML = "";
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ₹${item.price}`;
    cartList.appendChild(li);
  });
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id) {
  const item = products.find(p => p.id === id);
  cart.push(item);
  renderCart();
}

function applyFilters() {
  let filtered = [...products];
  const category = categoryFilter.value;
  const sort = sortFilter.value;

  if (category !== "all") {
    filtered = filtered.filter(p => p.category === category);
  }

  if (sort === "priceLow") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "priceHigh") {
    filtered.sort((a, b) => b.price - a.price);
  }

  renderProducts(filtered);
}

categoryFilter.addEventListener("change", applyFilters);
sortFilter.addEventListener("change", applyFilters);

// Initial render
renderProducts(products);
renderCart();



// part 2
 