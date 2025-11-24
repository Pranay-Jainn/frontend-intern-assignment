const API = "https://fakestoreapi.com/products";
const FALLBACK = "data.json";
const PER_PAGE = 6;

let products = [];
let filtered = [];
let page = 1;
let favorites = new Set(JSON.parse(localStorage.getItem("favorites") || "[]"));

const grid = document.getElementById("grid");
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");
const sortSelect = document.getElementById("sortSelect");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const closeModalBtn = document.getElementById("closeModal");
const resultInfo = document.getElementById("resultInfo");
const favCount = document.getElementById("favCount");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");
const toggleBtn = document.getElementById("toggleThemeBtn");
const themeIcon = document.getElementById("themeIcon");

document.addEventListener("DOMContentLoaded", init);
closeModalBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
searchInput.addEventListener("input", handleControls);
categorySelect.addEventListener("change", handleControls);
sortSelect.addEventListener("change", handleControls);
prevBtn.addEventListener("click", () => {
  if (page > 1) {
    page--;
    render();
  }
});
nextBtn.addEventListener("click", () => {
  const pages = Math.ceil(filtered.length / PER_PAGE);
  if (page < pages) {
    page++;
    render();
  }
});

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeIcon.innerHTML = `<i class="fa-regular fa-sun"></i>`;
}
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeIcon.innerHTML = `<i class="fa-regular fa-sun"></i>`;
    localStorage.setItem("theme", "dark");
  } else {
    themeIcon.innerHTML = `<i class="fa-regular fa-moon"></i>`;
    localStorage.setItem("theme", "light");
  }
});
async function init() {
  showSkeleton(8);

  try {
    const apiRes = await fetch(API);

    if (!apiRes.ok) throw new Error("API request failed");

    const apiData = await apiRes.json();
    products = normalizeProducts(apiData);
    console.log("Loaded from API");
  } catch (err) {
    console.warn("API failed, trying fallback:", err);

    try {
      const fallbackRes = await fetch(FALLBACK);
      const fallbackData = await fallbackRes.json();
      products = normalizeProducts(fallbackData);
      console.log("Loaded from data.json");
    } catch (fallbackErr) {
      console.error("Both API & fallback failed:", fallbackErr);
      showError("Unable to load product data.");
      return;
    }
  }

  onDataReady();
}

function normalizeProducts(arr) {
  return arr.map((p) => {
    return {
      id: p.id,
      title: p.title,
      price: Number(p.price),
      description: p.description || "",
      category: p.category || "uncategorized",
      image: p.image || "https://placehold.co/300x300?text=Product",
    };
  });
}

function onDataReady() {
  populateCategories();
  filtered = [...products];
  updateFavCount();
  page = 1;
  render();
}

function showSkeleton(n = 6) {
  grid.innerHTML = "";
  for (let i = 0; i < n; i++) {
    const s = document.createElement("div");
    s.className = "card skeleton";
    s.style.minHeight = "337px";
    grid.appendChild(s);
  }
}

function showError(msg) {
  grid.innerHTML = `<div style="padding:24px;background:var(--card);border-radius:12px;box-shadow:var(--shadow)">${msg}</div>`;
  resultInfo.textContent = msg;
}
function populateCategories() {
  const cats = Array.from(new Set(products.map((p) => p.category)));
  categorySelect.innerHTML = `<option value="all">All categories</option>`;
  cats.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = capitalize(c);
    categorySelect.appendChild(opt);
  });
}

function handleControls() {
  const q = searchInput.value.trim().toLowerCase();
  const cat = categorySelect.value;
  const sort = sortSelect.value;

  filtered = products.filter((p) => {
    const matchesQ = p.title.toLowerCase().includes(q);
    const matchesCat = cat === "all" ? true : p.category === cat;
    return matchesQ && matchesCat;
  });

  if (sort === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  }

  page = 1;
  render();
}
function render() {
  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / PER_PAGE));
  if (page > pages) page = pages;

  const start = (page - 1) * PER_PAGE;
  const pageItems = filtered.slice(start, start + PER_PAGE);

  grid.innerHTML = "";

  if (pageItems.length === 0) {
    grid.innerHTML = `<div style="padding:20px;background:var(--card);border-radius:8px;box-shadow:var(--shadow)">No products found.</div>`;
  } else {
    pageItems.forEach((p) => {
      const card = createCard(p);
      card.classList.add("fade-in");
      grid.appendChild(card);
    });
  }

  resultInfo.textContent = `Showing ${Math.min(total, start + 1)}–${Math.min(
    total,
    start + PER_PAGE
  )} of ${total} products`;
  pageInfo.textContent = `Page ${page} / ${pages}`;
  prevBtn.disabled = page <= 1;
  nextBtn.disabled = page >= pages;
}

function createCard(p) {
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `
  <img loading="lazy" src="${escapeHtml(p.image)}" alt="${escapeHtml(
    p.title
  )}" />
  <div class="title">${escapeHtml(truncate(p.title, 60))}</div>
  <div class="category">${escapeHtml(capitalize(p.category))}</div>
  <div class="price">₹${formatPrice(p.price)}</div>
  <div class="row">
    <div style="display:flex;gap:8px;align-items:center">
      <button class="fav-btn" data-id="${p.id}" aria-label="Toggle favorite">
        ${favorites.has(p.id) ? "★" : "☆"}
      </button>
      <button class="addcart-btn" data-id="${p.id}">Add</button>
    </div>
  </div>
`;

  card.addEventListener("click", (e) => {
    if (!e.target.closest("button")) {
      openModal(p);
    }
  });

  card
    .querySelector(".fav-btn")
    .addEventListener("click", (e) => toggleFavorite(p.id, e.target));
  card
    .querySelector(".addcart-btn")
    .addEventListener("click", () =>
      alert(`Added "${p.title}" to cart (demo).`)
    );

  return card;
}

function openModal(p) {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  modalBody.innerHTML = `
    <div class="modal-body">
      <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)}" />
      <div>
        <h2 style="margin:0 0 8px">${escapeHtml(p.title)}</h2>
        <div style="font-weight:700;font-size:18px;margin-bottom:8px">₹${formatPrice(
          p.price
        )}</div>
        <div style="margin-bottom:12px;color:var(--muted)"><strong>Category:</strong> ${escapeHtml(
          capitalize(p.category)
        )}</div>
        <p class="desc">${escapeHtml(p.description)}</p>
        <div style="margin-top:12px;display:flex;gap:8px">
          <button id="modalFavBtn" class="fav-btn" data-id="${p.id}">
            ${favorites.has(p.id) ? "★" : "☆"}
          </button>

          <button id="modalAdd">Add to Cart</button>
        </div>
      </div>
    </div>
  `;
  const modalFav = document.getElementById("modalFavBtn");

  modalFav.addEventListener("click", (e) => {
    e.stopPropagation();

    toggleFavorite(p.id, modalFav);

    modalFav.textContent = favorites.has(p.id) ? "★" : "☆";

    updateFavCount();
    render();
  });

  document
    .getElementById("modalAdd")
    .addEventListener("click", () =>
      alert(`Added "${p.title}" to cart (demo).`)
    );
}

// function closeModal() {
//   modal.classList.remove("open");
//   modal.setAttribute("aria-hidden", "true");
//   modalBody.innerHTML = "";
// }
function closeModal() {
  modal.classList.add("closing");

  setTimeout(() => {
    modal.classList.remove("open", "closing");
    modal.setAttribute("aria-hidden", "true");
    modalBody.innerHTML = "";
  }, 250);
}

function toggleFavorite(id, el) {
  id = Number(id);
  if (favorites.has(id)) {
    favorites.delete(id);
  } else {
    favorites.add(id);
  }
  localStorage.setItem("favorites", JSON.stringify([...favorites]));
  updateFavCount();

  if (el) {
    el.textContent = favorites.has(id) ? "★" : "☆";
  }
}
function updateFavCount() {
  favCount.textContent = favorites.size;
}
function capitalize(s) {
  if (!s) return s;
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}
function truncate(s, n) {
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}
function formatPrice(n) {
  return Number(n).toLocaleString("en-IN");
}

