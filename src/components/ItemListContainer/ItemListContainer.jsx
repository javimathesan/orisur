import { useState, useEffect } from "react";
import ItemList from "../ItemList/ItemList";
import { getProducts } from "../../mock/asyncMock";
import "./ItemListContainer.css";

const ItemListContainer = ({ greeting }) => {
  // Estado que va a guardar los productos una vez que lleguen
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Función async interna: useEffect no puede recibir un callback async directo
    const fetchProducts = async () => {
      const products = await getProducts();
      setItems(products);
    };

    fetchProducts();
  }, []); // array vacío = se ejecuta solo una vez, al montar

  return (
    <div className="item-list-container">
      <h2 className="greeting">{greeting}</h2>
      <ItemList items={items} />
    </div>
  );
};

export default ItemListContainer;

