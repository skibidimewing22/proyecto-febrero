const detalle = document.getElementById("detalle");

const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

const producto = productos.find(p => p.id === id);

function getCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

function setCarrito(c) {
  localStorage.setItem("carrito", JSON.stringify(c));
}

function agregarAlCarrito(idProducto) {
  const carrito = getCarrito();
  const existente = carrito.find(item => item.id === idProducto);

  if (existente) existente.cantidad += 1;
  else carrito.push({ id: idProducto, cantidad: 1 });

  setCarrito(carrito);
}

if (!producto) {
  detalle.innerHTML = `<div class="card"><div class="card-body">Producto no encontrado.</div></div>`;
} else {
  detalle.innerHTML = `
    <div class="card">
      <div class="thumb" style="height:260px;">
        <img src="${producto.imagen}" alt="${producto.nombre}" style="max-height:220px;">
      </div>
      <div class="card-body">
        <span class="tag">${producto.categoria}</span>
        <div class="name" style="font-size:22px;">${producto.nombre}</div>
        <p class="desc" style="font-size:14px;">${producto.descripcion}</p>

        <div class="price" style="margin: 12px 0;">
          <span>$${producto.precio}</span>
          <small>stock ilustrativo</small>
        </div>

        <div style="display:flex; gap:10px; flex-wrap:wrap;">
          <button class="btn" id="btnAdd">Agregar al carrito</button>
          <a class="navlink" href="carrito.html" style="display:inline-block;">Ir al carrito →</a>
        </div>

        <p id="msg" class="desc" style="margin-top:10px;"></p>
      </div>
    </div>
  `;

  document.getElementById("btnAdd").addEventListener("click", () => {
    agregarAlCarrito(producto.id);
    document.getElementById("msg").textContent = "Agregado al carrito ✅";
  });
}