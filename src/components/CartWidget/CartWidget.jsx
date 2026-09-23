import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

// Componente que muestra el ícono del carrito y la cantidad real de ítems
function CartWidget() {
  const { totalItems } = useCart();

  return (
    <Link to="/cart" className="cart-widget">
      🛒
      {totalItems > 0 && <b className="cart-widget-count">{totalItems}</b>}
    </Link>
  );
}

export default CartWidget;
