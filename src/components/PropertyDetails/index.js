/*

import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import CartContext from '../../context/CartContext';
import './index.css';
import Header from '../Header';

const propertyData = {
  1: { title: 'Luxury Villa', description: 'A beautiful villa with ocean view.', location: 'Los Angeles', price: 1500000, image: 'https://via.placeholder.com/300' },
  2: { title: 'Modern Apartment', description: 'A spacious apartment in the city center.', location: 'New York', price: 750000, image: 'https://via.placeholder.com/300' },

};

const PropertyDetails = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const property = propertyData[id];

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const handleBookNow = () => {
    const propertyWithQuantity = { ...property, quantity };
    addToCart(propertyWithQuantity);
  };

  return (

    <>
        <Header/>
    <div className="property-details">
      <img className='size' src={property.image} alt={property.title} />
      <h1>{property.title}</h1>
      <p>{property.description}</p>
      <p>${property.price}</p>
      <button onClick={handleDecrease}>-</button>
      <span>{quantity}</span>
      <button onClick={handleIncrease}>+</button>
      <button onClick={handleBookNow}>Book Now</button>
    </div>
    </>

  );
};

export default PropertyDetails;



*/

import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import './index.css';
import Header from '../Header';


const properties = [
  {
      id: 41,
      title: 'Elegant Townhouse',
      location: 'San Francisco',
      price: 200000,
      description: 'This elegant townhouse offers modern living in the heart of San Francisco. Featuring expansive views of the city skyline, this property boasts contemporary design elements, a spacious open-plan living area, and high-end finishes. The townhouse includes three well-appointed bedrooms, a private terrace, and access to exclusive community amenities such as a gym and swimming pool.',
      image: 'https://res.cloudinary.com/dyjmh036b/image/upload/v1722507697/p3_dwbful.jpg',
      bedrooms: 3,
      amenities: ['Elevator', 'Pool', 'Gym']
  },
  {
      id: 42,
      title: 'Spacious Villa',
      location: 'Miami',
      price: 350000,
      description: 'This luxurious villa in Miami offers a spacious layout with a large garden and a private swimming pool. Perfect for families or those who love entertaining guests, the villa features five bedrooms, a modern kitchen with state-of-the-art appliances, and a comfortable living area that opens up to a beautiful outdoor space. Enjoy the serenity of the garden and the convenience of being close to Miami’s vibrant city life.',
      image: 'https://res.cloudinary.com/dyjmh036b/image/upload/v1722507529/p1_cpmcvr.avif',
      bedrooms: 5,
      amenities: ['Garden', 'Pool', 'Gym', 'Fireplace']
  },
  {
      id: 43,
      title: 'Modern Studio',
      location: 'Seattle',
      price: 95000,
      description: 'This modern studio apartment in Seattle is perfect for singles or couples looking for a compact, yet stylish living space. The studio features sleek design elements, an open-concept layout, and modern amenities. With easy access to Seattle’s cultural and entertainment hubs, this property offers both convenience and comfort. The studio includes a well-designed kitchenette, a cozy living area, and an updated bathroom.',
      image: 'https://res.cloudinary.com/dyjmh036b/image/upload/v1722507540/p2_qvggsg.avif',
      bedrooms: 1,
      amenities: ['Gym', 'Security System']
  },
  {
      id: 44,
      title: 'Charming Farmhouse',
      location: 'Austin',
      price: 120000,
      description: 'Experience rustic charm and modern convenience with this delightful farmhouse in Austin. The property features four bedrooms, a spacious living area with a fireplace, and a large kitchen perfect for family gatherings. The farmhouse includes a workshop and a garden area, offering plenty of space for hobbies and outdoor activities. Located in a peaceful neighborhood, it provides a serene retreat while remaining close to city amenities.',
      image: 'https://res.cloudinary.com/dyjmh036b/image/upload/v1722507751/p8_y7jyal.jpg',
      bedrooms: 4,
      amenities: ['Garden', 'Fireplace', 'Workshop']
  },
  {
      id: 45,
      title: 'Luxury Penthouse',
      location: 'Las Vegas',
      price: 500000,
      description: 'This opulent penthouse in Las Vegas offers breathtaking city views and high-end finishes. With two bedrooms and a spacious open-plan living area, the penthouse features luxurious amenities including a rooftop deck, a private pool, and a state-of-the-art gym. The interior boasts top-notch materials and contemporary design, making it ideal for those who appreciate elegance and comfort. Enjoy the vibrant nightlife of Las Vegas from the comfort of your own luxurious home.',
      image: 'https://res.cloudinary.com/dyjmh036b/image/upload/v1722507529/p1_cpmcvr.avif',
      bedrooms: 2,
      amenities: ['Pool', 'Rooftop Deck', 'Gym', 'Security System']
  },
  {
      id: 46,
      title: 'Cozy Loft',
      location: 'Boston',
      price: 85000,
      description: 'This charming loft in Boston offers a cozy and vibrant living space with easy access to local amenities. The loft features one bedroom, an open-plan living area with high ceilings, and modern finishes. Perfect for urban dwellers, it is located in a dynamic neighborhood with plenty of restaurants, shops, and cultural attractions. The property includes a security system for peace of mind and a gym for maintaining an active lifestyle.',
      image: 'https://res.cloudinary.com/dyjmh036b/image/upload/v1722507721/p6_imz0yr.jpg',
      bedrooms: 1,
      amenities: ['Gym', 'Security System']
  },
  {
      id: 47,
      title: 'Contemporary Bungalow',
      location: 'Portland',
      price: 150000,
      description: 'This contemporary bungalow in Portland offers a modern living experience with an open floor plan and stylish design. The property includes two bedrooms, a spacious living area with large windows, and a garden. Ideal for those who appreciate modern aesthetics and outdoor living, the bungalow features clean lines, high-quality finishes, and easy access to Portland’s eclectic neighborhoods and cultural hotspots.',
      image: 'https://res.cloudinary.com/dyjmh036b/image/upload/v1722507751/p8_y7jyal.jpg',
      bedrooms: 2,
      amenities: ['Garden', 'Fireplace']
  },
  {
      id: 48,
      title: 'Sunny Cottage',
      location: 'San Diego',
      price: 95000,
      description: 'This sunny cottage in San Diego offers a charming living space with a relaxing backyard. The property features two bedrooms, a cozy living area, and a well-maintained garden with a pool. Perfect for those who enjoy a blend of comfort and outdoor living, the cottage is situated in a friendly neighborhood close to the beach and local amenities. Enjoy the sunny climate of San Diego from the comfort of your own home.',
      image: 'https://res.cloudinary.com/dyjmh036b/image/upload/v1722507704/p4_eevqsz.jpg',
      bedrooms: 2,
      amenities: ['Garden', 'Fireplace', 'Pool']
  },
  {
      id: 49,
      title: 'Stylish Apartment',
      location: 'Philadelphia',
      price: 110000,
      description: 'This stylish apartment in Philadelphia offers sleek design and modern amenities. Featuring one bedroom and an open-concept living area, the apartment includes high-quality finishes and contemporary décor. Located in a vibrant neighborhood, it provides easy access to Philadelphia’s cultural attractions, dining options, and public transport. The apartment includes a security system and a gym for added convenience and safety.',
      image: 'https://res.cloudinary.com/dyjmh036b/image/upload/v1722507697/p3_dwbful.jpg',
      bedrooms: 1,
      amenities: ['Gym', 'Security System']
  },
  {
      id: 50,
      title: 'Elegant Mansion',
      location: 'New York',
      price: 600000,
      description: 'This elegant mansion in New York offers luxurious living with ample space and high-end features. The property includes six bedrooms, multiple living areas, a private pool, a gym, and a rooftop deck. Ideal for those who seek opulence and comfort, the mansion boasts exquisite design, top-tier materials, and panoramic city views. Enjoy the best of both worlds with a serene retreat in the heart of one of the world’s most vibrant cities.',
      image: 'https://res.cloudinary.com/dyjmh036b/image/upload/v1722507529/p1_cpmcvr.avif',
      bedrooms: 6,
      amenities: ['Pool', 'Gym', 'Rooftop Deck', 'Garden']
  }
];



const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const foundProperty = properties.find((prop) => prop.id === parseInt(id));
    if (foundProperty) {
      setProperty(foundProperty);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  const handleBookNow = () => {
    if (property) {
      addToCart(property);
      navigate('/cart');
    }
  };

  if (!property) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <img src={property.image} alt={property.title} className="property-image img-fluid" />
          </div>
          <div className="col-md-6">
            <div className="property-details-card card p-4 shadow-sm">
              <h2 className="card-title mb-3">{property.title}</h2>
              <p className="card-text mb-2"><strong>Amenities:</strong>  {property.amenities.join(', ')}</p>
              <p className="card-text mb-2"><strong>Bedrooms:</strong>  {property.bedrooms}</p>
              <p className="card-text mb-2"><strong>Location:</strong> {property.location}</p>
              <p className="card-text mb-2"><strong>Description:</strong> {property.description}</p>
              <p className="card-text mb-2"><strong>Price:</strong> $ {property.price}</p>
              <button className="btn btn-warning" onClick={handleBookNow}>Book Now</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyDetails;