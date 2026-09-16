import ItemCount from '../ItemCount/ItemCount';
import './ItemDetail.css';

// Componente de presentación pura: solo recibe el producto por props
const ItemDetail = ({ product }) => {
  const { name, price, category, img, description, stock } = product;

  const formattedPrice = price.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
  });

  return (
    <div className="item-detail">
      <div className="item-detail-image">
        <img src={img} alt={name} />
      </div>

      <div className="item-detail-info">
        <span className="item-detail-category">{category}</span>
        <h2 className="item-detail-name">{name}</h2>
        <p className="item-detail-price">{formattedPrice}</p>
        <p className="item-detail-description">{description}</p>
        <p className="item-detail-stock">Stock disponible: {stock}</p>

        <ItemCount stock={stock} />
      </div>
    </div>
  );
};

export default ItemDetail;
