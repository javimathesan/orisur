import "./ItemListContainer.css";

// Componente contenedor: por ahora solo muestra un saludo recibido por props
function ItemListContainer({ greeting }) {
  return (
    <div className="item-list-container">
      <h2>{greeting}</h2>
    </div>
  );
}

export default ItemListContainer;
