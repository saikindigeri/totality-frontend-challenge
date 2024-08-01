


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';


import Home from './components/Home';
import PropertyDetails from './components/PropertyDetails';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Property from './components/Property';
import Login from './components/Login';
import Register from './components/Register';
import Confirmation from './components/Confirmation';
import ProtectedRoute from './components/ProtectedRoute';


const App = () => {
  return (
    <CartProvider>
      <Router>
      
        <Routes>
     
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/"  element={<ProtectedRoute element={<Home />} />} />
          <Route path="/property/:id"  element={<ProtectedRoute element={<PropertyDetails />} />} />
          <Route path="/cart"  element={<ProtectedRoute element={<Cart />} />} />
          <Route path="/checkout"  element={<ProtectedRoute element={<Checkout />} />} />
          <Route path="/properties"  element={<ProtectedRoute element={<Property />} />} />
          <Route path="/confirmation"  element={<ProtectedRoute element={<Confirmation />} />} />

        </Routes>
        
      </Router>
    </CartProvider>
  );
};

export default App;


