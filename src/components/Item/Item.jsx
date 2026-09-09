import "./ItemList.css";
import Item from "../Item/Item";

function Item({ product }) {
  const { name, price, category, img, stock, description } = product;

  return (
    <div className="item">
      <img className="item__img" src={img} alt={name} />
      <h3 className="item__name">{name}</h3>
      <p className="item__category">{category}</p>
      <p className="item__description">{description}</p>
      <p className="item__price">${price}</p>
      <p className="item__stock">Stock: {stock}</p>
    </div>
  );
}

export default Item;
