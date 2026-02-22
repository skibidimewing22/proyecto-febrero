const contenedor = document.getElementById("carrito");
const totalTexto = document.getElementById("total");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

let total = 0;

carrito.forEach(producto => {
  contenedor.innerHTML += `
    <div class="card">
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio}</p>
    </div>
  `;
  total += producto.precio;
});

totalTexto.innerText = "Total: $" + total;

function vaciar() {
  localStorage.removeItem("carrito");
  location.reload();
}