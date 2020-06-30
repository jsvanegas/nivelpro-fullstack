import React from 'react';

function deleteTile(event){
    console.log("DeleteTile");
}


function Tile(props){

    return (
        <div className='tile alert alert-primary m-1'>
            <div className='tile-div-name'>
                <span>
                    Tile #
                </span>
                <span className='tile-number'>
                    {props.generalCounter}
                </span>
            </div>
            <div className='tile-div'>
                <span className='counter'>
                    # Clicks: 
                </span>
                <span className='counter'>
                    0
                </span>
                <button className='tile-trash' onClick= {deleteTile()} >

                </button>
            </div>
        </div>
    );
}

export default Tile;