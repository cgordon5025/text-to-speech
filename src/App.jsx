import logo from './logo.svg';
import './App.css';

import { TtsProvider } from './Context/TtsContext';
import RenderRoutes from './Pages/routes';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TtsProvider>
          <div className='App'>
            <RenderRoutes />
          </div>
          {/* <img src={logo} className="App-logo" alt="logo" />

          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a> */}
        </TtsProvider>
      </header>
    </div>
  );
}

export default App;
