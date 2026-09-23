import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../services/formatPrice';
import './Checkout.css';

const Checkout = () => {
  const { cart, clear, totalItems, totalPrice } = useCart();
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '' });
  const [comprado, setComprado] = useState(false);
  const [nombreComprador, setNombreComprador] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNombreComprador(form.nombre);
    clear();
    setComprado(true);
  };

  // Compra ya finalizada: mensaje de agradecimiento
  if (comprado) {
    return (
      <div className="checkout-container checkout-gracias">
        <h2>¡Gracias por tu compra, {nombreComprador}!</h2>
        <p>Te vamos a contactar pronto para coordinar la entrega.</p>
        <Link to="/" className="checkout-volver">Volver al catálogo</Link>
      </div>
    );
  }

  // Carrito vacío y todavía no se compró nada: no tiene sentido mostrar el form
  if (cart.length === 0) {
    return (
      <div className="checkout-container checkout-vacio">
        <h2>No tenés productos para finalizar la compra</h2>
        <p>Agregá productos al carrito antes de continuar.</p>
        <Link to="/" className="checkout-volver">Ir al catálogo</Link>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2>Finalizar compra</h2>

      <div className="checkout-resumen">
        <p>Productos: {totalItems}</p>
        <p>Total a pagar: {formatPrice(totalPrice)}</p>
      </div>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          value={form.nombre}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="telefono">Teléfono</label>
        <input
          id="telefono"
          name="telefono"
          type="tel"
          value={form.telefono}
          onChange={handleChange}
          required
        />

        <button type="submit" className="checkout-confirmar">
          Confirmar compra
        </button>
      </form>
    </div>
  );
};

export default Checkout;
