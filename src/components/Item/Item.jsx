import "./Item.css"; // Busca el CSS correcto 

const Item = ({ product }) => {
  const { name, price, img, category, description, stock } = product;

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
};

export default Item;

