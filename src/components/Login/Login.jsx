import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { mapFirebaseError } from "../../services/mapFirebaseError";
import "./Login.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validación local mínima antes de consultar a Firebase
    if (!email.trim() || !password.trim()) {
      setError("Completá email y contraseña.");
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(mapFirebaseError(err.code));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login">
      <h1>Iniciar sesión</h1>

      {error && <p className="login-error">{error}</p>}

      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
          required
        />

        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isSubmitting}
          required
        />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Ingresando..." : "Ingresar"}
        </button>
      </form>

      <p className="login-register-link">
        ¿No tenés cuenta? <Link to="/register">Registrate</Link>
      </p>
    </div>
  );
};

export default Login;
