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
            <Route
              path="/"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>Replace this with the landing page element!</p>
                </main>
              }
            />
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>Replace this with 404 or invalid URL element!</p>
                </main>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
