import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../services/getProductById';
import ItemDetail from '../ItemDetail/ItemDetail';
import './ItemDetailContainer.css';

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const result = await getProductById(id);
        setProduct(result);
      } catch (error) {
        setProduct(null);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <p className="loading-message">Cargando producto...</p>;
  }

  return <ItemDetail product={product} />;
};

export default ItemDetailContainer;

