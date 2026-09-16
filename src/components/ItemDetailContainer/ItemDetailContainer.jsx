import { useState, useEffect } from 'react';
import { getProductById } from '../../services/getProductById';
import ItemDetail from '../ItemDetail/ItemDetail';
import './ItemDetailContainer.css';

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);

  // Id hardcodeado temporalmente: en el Modulo 5 llegara desde la URL con React Router
  const productId = 3;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const result = await getProductById(productId);
        setProduct(result);
      } catch (error) {
        setProduct(null);
      }
    };

    fetchProduct();
  }, []);

  if (!product) {
    return <p className="loading-message">Cargando producto...</p>;
  }

  return <ItemDetail product={product} />;
};

export default ItemDetailContainer;
