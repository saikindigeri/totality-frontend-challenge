


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


const App = () => {
  return (
    <CartProvider>
      <Router>
      
        <Routes>
     
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/" element={<Home />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/properties" element={<Property/>} />
          <Route path="/confirmation" element={<Confirmation/>} />

        </Routes>
        
      </Router>
    </CartProvider>
  );
};

export default App;


