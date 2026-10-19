// Importamos create para construir el store y persist para guardarlo.
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// El store guarda el carrito y las acciones que lo modifican.
// Ningún componente conserva su propia copia de los items.
export const useCarritoStore = create(
  persist(
    (set) => ({
      // ===== ESTADO =====
      // items contiene los productos agregados; cada uno incluye cantidad.
      items: [],

      // ===== ACCIONES =====

      // Agrega un producto completo al carrito.
      agregarProducto: (producto) =>
        set((state) => {
          // Buscamos si el producto ya existe comparando por id.
          const existe = state.items.find((item) => item.id === producto.id)

          // Si ya existe, creamos un arreglo nuevo y aumentamos su cantidad.
          if (existe) {
            return {
              items: state.items.map((item) =>
                item.id === producto.id
                  ? { ...item, cantidad: item.cantidad + 1 }
                  : item,
              ),
            }
          }

          // Si no existe, lo agregamos al final con cantidad 1.
          return { items: [...state.items, { ...producto, cantidad: 1 }] }
        }),

      // Resta una unidad. Si la cantidad llega a 0, el producto sale del carrito.
      disminuirCantidad: (id) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.id === id
                ? { ...item, cantidad: item.cantidad - 1 }
                : item,
            )
            .filter((item) => item.cantidad > 0),
        })),

      // Elimina por completo un producto usando su id.
      eliminarProducto: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      // Vacía el carrito sin necesitar el estado anterior.
      vaciarCarrito: () => set({ items: [] }),
    }),
    {
      // Nombre de la clave que Zustand usa en localStorage.
      name: 'carrito-zustand',
      // Solo persistimos los datos del carrito, no las funciones.
      partialize: (state) => ({ items: state.items }),
    },
  ),
)
