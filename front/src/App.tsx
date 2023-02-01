import { Provider } from 'jotai';
import Navbar from './components/Navigation/Navbar/Navbar';
import Container from './components/Container/Container';

import './App.css';

function App() {
  return (
    <div className='App'>
      <Provider>
        <Container />
        <Navbar />
      </Provider>
    </div>
  );
}

export default App;
