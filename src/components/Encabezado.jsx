// Importamos el hook del store para leer el carrito.
import { useCarritoStore } from '../store/useCarritoStore'

// Encabezado muestra el título y el total de unidades del carrito.
function Encabezado() {
  // El selector hace que este componente solo se actualice cuando items cambia.
  const items = useCarritoStore((state) => state.items)

  // Sumamos las cantidades de todos los items; el acumulador empieza en 0.
  const totalUnidades = items.reduce((suma, item) => suma + item.cantidad, 0)

  return (
    <header className="encabezado">
      {/* Nombre de la tienda */}
      <h1>Mi Tienda</h1>

      {/* Insignia con el número de unidades en el carrito */}
      <span className="insignia" aria-label={`${totalUnidades} unidades en el carrito`}>
        {totalUnidades}
      </span>
    </header>
  )
}

// Exportamos el componente para usarlo en App.
export default Encabezado
