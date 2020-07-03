import React from 'react';
// import ContainerBooks from './components/containerBooks/ContainerBooks';
import ContainerTiles from './components/containerTiles/ContainerTiles';

function App() {


  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-light bg-light mb-4'>
              <h1>Tile Generator</h1>
      </nav>

      <ContainerTiles />

    </div>
  );
}

export default App;
