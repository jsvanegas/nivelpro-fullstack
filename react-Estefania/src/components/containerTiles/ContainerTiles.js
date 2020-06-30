import React from 'react';
import Tile from '../tile/Tile';

var counter = 0;
var arrayTiles = [];

function ContainerTiles(props){

    const [arrayTiles, setArrayTiles] = useState('[]');

    const setLangFilter = (event) => {
        setArrayTiles(event.currentTarget.value);
      };

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
        counter++;
        arrayTiles.push({generalCounter:counter, counterClicks:0 });
    }
}



export default ContainerTiles;