import React from 'react';

import Sidebar from './components/sidebar/Sidebar'
import MainContainer from './components/main-container/MainContainer';

function App() {
  return (
    <div className="App">
      <Sidebar>
          <MainContainer />
      </Sidebar>
      
    </div>
  );
}

export default App;
