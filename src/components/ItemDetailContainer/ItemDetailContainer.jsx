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
  const [error, setError] = useState(false); // estado separado para errores de red/permiso
  const { id } = useParams();
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setNotFound(false);
      setError(false);

      try {
        const productRef = doc(db, 'items', id);
        const snapshot = await getDoc(productRef);

        if (snapshot.exists()) {
          setProduct({ id: snapshot.id, ...snapshot.data() });
        } else {
          setProduct(null);
          setNotFound(true);
        }
      } catch {
        // catch sin binding: evita el warning de variable no usada
        setProduct(null);
        setError(true);
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
    return <p className="status-message">Cargando producto...</p>;
  }

  if (error) {
    return (
      <div className="detail-feedback">
        <p className="error-message">
          No pudimos cargar el producto. Verificá tu conexión e intentá nuevamente.
        </p>
        <Link to="/">Volver al catálogo</Link>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="detail-feedback">
        <p className="status-message">No encontramos el producto que buscás.</p>
        <Link to="/">Volver al catálogo</Link>
      </div>
    );
  }

  return <ItemDetail product={product} onAdd={handleAdd} />;
};

export default ItemDetailContainer;
