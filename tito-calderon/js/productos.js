// --- "DB" en localStorage ---
const LS_PRODUCTS = "tito_products_v1";

// Productos por defecto (si todavía no hay nada guardado)
const DEFAULT_PRODUCTS = [
  { id: 1, nombre: "Moka", precio: 18999, imagen: "img/moka.png", descripcion: "Clásica cafetera italiana.", categoria: "Moka" },
  { id: 2, nombre: "Sifón", precio: 54999, imagen: "img/sifon.png", descripcion: "Extracción aromática y limpia.", categoria: "Sifón" },
  { id: 3, nombre: "Espresso", precio: 249999, imagen: "img/espresso.png", descripcion: "Intenso y con crema.", categoria: "Espresso" },
  { id: 4, nombre: "Chemex", precio: 45999, imagen: "img/chemex.png", descripcion: "Filtrado suave y limpio.", categoria: "Chemex" },
  { id: 5, nombre: "De vacío", precio: 69999, imagen: "img/de_vacio.png", descripcion: "Método de vacío.", categoria: "De vacío" },
  { id: 6, nombre: "Prensa Francesa", precio: 29999, imagen: "img/prensa.png", descripcion: "Más cuerpo y textura.", categoria: "Prensa Francesa" },
  { id: 7, nombre: "Turca", precio: 21999, imagen: "img/turca.png", descripcion: "Tradición y sabor potente.", categoria: "Turca" },
  { id: 8, nombre: "Goteo V60", precio: 38999, imagen: "img/v60.png", descripcion: "Goteo controlado.", categoria: "Goteo V60" }
];

function loadProducts() {
  const raw = localStorage.getItem(LS_PRODUCTS);
  if (!raw) {
    localStorage.setItem(LS_PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
    return [...DEFAULT_PRODUCTS];
  }
  try {
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) throw new Error("Formato inválido");
    return data;
  } catch {
    localStorage.setItem(LS_PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
    return [...DEFAULT_PRODUCTS];
  }
}

function saveProducts(list) {
  localStorage.setItem(LS_PRODUCTS, JSON.stringify(list));
}

function nextProductId(list) {
  return list.reduce((max, p) => Math.max(max, Number(p.id) || 0), 0) + 1;
}