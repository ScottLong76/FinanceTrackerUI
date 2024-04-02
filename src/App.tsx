import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './scenes/dashboard';
import UploadForm from './scenes/upload';
import theme from './theme';

// Import your components here
import { ThemeProvider } from '@material-ui/core';
import Data from './scenes/data';
import Topbar from './scenes/global/Topbar';



function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <Topbar />
        <div className="main">
          <div className="body">
            <Router>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/manageData" element={<Data/>}/>
                <Route path="/uploadData" element={<UploadForm/>}/>
              </Routes>
            </Router>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;