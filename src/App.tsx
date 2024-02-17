import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './scenes/dashboard';

// Import your components here
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
              <Route path="/page1">
                Page 1 Content
              </Route>
              <Route path="/page2">
                Page 2 Content
              </Route>
              {/* Add more routes as needed */}
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;