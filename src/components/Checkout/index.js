import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import './index.css'; 
import Header from '../Header';

const Checkout = () => {
  const { cartList } = useContext(CartContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    paymentMethod: 'credit-card'
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
 
    console.log('Form data submitted:', formData);
    setIsSuccess(true); 
    setTimeout(() => {
      navigate('/confirmation'); 
    }, 2000);
  };

  const calculateTotal = () => {
    return cartList.reduce((total, item) => total + item.total, 0);
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        <h1 className="mb-4">Checkout</h1>
        {isSuccess && (
          <div className="alert alert-success" role="alert">
            Order placed successfully!
          </div>
        )}
        <div className="row">
          <div className="col-md-8">
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="address">Shipping Address</label>
                <textarea
                  id="address"
                  name="address"
                  className="form-control"
                  rows="4"
                  value={formData.address}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="paymentMethod">Payment Method</label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  className="form-control"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                >
                  <option value="credit-card">Credit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="bank-transfer">Bank Transfer</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">Place Order</button>
            </form>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-header bg-primary text-white">
                Order Summary
              </div>
              <ul className="list-group list-group-flush">
                {cartList.map(item => (
                  <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <span>{item.title} x {item.quantity}</span>
                    <span>${item.total.toFixed(2)}</span>
                  </li>
                ))}
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <strong>Grand Total</strong>
                  <strong>${calculateTotal().toFixed(2)}</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;

