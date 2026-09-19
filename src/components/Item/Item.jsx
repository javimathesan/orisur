import { Link } from "react-router-dom";
import "./Item.css";

const Item = ({ product }) => {
  const { id, name, price, img, category, description, stock } = product;

  return (
    <div className="item">
      <Link to={`/item/${id}`} className="item__link">
        <img className="item__img" src={img} alt={name} />
        <h3 className="item__name">{name}</h3>
        <p className="item__category">{category}</p>
        <p className="item__description">{description}</p>
        <p className="item__price">${price}</p>
        <p className="item__stock">Stock: {stock}</p>
      </Link>
    </div>
  );
};

export default Item;
