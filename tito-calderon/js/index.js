const catalogo = document.getElementById("catalogo");

productos.forEach(producto => {
  catalogo.innerHTML += `
    <div class="card">
      <img src="${producto.imagen}">
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio}</p>
      <a href="producto.html?id=${producto.id}">Ver producto</a>
    </div>
  `;
});