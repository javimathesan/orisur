import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "../../services/firebase";
import ItemList from "../ItemList/ItemList";
import "./ItemListContainer.css";

const ItemListContainer = ({ greeting }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { categoryId } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const itemsCollection = collection(db, "items");

        const itemsQuery = categoryId
          ? query(
              itemsCollection,
              where("category", "==", categoryId)
            )
          : itemsCollection;

        const snapshot = await getDocs(itemsQuery);

        const products = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setItems(products);
      } catch {
        setError(
          "No pudimos cargar los productos. Probá de nuevo más tarde."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <div className="item-list-container">
      <h2 className="greeting">
        {greeting}
      </h2>

      {loading && (
        <p className="item-list-status">
          Cargando productos...
        </p>
      )}

      {!loading && error && (
        <p className="item-list-error">
          {error}
        </p>
      )}

      {!loading &&
        !error &&
        items.length === 0 && (
          <p className="item-list-status">
            No hay productos en esta categoría.
          </p>
        )}

      {!loading &&
        !error &&
        items.length > 0 && (
          <ItemList items={items} />
        )}
    </div>
  );
};

export default ItemListContainer;