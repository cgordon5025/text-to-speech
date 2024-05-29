import logo from './logo.svg';
import './App.css';
import { CssBaseline } from '@mui/material';
import RenderRoutes from './Pages/routes';
function App() {
  return (
    <CssBaseline>
      <div className='App'>
        <RenderRoutes />
      </div>
    </CssBaseline>
  );
}

export default App;
