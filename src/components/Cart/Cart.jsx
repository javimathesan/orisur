import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../services/formatPrice';
import './Cart.css';

const Cart = () => {
  const { cart, removeItem, clear, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Tu carrito está vacío</h2>
        <p>Todavía no agregaste productos. ¡Explorá el catálogo!</p>
        <Link to="/" className="cart-back-link">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>Tu carrito</h2>

      <ul className="cart-list">
        {cart.map((item) => (
          <li key={item.id} className="cart-item">
            <img src={item.img} alt={item.name} className="cart-item-img" />

            <div className="cart-item-info">
              <p className="cart-item-name">{item.name}</p>
              <p className="cart-item-qty">Cantidad: {item.quantity}</p>
              <p className="cart-item-price">
                Precio unitario: {formatPrice(item.price)}
              </p>
              <p className="cart-item-subtotal">
                Subtotal: {formatPrice(item.price * item.quantity)}
              </p>
            </div>

            <button
              className="cart-item-remove"
              onClick={() => removeItem(item.id)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <div className="cart-summary">
        <p className="cart-total">Total: {formatPrice(totalPrice)}</p>

        <div className="cart-actions">
          <button className="cart-clear" onClick={clear}>
            Vaciar carrito
          </button>

          <Link to="/checkout" className="cart-checkout">
            Finalizar compra
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
