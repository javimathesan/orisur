# Orisur

E-commerce de gadgets y tecnología portátil importada desde Asia (China, Japón, Corea) para su venta en Argentina.

## Tecnologías

- React
- Vite

## Instalación y ejecución

1. Clonar el repositorio
2. Instalar dependencias: `npm install`
3. Ejecutar en modo desarrollo: `npm run dev`
4. Abrir en el navegador: [http://localhost:5173](http://localhost:5173)

## Componentes

- **Navbar**: barra de navegación con el branding de la tienda, categorías de productos (Auriculares, Smartwatches, Cargadores, Accesorios) e incluye el componente CartWidget.
- **CartWidget**: ícono de carrito de compras con la cantidad de ítems, por el momento hardcodeada.
- **ItemListContainer**: recibe la prop `greeting` y la renderiza como saludo de bienvenida, mostrando un mensaje acorde a la identidad de la tienda.
- **Footer**: pie de página con el nombre de la tienda y el año actual generado dinámicamente.

## Estado del proyecto

Pre-entrega 2: se implementó el layout inicial del sitio con los componentes Navbar, CartWidget, ItemListContainer y Footer, estilizados con Flexbox y CSS tradicional. Los componentes están organizados en subcarpetas dentro de `src/components/`.
