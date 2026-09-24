import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CartWidget from "../CartWidget/CartWidget";
import "./Navbar.css";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/"); // volvemos al inicio tras cerrar sesión
  };

  return (
    <header className="navbar">
      <Link to="/" className="navbar-logo">
        <span className="logo-badge">OS</span>
        <span className="logo-text">orisur</span>
      </Link>

      <nav className="navbar-categories">
        <NavLink to="/category/Auriculares">Auriculares</NavLink>
        <NavLink to="/category/Smartwatches">Smartwatches</NavLink>
        <NavLink to="/category/Cargadores">Cargadores</NavLink>
        <NavLink to="/category/Accesorios">Accesorios</NavLink>
      </nav>

      <div className="navbar-auth">
        {user ? (
          <>
            <span className="navbar-user-email">{user.email}</span>
            <button onClick={handleLogout} className="navbar-logout-btn">
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">Iniciar sesión</NavLink>
            <NavLink to="/register">Registrarse</NavLink>
          </>
        )}
      </div>

      <CartWidget />
    </header>
  );
}

export default Navbar;
