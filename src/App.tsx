import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './scenes/dashboard';

// Import your components here
import Data from './scenes/data';
import FTSideBar from './scenes/global/FTSideBar';
import Topbar from './scenes/global/Topbar';



function App() {
  return (
    <div className="app">
      <Topbar />
      <div className="main">
        <FTSideBar />
        <div className="body">
          <Router>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/data" element={<Data/>}/>
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;