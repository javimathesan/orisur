// Formatea un número como precio en pesos argentinos.
export const formatPrice = (price) => {
  return price.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
  });
};
