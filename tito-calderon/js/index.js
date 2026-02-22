const catalogo = document.getElementById("catalogo");
const buscador = document.getElementById("buscador");
const filtro = document.getElementById("filtro");
const btnBuscar = document.getElementById("btnBuscar");

function render(lista) {
  catalogo.innerHTML = "";
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
  const q = buscador.value.trim().toLowerCase();
  const cat = filtro.value;

  let lista = productos.filter(p => {
    const okTexto = (p.nombre + " " + p.descripcion + " " + p.categoria).toLowerCase().includes(q);
    const okCat = (cat === "todos") ? true : p.categoria === cat;
    return okTexto && okCat;
  });

  render(lista);
}

btnBuscar.addEventListener("click", aplicarFiltro);
buscador.addEventListener("keydown", (e) => { if (e.key === "Enter") aplicarFiltro(); });

render(productos);