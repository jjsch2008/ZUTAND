// Importamos el hook del store.
import { useCarritoStore } from '../store/useCarritoStore'

// Fake Store API devuelve los precios en dólares; se muestran con ese formato.
const formatoPrecio = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

// Carrito muestra los productos agregados, los subtotales y el total.
function Carrito() {
  // Leemos items y las acciones que se usan en este componente.
  const items = useCarritoStore((state) => state.items)
  const disminuirCantidad = useCarritoStore(
    (state) => state.disminuirCantidad,
  )
  const eliminarProducto = useCarritoStore(
    (state) => state.eliminarProducto,
  )
  const vaciarCarrito = useCarritoStore((state) => state.vaciarCarrito)

  // Total general: precio por cantidad de cada item, sumado.
  const total = items.reduce(
    (suma, item) => suma + item.precio * item.cantidad,
    0,
  )

  // Si el carrito está vacío, mostramos el mensaje y terminamos aquí.
  if (items.length === 0) {
    return (
      <section className="panel">
        <h2>Carrito</h2>
        <p className="vacio">Tu carrito está vacío</p>
      </section>
    )
  }

  // Si hay items, mostramos la lista, los subtotales y el total.
  return (
    <section className="panel">
      <h2>Carrito</h2>

      {/* Una fila por cada item del carrito */}
      {items.map((item) => (
        <div key={item.id} className="fila">
          <div>
            <p className="fila-nombre">{item.nombre}</p>

            {/* Cantidad, precio unitario y subtotal de ese producto */}
            <p className="fila-detalle">
              {item.cantidad} x {formatoPrecio.format(item.precio)}
            </p>
            <p className="subtotal">
              Subtotal: {formatoPrecio.format(item.precio * item.cantidad)}
            </p>
          </div>

          {/* Acciones para restar una unidad o quitar el producto */}
          <div className="acciones">
            <button
              type="button"
              className="btn btn-secundario btn-cantidad"
              aria-label={`Disminuir cantidad de ${item.nombre}`}
              onClick={() => disminuirCantidad(item.id)}
            >
              −
            </button>
            <button
              type="button"
              className="btn btn-secundario"
              onClick={() => eliminarProducto(item.id)}
            >
              Quitar
            </button>
          </div>
        </div>
      ))}

      {/* Bloque con el total a pagar */}
      <div className="total">
        <span>Total</span>
        <strong>{formatoPrecio.format(total)}</strong>
      </div>

      {/* Vacía todo el carrito; no necesita parámetros */}
      <button
        type="button"
        className="btn btn-secundario btn-bloque"
        onClick={vaciarCarrito}
      >
        Vaciar carrito
      </button>
    </section>
  )
}

// Exportamos el componente.
export default Carrito
