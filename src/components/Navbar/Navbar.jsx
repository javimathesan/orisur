import { Link, NavLink } from "react-router-dom";
import CartWidget from "../CartWidget/CartWidget";
import "./Navbar.css";

function Navbar() {
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

      <CartWidget />
    </header>
  );
}

export default Navbar;
