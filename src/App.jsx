import Navbar from "./components/Navbar/Navbar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";

function App() {
  return (
    <>
      <Navbar />
      <ItemListContainer greeting="¡Bienvenidos a Orisur! Encontrá la mejor tecnología portátil importada." />
    </>
  );
}

export default App;

