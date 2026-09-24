import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Envuelve rutas que requieren usuario autenticado.
// Si todavía se está resolviendo la sesión inicial, no renderiza nada
// (evita un "flash" hacia /login antes de que Firebase confirme el estado).
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
