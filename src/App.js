import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
      <Routes>
         <Route path='/' element={<Login/>} />
         <Route path='/dashboard' element={<Dashboard/>} />
      </Routes>
  );
}

export default App;
