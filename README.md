# Orisur

E-commerce de gadgets y tecnología portátil importada desde Asia (China, Japón, Corea) para su venta en Argentina.

## Tecnologías

- React
- Vite
- React Router DOM

## Instalación y ejecución

1. Clonar el repositorio
2. Instalar dependencias: `npm install`
3. Ejecutar en modo desarrollo: `npm run dev`
4. Abrir en el navegador: [http://localhost:5173](http://localhost:5173)

## Componentes

- **Layout**: componente contenedor de las rutas, envuelve las páginas con Navbar y Footer usando `<Outlet />` de React Router, manteniéndolos visibles en toda la navegación.
- **Navbar**: barra de navegación con el logo de la tienda (tipo monograma, enlace a Inicio), categorías de productos (Auriculares, Smartwatches, Cargadores, Accesorios) navegables con `NavLink`, e incluye el componente CartWidget.
- **CartWidget**: ícono de carrito de compras con la cantidad de ítems, por el momento hardcodeada.
- **ItemListContainer**: obtiene el catálogo de productos de forma asíncrona al montarse (`useState` + `useEffect`) y lo pasa por props a ItemList. Captura el parámetro `categoryId` de la URL con `useParams` y filtra el catálogo por categoría; si no hay categoría en la URL, muestra todos los productos. También renderiza la prop `greeting` como saludo de bienvenida.
- **ItemList**: recibe los productos por props y los recorre con `.map()` para renderizar un componente Item por cada uno, usando `id` como key.
- **Item**: componente de presentación pura que muestra la imagen, nombre, categoría y precio de un producto individual. Todo el contenido de la card está envuelto en un `Link` que navega al detalle del producto (`/item/:id`).
- **ItemDetailContainer**: captura el `id` del producto desde la URL con `useParams` y obtiene el producto correspondiente de forma asíncrona usando `useState` + `useEffect` con `async/await`, delegando la presentación a ItemDetail. Muestra un mensaje de carga mientras la promesa se resuelve.
- **ItemDetail**: componente de presentación pura que muestra el detalle completo de un producto (imagen, nombre, categoría, precio, descripción y stock disponible), e integra ItemCount para seleccionar la cantidad a comprar.
- **ItemCount**: recibe el stock disponible por props y administra la cantidad seleccionada con botones de incremento/decremento, sin permitir valores menores a 1 ni mayores al stock.
- **Footer**: pie de página con el nombre de la tienda y el año actual generado dinámicamente.
- **NotFound**: componente que se muestra cuando la ruta ingresada no coincide con ninguna de las rutas definidas (error 404).

## Datos y carga asíncrona

El catálogo de productos se simula mediante `src/mock/asyncMock.js`, que exporta una función `getProducts()` devolviendo una Promise resuelta con `setTimeout` (2000ms de demora) con un array de 6 productos. Cada producto incluye `id`, `name`, `price`, `category`, `img`, `stock` y `description`. ItemListContainer consume esta función dentro de un `useEffect`, guarda el resultado en estado con `useState` y lo delega a ItemList para su renderizado.

## Detalle de producto y promesa dinámica

Además del listado, se implementó la obtención de un producto individual mediante `getProductById(id)`, un servicio que retorna una Promise que simula demora con `setTimeout` y busca el producto por su propiedad `id` (nunca por índice), resolviendo con el producto encontrado o rechazando si no existe. Es una función dinámica: no devuelve siempre el mismo producto.

ItemDetailContainer consume esta promesa dentro de un `useEffect` usando `async/await` con `try/catch` (convención elegida en el proyecto para el manejo de promesas en los containers), guarda el resultado en estado y lo pasa por props a ItemDetail.

## Routing

La navegación de la aplicación se maneja con `react-router-dom`. `App.jsx` envuelve la app en un `BrowserRouter` y define las siguientes rutas dentro de un `Layout` compartido (Navbar y Footer persistentes vía `Outlet`):

- `/` — Inicio: muestra todos los productos.
- `/category/:categoryId` — Categoría: reutiliza el mismo ItemListContainer/ItemList/Item, filtrando por el parámetro de categoría recibido en la URL.
- `/item/:id` — Detalle de producto: ItemDetailContainer captura el `id` con `useParams` y obtiene el producto real correspondiente.
- `*` — Ruta 404: muestra el componente NotFound ante cualquier ruta no definida.

La navegación entre secciones se realiza siempre con `Link` y `NavLink`, sin usar etiquetas `<a>` nativas.

## Estado del proyecto

Pre-entrega 5: se integró React Router para dar navegación completa a la aplicación. Se implementaron las rutas de Inicio, Categoría (con filtrado dinámico vía `useParams`), Detalle de producto (conectado a datos reales vía `useParams` y `getProductById`) y una ruta 404. Se agregó un componente Layout con Navbar y Footer persistentes mediante `Outlet`, y se actualizó Navbar para usar `NavLink` en las categorías. El componente Item ahora navega al detalle mediante `Link`. Esta etapa se desarrolló en la rama `feature/routing`, fusionada luego a `main`.

Etapas anteriores: en Pre-entrega 4 se implementó la obtención dinámica de un producto individual mediante una promesa (`getProductById`), junto con los componentes ItemDetailContainer, ItemDetail e ItemCount. En Pre-entrega 3 se transformó el catálogo estático en dinámico consumiendo datos mock de forma asíncrona, con los componentes ItemList e Item, desarrollados en la rama `feature/listado-dinamico` y luego fusionados a `main`.
