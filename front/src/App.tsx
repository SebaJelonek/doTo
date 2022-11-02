import { Provider } from 'jotai';

import Sheet from './components/Sheet/Sheet';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Provider>
        <Sheet />
      </Provider>
    </div>
  );
}

export default App;
