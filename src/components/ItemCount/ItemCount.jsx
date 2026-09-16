import { useState } from 'react';
import './ItemCount.css';

// Recibe el stock disponible por props; nunca se hardcodea acá
const ItemCount = ({ stock, initial = 1 }) => {
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

  return (
    <div className="item-count">
      <button onClick={decrement} disabled={count <= 1}>
        -
      </button>
      <span className="item-count-value">{count}</span>
      <button onClick={increment} disabled={count >= stock}>
        +
      </button>
    </div>
  );
};

export default ItemCount;
