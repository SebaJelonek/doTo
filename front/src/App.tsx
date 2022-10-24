import { Provider } from 'jotai';
import InputField from './components/InputField/InputField';
import Container from './components/TaskContainer/TaskContainer';
import './App.css';

function App() {
  return (
    <Provider>
      <div className='App'>
        <InputField name='Task name' type='text' />
        <Container />
      </div>
    </Provider>
  );
}

export default App;
