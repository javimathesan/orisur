import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/firebase";
import ItemList from "../ItemList/ItemList";
import "./ItemListContainer.css";

const ItemListContainer = ({ greeting }) => {
  // Estado que va a guardar los productos una vez que lleguen
  const [items, setItems] = useState([]);

  // Capturamos el parámetro de categoría desde la URL (si existe)
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const itemsCollection = collection(db, "items");

        // Si hay categoryId, armamos una query filtrada en el servidor;
        // si no, traemos toda la colección
        const itemsQuery = categoryId
          ? query(itemsCollection, where("category", "==", categoryId))
          : itemsCollection;

        const snapshot = await getDocs(itemsQuery);

        // Combinamos el id del documento con sus datos
        const products = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setItems(products);
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
