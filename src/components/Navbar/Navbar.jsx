import CartWidget from "../CartWidget/CartWidget";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <h2 className="navbar-logo">orisur</h2>

      <nav className="navbar-categories">
        <a href="#">Auriculares</a>
        <a href="#">Smartwatches</a>
        <a href="#">Cargadores</a>
        <a href="#">Accesorios</a>
      </nav>

      <CartWidget />
    </header>
  );
}

export default Navbar;
