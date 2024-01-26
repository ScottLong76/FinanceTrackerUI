import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';

// Import your components here
import Sidebar from './scenes/global/Sidebar';
import Topbar from './scenes/global/Topbar';



function App() {
  return (
      <Router>
        <Topbar />
        <Sidebar />
        <Routes>
          <Route path="/about">
          </Route>
          <Route path="/">
          </Route>
        </Routes>
      </Router>
  );
}

export default App;