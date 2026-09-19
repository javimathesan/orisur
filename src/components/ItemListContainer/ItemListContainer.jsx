import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemList from "../ItemList/ItemList";
import { getProducts } from "../../mock/asyncMock";
import "./ItemListContainer.css";

const ItemListContainer = ({ greeting }) => {
  // Estado que va a guardar los productos una vez que lleguen
  const [items, setItems] = useState([]);

  // Capturamos el parámetro de categoría desde la URL (si existe)
  const { categoryId } = useParams();

  useEffect(() => {
    // Función async interna: useEffect no puede recibir un callback async directo
    const fetchProducts = async () => {
      try {
        const products = await getProducts();

        // Si hay categoryId en la URL, filtramos; si no, mostramos todos
        if (categoryId) {
          setItems(products.filter((product) => product.category === categoryId));
        } else {
          setItems(products);
        }
      } catch (error) {
        // Manejo de error agrupado, según convención del proyecto
      }
    };

    fetchProducts();
  }, [categoryId]); // se re-ejecuta cada vez que cambia la categoría en la URL

  return (
    <div className="item-list-container">
      <h2 className="greeting">{greeting}</h2>
      <ItemList items={items} />
    </div>
  );
};

export default ItemListContainer;
