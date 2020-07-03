import React, { useState } from 'react';

function Buttons(props) {


    const [numTiles, setNumTiles] = useState(0);

    const handleNumTiles = (event) => {
        setNumTiles(event.target.value);
    }


    const addTiles = () => {
        props.onAdd(numTiles);
    }
  
    return (
      <div className='form-inline'>
        <input type="text" className='form-control mr-1' onChange={handleNumTiles} />
        <button onClick={addTiles} className='btn btn-success' >Add</button>
        <button onClick={addTiles} className='btn btn-danger ml-1' >Reset</button>
      </div>
    );
  }

  export default Buttons;
