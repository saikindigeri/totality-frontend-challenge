import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'; 
import './index.css'; 

const Header = () => {
  const { cartList } = useContext(CartContext);
  const navigate = useNavigate();

  const onClickLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const renderCartItemsCount = () => {
    const uniquePropertiesCount = cartList.length;

    return uniquePropertiesCount > 0 ? (
      <span className="badge bg-primary rounded-pill ms-2">{uniquePropertiesCount}</span>
    ) : null;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img
            src="https://res.cloudinary.com/dyjmh036b/image/upload/v1722506431/prosave_zo4vrr.jpg"
            alt="website logo"
            className="d-inline-block align-text-top"
            style={{ height: '40px' }} 
          />
        </Link> 
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/properties" className="nav-link">Properties</Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link">
                Cart {renderCartItemsCount()}
              </Link>
            </li>
            <li className="nav-item mb-3">
              <button onClick={onClickLogout} className="btn btn-outline-danger ms-3">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
