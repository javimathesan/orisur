# Orisur

E-commerce de gadgets y tecnología portátil importada desde Asia (China, Japón, Corea) para su venta en Argentina.

## Tecnologías

* React 19
* Vite
* React Router DOM
* Context API
* Firebase

  * Cloud Firestore
  * Firebase Authentication

## Instalación y ejecución

1. Clonar el repositorio.

1. Instalar las dependencias ejecutando `npm install`.

1. Copiar el archivo `.env.example` como `.env`.

1. Completar las variables de entorno con las credenciales correspondientes al proyecto de Firebase.

1. Ejecutar la aplicación en modo desarrollo con `npm run dev`.

1. Abrir en el navegador: [http://localhost:5173](http://localhost:5173).

Para verificar la calidad del código con ESLint, ejecutar:

```bash
npm run lint
```

## Variables de entorno

El proyecto utiliza variables de entorno con prefijo `VITE_`, requerido por Vite para exponerlas en el cliente.

El archivo `.env` contiene la configuración correspondiente al proyecto de Firebase y se encuentra excluido del repositorio mediante `.gitignore`.

Se incluye un archivo `.env.example` como referencia, sin credenciales reales:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Estas variables se consumen en:

```text
src/services/firebase.jsx
```

para inicializar Firebase.

## Firebase

### Configuración

`src/services/firebase.jsx` centraliza la conexión con Firebase.

El archivo inicializa la aplicación y exporta:

* `db`: instancia de Cloud Firestore utilizada para leer el catálogo y guardar órdenes.
* `auth`: instancia de Firebase Authentication utilizada para registro, login y logout.

## Cloud Firestore

### Colección `items`

La colección `items` contiene el catálogo de productos.

Cada documento posee la información necesaria para mostrar y utilizar el producto.

Ejemplo:

```json
{
  "name": "Auriculares Bluetooth XPods",
  "description": "Auriculares inalámbricos con estuche de carga",
  "price": 15000,
  "img": "url-de-la-imagen",
  "category": "Auriculares",
  "stock": 20
}
```

El ID generado por Firestore se incorpora al objeto utilizado por React.

### Colección `orders`

La colección `orders` almacena las órdenes generadas desde el checkout.

Cada documento contiene el usuario autenticado, los datos de entrega, los productos comprados, el total de la operación y la fecha de creación generada por Firestore.

Ejemplo de estructura:

```json
{
  "uid": "uid-del-usuario-autenticado",
  "email": "usuario@email.com",
  "deliveryData": {
    "nombre": "Nombre",
    "apellido": "Apellido",
    "telefono": "Teléfono",
    "direccion": "Dirección",
    "ciudad": "Ciudad"
  },
  "items": [
    {
      "id": "id-del-producto",
      "name": "Nombre del producto",
      "price": 15000,
      "quantity": 2
    }
  ],
  "total": 30000,
  "createdAt": "serverTimestamp()"
}
```

Antes de generar una orden, el checkout verifica que:

* exista un usuario autenticado;
* el carrito tenga productos;
* los campos obligatorios del formulario estén completos.

La orden se crea mediante:

```text
addDoc()
```

sobre la colección `orders`.

La fecha se genera utilizando:

```text
serverTimestamp()
```

Si la operación finaliza correctamente:

1. Firestore genera el ID de la orden;
2. la aplicación muestra ese ID al usuario;
3. el carrito se vacía mediante `clear()`.

Si ocurre un error durante la creación de la orden, se muestra un mensaje de error y el carrito conserva sus productos.

## Reglas de seguridad de Firestore

Las reglas de Firestore diferencian los permisos según la colección.

### `items`

* La lectura es pública.
* No se permite escritura desde el cliente.
* El catálogo se administra desde Firebase.

### `orders`

La creación de órdenes solamente está permitida cuando existe un usuario autenticado y el `uid` incluido en el documento coincide con el usuario autenticado.

La validación sigue conceptualmente esta condición:

```text
request.auth != null
&&
request.resource.data.uid == request.auth.uid
```

No se permite leer, actualizar ni eliminar órdenes desde el cliente.

De esta manera, la seguridad no depende únicamente de las validaciones realizadas en la interfaz.

## Autenticación

La autenticación se administra mediante:

```text
src/context/AuthContext.jsx
```

`AuthProvider` mantiene el estado global del usuario y expone:

* `user`: usuario autenticado actual o `null`.
* `loading`: estado de carga mientras Firebase valida la sesión.
* `register(email, password)`: registra un nuevo usuario.
* `login(email, password)`: inicia sesión.
* `logout()`: cierra la sesión.

La sesión se sincroniza mediante:

```text
onAuthStateChanged
```

Esto permite conservar el estado del usuario al recargar la aplicación.

También se implementaron las rutas:

```text
/login
/register
```

Cada una contiene un formulario controlado con manejo de validaciones, estado de envío y errores.

Los errores de Firebase Authentication son procesados mediante:

```text
src/services/mapFirebaseError.js
```

Este servicio traduce los códigos de error de Firebase a mensajes claros en español.

Cuando existe un usuario autenticado, la Navbar muestra su email y permite cerrar sesión.

## Rutas protegidas

La aplicación implementa:

```text
src/components/ProtectedRoute/ProtectedRoute.jsx
```

Este componente utiliza el estado de autenticación para proteger el checkout.

La ruta protegida es:

```text
/checkout
```

Si un usuario no autenticado intenta acceder al checkout, es redirigido a:

```text
/login
```

mediante `Navigate` de React Router.

## Componentes

### Layout

Componente contenedor de las rutas.

Utiliza `<Outlet />` de React Router y mantiene visibles Navbar y Footer durante la navegación.

### Navbar

Barra de navegación principal.

Incluye:

* logo de la tienda;
* navegación por categorías;
* CartWidget;
* enlaces de Login y Register cuando no existe sesión;
* email del usuario y botón de cerrar sesión cuando existe una sesión activa.

### CartWidget

Muestra el ícono del carrito y la cantidad total de unidades agregadas.

Obtiene `totalItems` desde `CartContext` utilizando `useCart`.

Si el carrito está vacío, no muestra contador.

### ItemListContainer

Obtiene los productos directamente desde Firestore.

Sin categoría utiliza:

```text
collection()
getDocs()
```

Cuando existe `categoryId`, utiliza:

```text
query()
where()
```

para filtrar los productos directamente desde Firestore.

Maneja estados diferenciados de:

* carga;
* productos obtenidos correctamente;
* categoría sin resultados;
* error durante la consulta.

### ItemList

Recibe los productos mediante props y los recorre con `.map()` para renderizar un componente `Item` por producto.

### Item

Componente de presentación que muestra:

* imagen;
* nombre;
* categoría;
* precio.

La tarjeta navega hacia:

```text
/item/:id
```

mediante `Link`.

### ItemDetailContainer

Captura el ID del producto desde la URL utilizando `useParams`.

Obtiene el documento correspondiente mediante:

```text
doc()
getDoc()
```

Distingue entre:

* carga;
* producto obtenido correctamente;
* producto inexistente;
* error durante la consulta.

De esta forma, un error de conexión o permisos no se interpreta como si el producto no existiera.

### ItemDetail

Muestra:

* imagen;
* nombre;
* categoría;
* precio;
* descripción;
* stock.

Integra `ItemCount` para seleccionar una cantidad y permite agregar el producto al carrito mediante `CartContext`.

### ItemCount

Administra la cantidad seleccionada.

No permite valores menores a 1 ni mayores al stock disponible.

### Cart

Vista disponible en:

```text
/cart
```

Consume `CartContext` mediante `useCart`.

Permite:

* visualizar productos agregados;
* ver cantidades;
* ver precios unitarios;
* consultar subtotales;
* eliminar productos;
* vaciar el carrito;
* visualizar el total;
* continuar hacia el checkout.

### Login

Vista:

```text
/login
```

Permite iniciar sesión mediante email y contraseña.

Incluye:

* formulario controlado;
* validaciones;
* estado de envío;
* mensajes de error traducidos desde Firebase.

### Register

Vista:

```text
/register
```

Permite crear una cuenta mediante Firebase Authentication.

Utiliza la misma estrategia de validaciones y manejo de errores que Login.

### ProtectedRoute

Verifica que exista un usuario autenticado antes de permitir el acceso a sus rutas hijas.

Si no existe sesión, redirige a `/login`.

### Checkout

Vista protegida disponible en:

```text
/checkout
```

Solicita:

* nombre;
* apellido;
* teléfono;
* dirección;
* ciudad.

Antes de generar una orden valida:

* autenticación;
* existencia de productos en el carrito;
* campos obligatorios.

Después construye el objeto de orden y lo guarda en Firestore mediante `addDoc()`.

Si la operación finaliza correctamente:

* muestra el ID de la orden;
* confirma la compra;
* vacía el carrito.

Si falla:

* muestra un mensaje;
* conserva los productos del carrito.

### Footer

Pie de página con el nombre de la tienda y el año actual generado dinámicamente.

### NotFound

Componente utilizado cuando la URL ingresada no corresponde con ninguna ruta definida.

## Catálogo y detalle con Firestore

En esta etapa se reemplazó completamente el sistema anterior basado en datos simulados.

Se eliminaron:

```text
src/mock/asyncMock.js
src/services/getProductById.js
```

Los productos ahora se obtienen directamente desde Firestore.

### Listado de productos

`ItemListContainer` consulta:

```text
collection(db, "items")
```

y obtiene los documentos mediante:

```text
getDocs()
```

Cuando existe una categoría en la URL, utiliza:

```text
query()
where("category", "==", categoryId)
```

De esta manera, Firestore realiza el filtrado antes de enviar los documentos al cliente.

### Detalle de producto

`ItemDetailContainer` construye la referencia mediante:

```text
doc(db, "items", id)
```

y obtiene el documento utilizando:

```text
getDoc()
```

El ID generado por Firestore se incorpora al objeto del producto que consume React.

Los containers utilizan `async/await` con `try/catch/finally` dentro de `useEffect`.

## Carrito de compras

El estado global del carrito se administra mediante:

```text
src/context/CartContext.jsx
```

`CartProvider` mantiene el estado `cart` y expone:

* `addItem(item, quantity)`: agrega un producto al carrito o incrementa su cantidad si ya existe.
* `removeItem(id)`: elimina un producto.
* `clear()`: vacía el carrito.
* `isInCart(id)`: indica si un producto se encuentra en el carrito.
* `totalItems`: cantidad total de unidades.
* `totalPrice`: importe total del carrito.

Las actualizaciones se realizan de forma inmutable utilizando spread operators, `.map()` y `.filter()`.

También se utiliza el custom hook:

```text
useCart
```

para simplificar el consumo del contexto y evitar prop drilling.

## Checkout y generación de órdenes

El checkout requiere autenticación.

El flujo es el siguiente:

1. El usuario agrega productos al carrito.
2. Desde `/cart` intenta continuar al checkout.
3. Si no está autenticado, es redirigido a `/login`.
4. Después de iniciar sesión puede ingresar a `/checkout`.
5. Completa los datos de entrega.
6. El formulario valida los campos obligatorios.
7. Se verifica nuevamente que exista un usuario autenticado.
8. Se verifica que el carrito tenga productos.
9. Se crea el objeto de orden.
10. Se utiliza `addDoc()` para almacenarlo en Firestore.
11. Se utiliza `serverTimestamp()` para registrar la fecha.
12. Firestore devuelve el ID generado.
13. El ID se muestra como confirmación.
14. El carrito se vacía únicamente después de una creación exitosa.

## Manejo de errores y feedback visual

Las operaciones asíncronas muestran feedback para evitar estados ambiguos.

### Catálogo

`ItemListContainer` contempla:

* carga;
* listado obtenido correctamente;
* categoría sin resultados;
* error durante la consulta.

### Detalle

`ItemDetailContainer` contempla:

* carga;
* producto obtenido;
* producto inexistente;
* error de conexión o consulta.

### Errores de autenticación

Login y Register muestran mensajes en español mediante `mapFirebaseError.js`.

### Errores durante el checkout

El checkout informa:

* campos obligatorios faltantes;
* carrito vacío;
* falta de autenticación;
* error al generar una orden.

Durante la creación se deshabilita temporalmente el botón de confirmación y se muestra el estado:

```text
Procesando...
```

## Routing

La navegación se implementa mediante `react-router-dom`.

La aplicación utiliza:

* `BrowserRouter`
* `Routes`
* `Route`
* `Link`
* `NavLink`
* `Navigate`
* `Outlet`
* `useParams`

Las rutas disponibles son:

* `/` — catálogo completo.
* `/category/:categoryId` — catálogo filtrado por categoría.
* `/item/:id` — detalle de producto.
* `/cart` — carrito.
* `/login` — inicio de sesión.
* `/register` — registro.
* `/checkout` — checkout protegido.
* `*` — página 404.

La navegación interna se realiza mediante `Link` y `NavLink`.

## Recorrido de prueba

Para verificar las principales funcionalidades de la aplicación se puede realizar el siguiente recorrido:

1. Ejecutar `npm run dev`.
1. Ingresar a `/`.
1. Verificar que los productos se carguen desde Firestore.
1. Seleccionar una categoría desde la Navbar.
1. Comprobar que solamente se muestren los productos correspondientes a esa categoría.
1. Abrir un producto.
1. Verificar que `/item/:id` muestre su información obtenida desde Firestore.
1. Seleccionar una cantidad válida.
1. Agregar el producto al carrito.
1. Ingresar a `/cart`.
1. Verificar productos, cantidades, subtotales y total.
1. Intentar acceder a `/checkout` sin iniciar sesión.
1. Verificar que la aplicación redirija a `/login`.
1. Crear una cuenta desde `/register` o iniciar sesión con una cuenta existente.
1. Recargar la página.
1. Verificar que la sesión continúe activa.
1. Verificar que la Navbar muestre el email del usuario.
1. Volver al carrito e ingresar a `/checkout`.
1. Completar los datos de entrega.
1. Confirmar la compra.
1. Verificar que se muestre el ID generado por Firestore.
1. Verificar que el carrito quede vacío después de una compra exitosa.
1. Probar el botón de cerrar sesión.

## Casos de prueba adicionales

También pueden comprobarse los siguientes casos:

* Ingresar a un ID de producto inexistente.
* Intentar acceder al checkout sin autenticación.
* Intentar continuar con el carrito vacío.
* Intentar enviar el checkout con campos incompletos.
* Ingresar credenciales incorrectas.
* Comprobar que los errores de Firebase se muestren en pantalla.
* Comprobar que la aplicación no quede indefinidamente en estado de carga.

## Estado del proyecto

### Pre-entrega 7

En esta etapa se migró la aplicación desde datos simulados hacia Firebase.

Se incorporó:

* Firebase SDK.
* Configuración mediante variables de entorno.
* Cloud Firestore.
* Colección `items`.
* Consultas mediante `collection()` y `getDocs()`.
* Filtrado por categoría mediante `query()` y `where()`.
* Obtención individual mediante `doc()` y `getDoc()`.
* Firebase Authentication.
* Registro de usuarios.
* Inicio de sesión.
* Cierre de sesión.
* Persistencia mediante `onAuthStateChanged`.
* `AuthContext`.
* Rutas `/login` y `/register`.
* `ProtectedRoute`.
* Protección de `/checkout`.
* Generación de órdenes en Firestore.
* Asociación de cada orden con el usuario autenticado.
* Uso de `addDoc()`.
* Uso de `serverTimestamp()`.
* ID de confirmación de compra.
* Reglas de seguridad de Firestore.
* Manejo de errores de Firebase en español.
* Estados diferenciados de carga, ausencia de resultados y error.
* Eliminación de los mocks de productos utilizados en etapas anteriores.
* Correcciones de ESLint.

Esta etapa se desarrolla en la rama:

```text
feature/firebase-integration
```

### Pre-entrega 6

Se incorporó Context API para administrar globalmente el carrito.

Se creó `CartContext` y `CartProvider` con:

* `addItem`
* `removeItem`
* `clear`
* `isInCart`
* `totalItems`
* `totalPrice`

ItemDetail se integró con el carrito mediante `useCart`.

CartWidget comenzó a reflejar la cantidad real de unidades.

También se agregaron:

```text
/cart
/checkout
```

en sus versiones iniciales.

Esta etapa se desarrolló en:

```text
feature/cart-context
```

y posteriormente se fusionó a `main`.

### Pre-entrega 5

Se incorporó React Router.

Se implementaron:

* Inicio.
* Categorías.
* Detalle de producto.
* Ruta 404.
* Layout.
* Navbar.
* Footer.
* Navegación mediante `Link` y `NavLink`.

Esta etapa se desarrolló en:

```text
feature/routing
```

y posteriormente se fusionó a `main`.

### Etapas anteriores

En la Pre-entrega 4 se implementó el detalle dinámico de productos mediante una promesa simulada junto con:

* ItemDetailContainer.
* ItemDetail.
* ItemCount.

En la Pre-entrega 3 se transformó el catálogo estático en un catálogo dinámico mediante datos mock y carga asíncrona.

Los mecanismos basados en mocks fueron reemplazados por Firestore durante la Pre-entrega 7.
