// URL del catálogo público que se usa en el reto 4.
// La guía original usaba un arreglo local; aquí los datos vienen de una API.
const URL_PRODUCTOS = 'https://fakestoreapi.com/products'

/**
 * Obtiene los productos de la tienda desde Fake Store API.
 *
 * La API devuelve propiedades en inglés (title, price), así que se adaptan
 * a los nombres que ya usan el store y los componentes (nombre, precio).
 *
 * @param {AbortSignal} [signal] Permite cancelar la petición si el componente
 * se desmonta antes de que termine.
 * @returns {Promise<Array<{id: number, nombre: string, precio: number}>>}
 */
export async function obtenerProductos(signal) {
  const respuesta = await fetch(URL_PRODUCTOS, { signal })

  // fetch no lanza error por respuestas 4xx o 5xx; hay que revisarlo aparte.
  if (!respuesta.ok) {
    throw new Error(`No se pudo cargar el catálogo (HTTP ${respuesta.status})`)
  }

  const datos = await respuesta.json()

  // Cada producto conserva su id y se adaptan el nombre y el precio.
  return datos.map((producto) => ({
    id: producto.id,
    nombre: producto.title,
    precio: producto.price,
  }))
}
