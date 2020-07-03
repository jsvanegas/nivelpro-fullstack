import React, { useState } from 'react';
import Tile from '../tile/Tile';
import Buttons from '../buttons/Buttons';

function ContainerTiles(props){

    const [tiles, setTiles] = useState([]);

  const addTilesToArray = (num) => {
    const newTiles = [...tiles];
    for (let i = 0; i < num; i++) {
      newTiles.push({ title: newTiles.length + 1, clicked: 0 });
    }
    setTiles(newTiles);
  };

  const addClick = (index) => {
    const newTiles = [...tiles];
    newTiles[index];
  };

  return (
    <div className='container'>
      <Buttons onAdd={addTilesToArray} />
      <div>Total Clicks: </div>
      <div className='d-flex flex-row flex-wrap'>
      {
        tiles.map(tile => {
          return (<Tile title={tile.title} />)
        })
      }
      </div>
    </div>

  );
}


export default ContainerTiles;