import { Provider } from 'jotai';

import Sheet from './components/TaskList/Sheet/Sheet';
import Navbar from './components/Navigation/Navbar/Navbar';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Provider>
        <Sheet />
        <Navbar />
      </Provider>
    </div>
  );
}

export default App;
