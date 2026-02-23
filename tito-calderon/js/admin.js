const gateMsg = document.getElementById("gateMsg");
const panel = document.getElementById("panel");
const listEl = document.getElementById("list");
const msgEl = document.getElementById("msg");

function requireAdmin() {
  if (!isAdmin()) {
    gateMsg.textContent = "No estás logueado como admin. Andá a Login (admin@tito.com / admin123).";
    panel.style.display = "none";
    return false;
  }
  gateMsg.textContent = "Acceso admin ✅";
  panel.style.display = "block";
  return true;
}

function renderList() {
  const items = loadProducts();

  listEl.innerHTML = items.map(p => `
    <div style="display:flex; gap:12px; align-items:center; padding:10px; border:1px solid rgba(255,255,255,.10); border-radius:16px; background: rgba(0,0,0,.15);">
      <div style="width:76px; height:76px; border-radius:14px; border:1px solid rgba(255,255,255,.10); display:flex; align-items:center; justify-content:center; background:#0d0d10;">
        <img src="${p.imagen}" alt="${p.nombre}" style="width:85%; max-height:64px; object-fit:contain;">
      </div>
      <div style="flex:1;">
        <div style="font-weight:900;">${p.nombre}</div>
        <div class="desc" style="margin:2px 0 0;">${p.categoria} • $${p.precio}</div>
      </div>
      <button class="navlink" data-del="${p.id}">Eliminar</button>
    </div>
  `).join("");

  listEl.querySelectorAll("[data-del]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.del);
      const next = loadProducts().filter(x => Number(x.id) !== id);
      saveProducts(next);
      renderList();
    });
  });
}

function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

document.getElementById("btnAdd").addEventListener("click", async () => {
  msgEl.textContent = "";

  const nombre = document.getElementById("nombre").value.trim();
  const precio = Number(document.getElementById("precio").value);
  const categoria = document.getElementById("categoria").value.trim();
  const descripcion = document.getElementById("desc").value.trim();

  const imgUrl = document.getElementById("imgUrl").value.trim();
  const imgFile = document.getElementById("imgFile").files[0];

  if (!nombre || !categoria || !descripcion || !Number.isFinite(precio) || precio <= 0) {
    msgEl.textContent = "Completá nombre, categoría, descripción y precio.";
    return;
  }

  let imagen = imgUrl;
  if (!imagen && imgFile) imagen = await fileToDataURL(imgFile);
  if (!imagen) {
    msgEl.textContent = "Poné una imagen por URL o subí un archivo.";
    return;
  }

  const items = loadProducts();
  items.push({
    id: nextProductId(items),
    nombre, precio, imagen, descripcion, categoria
  });

  saveProducts(items);
  msgEl.textContent = "Producto agregado ✅";

  document.getElementById("nombre").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("categoria").value = "";
  document.getElementById("desc").value = "";
  document.getElementById("imgUrl").value = "";
  document.getElementById("imgFile").value = "";

  renderList();
});

if (requireAdmin()) renderList();