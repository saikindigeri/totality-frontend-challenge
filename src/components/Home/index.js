import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Header from '../Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'; 

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/properties');
  };

  const name = localStorage.getItem('username');
const token=localStorage.getItem('token') 
console.log(token)
  return (
    <>
      <Header />
      <Container className="mt-5">
       
        <div className="landing-page">
          
          <header className="text-center mb-5">
          <h1 className='name-style'>Hello {name}</h1>
            <h3>Welcome to PropertyPro</h3>
            <p>Your ultimate solution for managing and booking properties seamlessly.</p>
            <Button href="/register" variant="primary" className="cta-button">
              Get Started
            </Button>
          </header>

          <section className="features text-center mb-5">
            <Row>
              <Col md={4} className="mb-4">
                <div className="feature-card">
                  <img src="https://res.cloudinary.com/dyjmh036b/image/upload/v1722512068/easy_tyunba.avif" alt="Feature 1" className="img-fluid mb-3" />
                  <h2>Easy Property Search</h2>
                  <p>Find your dream property quickly with our intuitive search filters and detailed property listings.</p>
                </div>
              </Col>

              <Col md={4} className="mb-4">
                <div className="feature-card">
                  <img src="https://res.cloudinary.com/dyjmh036b/image/upload/v1722512049/seam_lvrrt7.png" alt="Feature 2" className="img-fluid mb-3" />
                  <h2>Seamless Booking</h2>
                  <p>Book your chosen property with just a few clicks and enjoy a smooth booking experience.</p>
                </div>
              </Col>

              <Col md={4} className="mb-4">
                <div className="feature-card">
                  <img src="https://res.cloudinary.com/dyjmh036b/image/upload/v1722512295/mmm_y1jzzo.jpg" alt="Feature 3" className="img-fluid mb-3" />
                  <h2>Manage Your Properties</h2>
                  <p>Effortlessly manage your properties, view details, and make changes with our user-friendly interface.</p>
                </div>
              </Col>
            </Row>
          </section>

          <section className="call-to-action text-center mb-5">
            <h2>Ready to find your perfect property?</h2>
            <Button variant="primary" onClick={handleClick}>
              Book Properties
            </Button>
          </section>
        </div>
      </Container>
      <footer className="text-center py-4 bg-secondary">
        <p>&copy; {new Date().getFullYear()} PropertyPro. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Home;
