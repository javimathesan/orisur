import { products } from "../mock/asyncMock";

// Busca un producto por su id dentro del array centralizado en asyncMock.
// Simula una demora de red con setTimeout y rechaza la promesa si no existe.
export const getProductById = (productId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = products.find((item) => item.id === productId);

      if (product) {
        resolve(product);
      } else {
        reject(new Error(`Producto con id ${productId} no encontrado`));
      }
    }, 2000);
  });
};
