import React from 'react';

import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import LoginDisplay from './components/displays/LoginDisplay';
import RegisterDisplay from './components/displays/RegisterDisplay';
import Navbar from './components/displays/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="login" element={<LoginDisplay />} />
          <Route path="register" element={<RegisterDisplay />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
