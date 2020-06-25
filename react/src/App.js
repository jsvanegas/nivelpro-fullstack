import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import BooksApps from './components/books-app/BooksApp';

function Wrapper() {

  const [tiles, setTiles] = useState([{ title: 1, clicked: 0 }]);

  const addTilesToArray = (num) => {
    const newTiles = [...tiles];
    for (let i = 0; i < num; i++) {
      newTiles.push({ title: newTiles.length + 1, clicked: 0 });
    }
    setTiles(newTiles);
  }

  return (
    <div>
      <Buttons onAdd={addTilesToArray} />
      <div>Total Clicks: </div>
      {
        tiles.map(tile => {
          return (<Tile title={tile.title} />)
        })
      }
    </div>

  );
}


function Tile(props) {
  return (
    <div>
      <p>Tile #{props.title}</p>
    </div>
  );
}

function Buttons(props) {

  const addTiles = () => {
    props.onAdd(5);
  }

  return (
    <div>
      <input type="text" />
      <button onClick={addTiles}>Add</button>
    </div>
  );
}





function App() {
  return (
    <div>
      <Wrapper />
    </div>
  );
}

export default App;


/*

 - 1er Componente: Input + buttons
 - 2do Componente: Tile (div > titulo + contador) + evento click + Eliminar
 - 3er Componente: Contenedor de Tiles




*/



// const Persona = (props) => {

//   const [edad, setEdad] = useState(31);

//   const aumentar = () => {
//     setEdad(edad+1);
//   }

//   return (
//     <div>
//       <h1>Hola soy {props.nombre}</h1>
//       <p>Edad: <span onClick={aumentar}>{edad}</span></p>
//     </div>
//   );
// }
