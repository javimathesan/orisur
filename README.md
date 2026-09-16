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
- **ItemDetailContainer**: obtiene un producto puntual de forma asíncrona a partir de su `id` (por el momento hardcodeado, hasta que se integre React Router en el Módulo 5) usando `useState` + `useEffect` con `async/await`, y lo delega a ItemDetail para su renderizado. Muestra un mensaje de carga mientras la promesa se resuelve.
- **ItemDetail**: componente de presentación pura que muestra el detalle completo de un producto (imagen, nombre, categoría, precio, descripción y stock disponible), e integra ItemCount para seleccionar la cantidad a comprar.
- **ItemCount**: recibe el stock disponible por props y administra la cantidad seleccionada con botones de incremento/decremento, sin permitir valores menores a 1 ni mayores al stock.
- **Footer**: pie de página con el nombre de la tienda y el año actual generado dinámicamente.

## Datos y carga asíncrona

El catálogo de productos se simula mediante `src/mock/asyncMock.js`, que exporta una función `getProducts()` devolviendo una Promise resuelta con `setTimeout` (2000ms de demora) con un array de 6 productos. Cada producto incluye `id`, `name`, `price`, `category`, `img`, `stock` y `description`. ItemListContainer consume esta función dentro de un `useEffect`, guarda el resultado en estado con `useState` y lo delega a ItemList para su renderizado.

## Detalle de producto y promesa dinámica

Además del listado, se implementó la obtención de un producto individual mediante `getProductById(id)`, un servicio que retorna una Promise que simula demora con `setTimeout` y busca el producto por su propiedad `id` (nunca por índice), resolviendo con el producto encontrado o rechazando si no existe. Es una función dinámica: no devuelve siempre el mismo producto.

ItemDetailContainer consume esta promesa dentro de un `useEffect` usando `async/await` con `try/catch` (convención elegida en el proyecto para el manejo de promesas en los containers, priorizando legibilidad y consistencia), guarda el resultado en estado y lo pasa por props a ItemDetail.

> **Nota:** por el momento, ItemDetailContainer no está montado en `App.jsx`. Su integración visual en la navegación se realizará en el Módulo 5, al incorporar React Router y obtener el `id` del producto desde la URL. Su funcionamiento fue verificado manualmente montándolo de forma temporal en App.jsx durante el desarrollo.

## Estado del proyecto

Pre-entrega 4: se implementó la obtención dinámica de un producto individual mediante una promesa (`getProductById`), junto con los componentes ItemDetailContainer, ItemDetail e ItemCount, siguiendo la separación de responsabilidades entre lógica asíncrona, gestión de estado y presentación. La integración de estos componentes en la navegación de la app se completará en el Módulo 5 con React Router.

El desarrollo de esta etapa se realizó directamente sobre la rama `main`. Etapas anteriores: en Pre-entrega 3 se transformó el catálogo estático en dinámico consumiendo datos mock de forma asíncrona, con los componentes ItemList e Item, desarrollados en la rama `feature/listado-dinamico` y luego fusionados a `main`.
