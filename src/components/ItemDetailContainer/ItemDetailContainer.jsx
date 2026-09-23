import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../services/getProductById';
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
        const result = await getProductById(id);
        setProduct(result);
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
