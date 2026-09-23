import { useState } from 'react';
import './ItemCount.css';

// Recibe el stock disponible por props; nunca se hardcodea acá
// onAdd: callback que se ejecuta al confirmar la cantidad elegida
const ItemCount = ({ stock, initial = 1, onAdd }) => {
  const [count, setCount] = useState(initial);

  const increment = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleAdd = () => {
    onAdd(count);
  };

  return (
    <div className="item-count">
      <div className="item-count-controls">
        <button onClick={decrement} disabled={count <= 1}>
          -
        </button>
        <span className="item-count-value">{count}</span>
        <button onClick={increment} disabled={count >= stock}>
          +
        </button>
      </div>

      <button
        className="item-count-add"
        onClick={handleAdd}
        disabled={stock === 0}
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default ItemCount;
