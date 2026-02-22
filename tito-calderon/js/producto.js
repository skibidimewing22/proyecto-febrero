const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

const producto = productos.find(p => p.id === id);

const detalle = document.getElementById("detalle");

detalle.innerHTML = `
  <h2>${producto.nombre}</h2>
  <img src="${producto.imagen}">
  <p>${producto.descripcion}</p>
  <h3>$${producto.precio}</h3>
  <button onclick="agregarCarrito()">Agregar al carrito</button>
`;

function agregarCarrito() {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert("Producto agregado");
}