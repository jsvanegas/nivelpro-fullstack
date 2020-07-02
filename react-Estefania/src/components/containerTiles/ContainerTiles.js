import React, { useState } from 'react';
import Tile from '../tile/Tile';

var counter = 0;

const [arrayTiles, setArrayTiles] = useState([]);

    const setArrayTilesCreate = (tile) => {
        setArrayTiles(arrayTiles => [...arrayTiles, tile]);
      };

function ContainerTiles(props){

    generatorTiles(props.numTiles);

    return(
        <div className='d-flex flex-row flex-wrap'>     
            {
                arrayTiles.map(tile => <Tile generalCounter = {tile.generalCounter} /> )
            }
        </div>
    );
}

function generatorTiles(numTiles){
    
    for (let i = 0; i < numTiles; i++) {
        counter++; //{generalCounter:counter, counterClicks:0 }
        setArrayTilesCreate(counter);
    }
}



export default ContainerTiles;