import React from 'react';

import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import LoginDisplay from './components/displays/LoginDisplay';
import RegisterDisplay from './components/displays/RegisterDisplay';
import UserDisplay from './components/displays/UserDisplay';
import UserListDisplay from './components/displays/UserListDisplay';
import CreateImagesDisplay from './components/displays/CreateImagesDisplay';
import OrderItemDisplay from './components/displays/OrderItemDisplay';
import CheckoutDisplay from './components/displays/CheckoutDisplay';
import Navbar from './components/displays/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Navbar />}
            
          >
            <Route path="login" element={<LoginDisplay />} />
            <Route path="register" element={<RegisterDisplay />} />
            <Route path="userlist" element={<UserListDisplay />} />
            <Route path="create" element={<CreateImagesDisplay />} />
            <Route path="orderitem" element={<OrderItemDisplay />} />
            <Route path="checkout" element={<CheckoutDisplay />} />
            <Route
              path="/"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>Replace this with the landing page component!</p>
                </main>
              }
            />
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>Replace this with 404 or invalid URL component!</p>
                </main>
              }
            />
            <Route path='/profile/:userName' element={<UserDisplay />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
