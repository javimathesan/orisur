// src/App.jsx
import Navbar from "./components/Navbar/Navbar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Navbar />
      <ItemListContainer greeting="¡Bienvenido a orisur! Encontrá la mejor tecnología portátil importada." />
      <Footer />
    </>
  );
}

export default App;
