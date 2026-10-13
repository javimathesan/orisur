import { useState } from 'react';
import ItemCount from '../ItemCount/ItemCount';
import { formatPrice } from '../../services/formatPrice';
import { useCart } from '../../context/CartContext';
import './ItemDetail.css';

const ItemDetail = ({ product, onAdd }) => {
  const { id, name, price, category, img, description, stock } = product;

  // Traemos del contexto cuántas unidades de ESTE producto ya están en el carrito
  const { getItemQuantity } = useCart();
  const cantidadEnCarrito = getItemQuantity(id);

  // Stock real disponible para seguir agregando (nunca negativo)
  const stockDisponible = Math.max(0, stock - cantidadEnCarrito);

  // Mensaje de feedback tras intentar agregar al carrito
  // tipo: 'exito' | 'parcial' | 'sin-stock', usado para variar el estilo
  const [mensaje, setMensaje] = useState(null);

  // Envuelve el onAdd del Container: lo llama, captura cuánto se agregó
  // realmente (según stock disponible) y arma el mensaje correspondiente
  const handleAdd = (quantity) => {
    const cantidadAgregada = onAdd(quantity);

    if (cantidadAgregada === quantity) {
      setMensaje({
        texto: `Agregaste ${cantidadAgregada} unidad(es) al carrito.`,
        tipo: 'exito',
      });
    } else if (cantidadAgregada > 0) {
      setMensaje({
        texto: `Solo pudimos agregar ${cantidadAgregada} de ${quantity} unidad(es) por falta de stock.`,
        tipo: 'parcial',
      });
    } else {
      setMensaje({
        texto: 'No hay stock disponible para agregar este producto.',
        tipo: 'sin-stock',
      });
    }
  };

  return (
    <div className="item-detail">
      <div className="item-detail-image">
        <img src={img} alt={name} />
      </div>

      <div className="item-detail-info">
        <span className="item-detail-category">{category}</span>
        <h2 className="item-detail-name">{name}</h2>
        <p className="item-detail-price">{formatPrice(price)}</p>
        <p className="item-detail-description">{description}</p>
        <p className="item-detail-stock">Stock disponible: {stockDisponible}</p>

        {stockDisponible > 0 ? (
          <ItemCount stock={stockDisponible} onAdd={handleAdd} />
        ) : (
          <p className="item-detail-message item-detail-message--sin-stock">
            Ya tenés en el carrito todo el stock disponible de este producto.
          </p>
        )}

        {mensaje && (
          <p className={`item-detail-message item-detail-message--${mensaje.tipo}`}>
            {mensaje.texto}
          </p>
        )}
      </div>
    </div>
  );
};

export default ItemDetail;
