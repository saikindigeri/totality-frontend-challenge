
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import './index.css'; 
import Header from '../Header';

const Cart = () => {
  const navigate = useNavigate();
  const { cartList, incrementQuantity, decrementQuantity, removeFromCart,clearCart } = useContext(CartContext);

  const calculateTotal = () => {
    return cartList.reduce((total, item) => total + item.total, 0);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <>

<Header/>
    <div className="container mt-5 mb-20">
      <h1 className="cart-heading mb-4">My Cart</h1>
      {cartList.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartList.map((item) => (
            <div key={item.id} className="cart-item card mb-3 shadow-sm">
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img src={item.image} alt={item.title} className="cart-item-image img-fluid" />
                </div>
                <div className="col-md-8 d-flex flex-column justify-content-between p-3">
                  <h2 className="card-title">{item.title}</h2>
                  <p className="card-text"><strong>Price:</strong> ${item.price}</p>
                  <p>Booked Date: {item.bookedDate}</p>
                  <div className="cart-item-quantity mb-2">
                    <button className="btn btn-outline-info btn-sm" onClick={() => decrementQuantity(item.id)}>-</button>
                    <span className="mx-2">{item.quantity}</span>
                    <button className="btn btn-outline-info btn-sm" onClick={() => incrementQuantity(item.id)}>+</button>
                  </div>
                  <p className="card-text"><strong>Total:</strong> ${item.total}</p>
                  <button className="btn btn-danger w-50" onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        <div className="cart-summary mt-4">
          
         <h2>Grand Total: $ {calculateTotal()}</h2>
           
            <button onClick={handleCheckout} className="btn btn-primary  checkout-btn">Checkout</button>
            <button onClick={clearCart} className="btn btn-secondary checkout-btn" >Clear All</button> {/* Clear All Button */}
            </div>
         
         
         
        </div>
      )}
    </div>
    </>
   
  );
};

export default Cart;
