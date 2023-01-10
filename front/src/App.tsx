import { Provider } from 'jotai';
import Navigation from './Router/Navigation/Navigation';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  return (
    <div className='App'>
      <Provider>
        <div>
          <Navigation />
        </div>
      </Provider>
    </div>
  );
}

export default App;
