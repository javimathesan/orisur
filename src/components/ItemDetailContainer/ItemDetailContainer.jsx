import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useCart } from '../../context/CartContext';
import ItemDetail from '../ItemDetail/ItemDetail';
import './ItemDetailContainer.css';

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, 'items', id);
        const snapshot = await getDoc(productRef);

        if (snapshot.exists()) {
          setProduct({ id: snapshot.id, ...snapshot.data() });
        } else {
          setProduct(null);
        }
      } catch (error) {
        setProduct(null);
      }
    };

    fetchProduct();
  }, [id]);

  // Se arma acá para que ItemDetail siga sin conocer el contexto
  const handleAdd = (quantity) => {
    addItem(product, quantity);
  };

  if (!product) {
    return <p className="loading-message">Cargando producto...</p>;
  }

  return <ItemDetail product={product} onAdd={handleAdd} />;
};

export default ItemDetailContainer;
