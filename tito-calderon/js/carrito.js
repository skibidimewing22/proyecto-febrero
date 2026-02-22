const carritoBox = document.getElementById("carritoBox");

function getCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

function setCarrito(c) {
  localStorage.setItem("carrito", JSON.stringify(c));
}

function calcularDetalleCarrito() {
  const carrito = getCarrito();

  // convierte [{id, cantidad}] a [{producto, cantidad, subtotal}]
  const items = carrito.map(item => {
    const prod = productos.find(p => p.id === item.id);
    return {
      producto: prod,
      cantidad: item.cantidad,
      subtotal: prod ? prod.precio * item.cantidad : 0
    };
  }).filter(x => x.producto);

  const total = items.reduce((acc, it) => acc + it.subtotal, 0);
  return { items, total };
}

function cambiarCantidad(id, nuevaCantidad) {
  let carrito = getCarrito();
  const item = carrito.find(x => x.id === id);
  if (!item) return;

  item.cantidad = Math.max(1, Math.min(99, nuevaCantidad));
  setCarrito(carrito);
  render();
}

function eliminarItem(id) {
  let carrito = getCarrito();
  carrito = carrito.filter(x => x.id !== id);
  setCarrito(carrito);
  render();
}

function vaciar() {
  localStorage.removeItem("carrito");
  render();
}

function finalizarCompraFake() {
  // no backend, así que es una simulación
  vaciar();
  carritoBox.innerHTML = `
    <div class="card">
      <div class="card-body">
        <span class="tag">Pedido</span>
        <div class="name">Compra realizada ✅</div>
        <p class="desc">Esto es una simulación (proyecto frontend). Tu pedido fue “confirmado”.</p>
        <a class="navlink" href="index.html" style="display:inline-block;">Volver al catálogo</a>
      </div>
    </div>
  `;
}

function render() {
  const { items, total } = calcularDetalleCarrito();

  if (items.length === 0) {
    carritoBox.innerHTML = `
      <div class="card">
        <div class="card-body">
          <span class="tag">Carrito</span>
          <div class="name">Tu carrito está vacío</div>
          <p class="desc">Elegí una cafetera y agregala para continuar.</p>
          <a class="btn" href="index.html">Ir al catálogo</a>
        </div>
      </div>
    `;
    return;
  }

  carritoBox.innerHTML = `
    <div class="card">
      <div class="card-body">
        <div class="name">Resumen</div>
        <p class="desc">Modificá cantidades o eliminá productos.</p>

        <div style="display:grid; gap:10px; margin-top:12px;">
          ${items.map(it => `
            <div style="display:flex; gap:12px; align-items:center; padding:10px; border:1px solid rgba(255,255,255,.08); border-radius:14px;">
              <div style="width:72px; height:72px; border-radius:14px; border:1px solid rgba(255,255,255,.08); display:flex; align-items:center; justify-content:center; background:#0d0d10;">
                <img src="${it.producto.imagen}" alt="${it.producto.nombre}" style="width:80%; max-height:60px; object-fit:contain;">
              </div>

              <div style="flex:1;">
                <div style="font-weight:800;">${it.producto.nombre}</div>
                <div class="desc" style="margin:4px 0 0;">$${it.producto.precio} c/u</div>
              </div>

              <div style="display:flex; gap:8px; align-items:center;">
                <button class="navlink" data-menos="${it.producto.id}" style="padding:10px 12px;">−</button>
                <input class="input" data-input="${it.producto.id}" type="number" min="1" max="99"
                       value="${it.cantidad}" style="min-width:86px; width:86px; text-align:center;">
                <button class="navlink" data-mas="${it.producto.id}" style="padding:10px 12px;">+</button>
              </div>

              <div style="min-width:120px; text-align:right;">
                <div style="font-weight:900;">$${it.subtotal}</div>
                <button class="navlink" data-del="${it.producto.id}" style="margin-top:6px;">Eliminar</button>
              </div>
            </div>
          `).join("")}
        </div>

        <div style="margin-top:14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <div class="price">
            <span>Total: $${total}</span>
            <small>ARS</small>
          </div>

          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <button class="navlink" id="btnVaciar">Vaciar</button>
            <button class="btn" id="btnFinalizar">Finalizar compra</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // botones + / -
  items.forEach(it => {
    const id = it.producto.id;

    const btnMas = carritoBox.querySelector(`[data-mas="${id}"]`);
    const btnMenos = carritoBox.querySelector(`[data-menos="${id}"]`);
    const btnDel = carritoBox.querySelector(`[data-del="${id}"]`);
    const input = carritoBox.querySelector(`[data-input="${id}"]`);

    btnMas.addEventListener("click", () => cambiarCantidad(id, it.cantidad + 1));
    btnMenos.addEventListener("click", () => cambiarCantidad(id, it.cantidad - 1));
    btnDel.addEventListener("click", () => eliminarItem(id));

    input.addEventListener("change", () => cambiarCantidad(id, Number(input.value)));
  });

  document.getElementById("btnVaciar").addEventListener("click", vaciar);
  document.getElementById("btnFinalizar").addEventListener("click", finalizarCompraFake);
}

render();