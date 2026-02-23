console.log("INDEX.JS CARGÓ ✅");

const catalogo = document.getElementById("catalogo");
const buscador = document.getElementById("buscador");
const filtro = document.getElementById("filtro");
const btnBuscar = document.getElementById("btnBuscar");

if (!catalogo) {
  console.error("NO EXISTE el div #catalogo en index.html. Revisá que tengas: <div id='catalogo'></div>");
}

function render(lista) {
  if (!catalogo) return;
  catalogo.innerHTML = "";

  if (!lista || lista.length === 0) {
    catalogo.innerHTML = `
      <div class="card">
        <div class="card-body">
          <div class="name">No hay productos</div>
          <p class="desc">Agregá productos desde Admin.</p>
        </div>
      </div>
    `;
    return;
  }

  lista.forEach(p => {
    catalogo.innerHTML += `
      <a class="card" href="producto.html?id=${p.id}">
        <div class="thumb">
          <img src="${p.imagen}" alt="${p.nombre}">
        </div>
        <div class="card-body">
          <span class="tag">${p.categoria}</span>
          <div class="name">${p.nombre}</div>
          <div class="desc">${p.descripcion}</div>
          <div class="price">
            <span>$${p.precio}</span>
            <small>ver →</small>
          </div>
        </div>
      </a>
    `;
  });
}

function aplicarFiltro() {
  const q = (buscador?.value || "").trim().toLowerCase();
  const cat = (filtro?.value || "todos");

  const productos = loadProducts();

  const lista = productos.filter(p => {
    const okTexto = (p.nombre + " " + p.descripcion + " " + p.categoria).toLowerCase().includes(q);
    const okCat = (cat === "todos") ? true : p.categoria === cat;
    return okTexto && okCat;
  });

  render(lista);
}

btnBuscar?.addEventListener("click", aplicarFiltro);
buscador?.addEventListener("keydown", (e) => { if (e.key === "Enter") aplicarFiltro(); });

// Render inicial
render(loadProducts());

// Refresca si cambió el storage (cuando admin está en otra pestaña)
window.addEventListener("storage", (e) => {
  if (e.key === "tito_products_v1") render(loadProducts());
});

// Refresca al volver a la pestaña
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) render(loadProducts());
});