import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useCart } from '../../context/CartContext';
import ItemDetail from '../ItemDetail/ItemDetail';
import './ItemDetailContainer.css';

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { id } = useParams();
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setNotFound(false);

      try {
        const productRef = doc(db, 'items', id);
        const snapshot = await getDoc(productRef);

        if (snapshot.exists()) {
          setProduct({ id: snapshot.id, ...snapshot.data() });
        } else {
          setProduct(null);
          setNotFound(true);
        }
      } catch (error) {
        setProduct(null);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAdd = (quantity) => {
    addItem(product, quantity);
  };

  if (loading) {
    return <p className="loading-message">Cargando producto...</p>;
  }

  if (notFound) {
    return (
      <div className="not-found-message">
        <p>No encontramos el producto que buscás.</p>
        <Link to="/">Volver al catálogo</Link>
      </div>
    );
  }

  return <ItemDetail product={product} onAdd={handleAdd} />;
};

export default ItemDetailContainer;
