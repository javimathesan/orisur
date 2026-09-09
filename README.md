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
- **ItemListContainer**: obtiene el catálogo de productos de forma asíncrona al montarse (`useState` + `useEffect`) y lo pasa por props a ItemList. También renderiza la prop `greeting` como saludo de bienvenida, mostrando un mensaje acorde a la identidad de la tienda.
- **ItemList**: recibe los productos por props y los recorre con `.map()` para renderizar un componente Item por cada uno, usando `id` como key.
- **Item**: componente de presentación pura que muestra la imagen, nombre, categoría y precio de un producto individual.
- **Footer**: pie de página con el nombre de la tienda y el año actual generado dinámicamente.

## Datos y carga asíncrona

El catálogo de productos se simula mediante `src/mock/asyncMock.js`, que exporta una función `getProducts()` devolviendo una Promise resuelta con `setTimeout` (2000ms de demora) con un array de 6 productos. Cada producto incluye `id`, `name`, `price`, `category`, `img`, `stock` y `description`. ItemListContainer consume esta función dentro de un `useEffect`, guarda el resultado en estado con `useState` y lo delega a ItemList para su renderizado.

## Estado del proyecto

Pre-entrega 3: se transformó el catálogo estático en dinámico, consumiendo datos mock de forma asíncrona. Se agregaron los componentes ItemList e Item, y se refactorizó ItemListContainer para manejar estado y efectos con `useState`/`useEffect`. El listado se renderiza con keys estables basadas en el `id` de cada producto, sin errores ni warnings de consola. El desarrollo se realizó en la rama `feature/listado-dinamico`, luego fusionada a `main`.
