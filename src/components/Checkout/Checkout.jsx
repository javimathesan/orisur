import { useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { formatPrice } from '../../services/formatPrice';
import './Checkout.css';

const initialForm = {
  nombre: '',
  apellido: '',
  telefono: '',
  direccion: '',
  ciudad: '',
};

const Checkout = () => {
  const { cart, clear, totalItems, totalPrice } = useCart();
  const { user } = useAuth();

  const [form, setForm] = useState(initialForm);
  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [errorOrden, setErrorOrden] = useState('');
  const [ordenId, setOrdenId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errores[name]) {
      setErrores((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validarForm = () => {
    const nuevosErrores = {};

    Object.entries(form).forEach(([campo, valor]) => {
      if (!valor.trim()) {
        nuevosErrores[campo] = 'Este campo es obligatorio';
      }
    });

    setErrores(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorOrden('');

    if (!user) {
      setErrorOrden('Debés iniciar sesión para finalizar la compra.');
      return;
    }

    if (cart.length === 0) {
      setErrorOrden('Tu carrito está vacío.');
      return;
    }

    if (!validarForm()) {
      return;
    }

    setEnviando(true);

    try {
      const orderData = {
        uid: user.uid,
        email: user.email,
        deliveryData: { ...form },

        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),

        total: totalPrice,
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(
        collection(db, 'orders'),
        orderData
      );

      clear();
      setOrdenId(docRef.id);
    } catch {
      setErrorOrden(
        'No pudimos generar tu orden. Intentá nuevamente en unos minutos.'
      );
    } finally {
      setEnviando(false);
    }
  };

  if (ordenId) {
    return (
      <div className="checkout-container checkout-gracias">
        <h2>¡Gracias por tu compra, {form.nombre}!</h2>

        <p>
          Tu número de orden es: <strong>{ordenId}</strong>
        </p>

        <p>
          Te vamos a contactar pronto para coordinar la entrega.
        </p>

        <Link to="/" className="checkout-volver">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="checkout-container checkout-vacio">
        <h2>No tenés productos para finalizar la compra</h2>

        <p>
          Agregá productos al carrito antes de continuar.
        </p>

        <Link to="/" className="checkout-volver">
          Ir al catálogo
        </Link>
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

      {errorOrden && (
        <p className="checkout-error" role="alert">
          {errorOrden}
        </p>
      )}

      <form
        className="checkout-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <label htmlFor="nombre">
          Nombre
        </label>

        <input
          id="nombre"
          name="nombre"
          type="text"
          autoComplete="given-name"
          value={form.nombre}
          onChange={handleChange}
        />

        {errores.nombre && (
          <span className="checkout-campo-error">
            {errores.nombre}
          </span>
        )}

        <label htmlFor="apellido">
          Apellido
        </label>

        <input
          id="apellido"
          name="apellido"
          type="text"
          autoComplete="family-name"
          value={form.apellido}
          onChange={handleChange}
        />

        {errores.apellido && (
          <span className="checkout-campo-error">
            {errores.apellido}
          </span>
        )}

        <label htmlFor="telefono">
          Teléfono
        </label>

        <input
          id="telefono"
          name="telefono"
          type="tel"
          autoComplete="tel"
          value={form.telefono}
          onChange={handleChange}
        />

        {errores.telefono && (
          <span className="checkout-campo-error">
            {errores.telefono}
          </span>
        )}

        <label htmlFor="direccion">
          Dirección
        </label>

        <input
          id="direccion"
          name="direccion"
          type="text"
          autoComplete="street-address"
          value={form.direccion}
          onChange={handleChange}
        />

        {errores.direccion && (
          <span className="checkout-campo-error">
            {errores.direccion}
          </span>
        )}

        <label htmlFor="ciudad">
          Ciudad
        </label>

        <input
          id="ciudad"
          name="ciudad"
          type="text"
          autoComplete="address-level2"
          value={form.ciudad}
          onChange={handleChange}
        />

        {errores.ciudad && (
          <span className="checkout-campo-error">
            {errores.ciudad}
          </span>
        )}

        <button
          type="submit"
          className="checkout-confirmar"
          disabled={enviando}
        >
          {enviando ? 'Procesando...' : 'Confirmar compra'}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
