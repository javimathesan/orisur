import ItemCount from '../ItemCount/ItemCount';
import { formatPrice } from '../../services/formatPrice';
import './ItemDetail.css';

const ItemDetail = ({ product, onAdd }) => {
  const { name, price, category, img, description, stock } = product;

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
        <p className="item-detail-stock">Stock disponible: {stock}</p>

        <ItemCount stock={stock} onAdd={onAdd} />
      </div>
    </div>
  );
};

export default ItemDetail;
