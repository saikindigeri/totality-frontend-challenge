
import React, { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cartList')) || [];
    setCartList(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem('cartList', JSON.stringify(cartList));
  }, [cartList]);

  const addToCart = (property) => {
    setCartList((prevCart) => {
      const existingProperty = prevCart.find((item) => item.id === property.id);

      const bookedDate = new Date().toISOString().split('T')[0];

  
      
      if (existingProperty) {
        return prevCart.map((item) =>
          item.id === property.id
            ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
            : item
        );
      }
      return [...prevCart, { ...property, quantity: 1, total: property.price,bookedDate }];
    });
  };

  const incrementQuantity = (id) => {
    setCartList((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
          : item
      )
    );
  };

  const decrementQuantity = (id) => {
    setCartList((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : 1,
              total: item.price * (item.quantity > 1 ? item.quantity - 1 : 1),
            }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartList([]);
  };

  const removeFromCart = (id) => {
    setCartList((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cartList,
        addToCart,
        incrementQuantity,
        decrementQuantity,
        removeFromCart,clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
