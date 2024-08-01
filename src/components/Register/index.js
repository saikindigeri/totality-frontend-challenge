


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'; // Custom CSS for additional styles

const Register = () => {
    const [formData, setFormData] = useState({
        user_firstName: '',
        user_lastName: '',
        user_phone: '',
        user_email: '',
        user_password: '',
        user_zipcode: '',
        user_city: '',
        user_agreement: false,
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
        setErrors({
            ...errors,
            [name]: '',
        });
    };

    const validateForm = () => {
        let valid = true;
        let newErrors = {};

        if (!formData.user_firstName) {
            valid = false;
            newErrors.user_firstName = 'First name is required';
        }
        if (!formData.user_lastName) {
            valid = false;
            newErrors.user_lastName = 'Last name is required';
        }
        if (!formData.user_phone) {
            valid = false;
            newErrors.user_phone = 'Phone number is required';
        }
        if (!formData.user_email) {
            valid = false;
            newErrors.user_email = 'Email is required';
        }
        if (!formData.user_password) {
            valid = false;
            newErrors.user_password = 'Password is required';
        }
        if (!formData.user_zipcode) {
            valid = false;
            newErrors.user_zipcode = 'Zipcode is required';
        }
        if (!formData.user_city) {
            valid = false;
            newErrors.user_city = 'City is required';
        }
        if (!formData.user_agreement) {
            valid = false;
            newErrors.user_agreement = 'You must agree to the terms';
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const response = await axios.post('https://syoft.dev/Api/user_registeration/api/user_registeration', {
                user_firstname: formData.user_firstName,
                user_lastname: formData.user_lastName,
                user_phone: formData.user_phone,
                user_password: formData.user_password,
                user_email: formData.user_email,
                user_city: formData.user_city,
                user_zipcode: formData.user_zipcode,
            });

            if (response.data.status) {
                setSuccessMessage('Registration successful! Redirecting to login...');
                setTimeout(() => navigate('/login'), 1000);
            } else {
                setErrorMessage(response.data.msg);
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
            console.error(error);
        }
    };

    const handleSignIn = () => {
        navigate("/login");
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Row className="w-100">
                <Col lg={7} md={8} sm={10} className="mx-auto">
                    <div className="text-center mb-4 sign">
                        <h1 className="display-4">Sign Up</h1>
                        <p>Already have an account? <span onClick={handleSignIn} className="text-primary cursor-pointer">Sign in</span></p>
                    </div>
                    <Form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
                        {errors.global && <Alert variant="danger">{errors.global}</Alert>}
                        {successMessage && <Alert variant="success">{successMessage}</Alert>}
                        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                        <Form.Group controlId="formBasicFirstName" className="mb-3">
                            <Form.Label>First Name*</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your first name"
                                name="user_firstName"
                                value={formData.user_firstName}
                                onChange={handleChange}
                                isInvalid={!!errors.user_firstName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.user_firstName}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formBasicLastName" className="mb-3">
                            <Form.Label>Last Name*</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your last name"
                                name="user_lastName"
                                value={formData.user_lastName}
                                onChange={handleChange}
                                isInvalid={!!errors.user_lastName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.user_lastName}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formBasicPhone" className="mb-3">
                            <Form.Label>Phone Number*</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your phone number"
                                name="user_phone"
                                value={formData.user_phone}
                                onChange={handleChange}
                                isInvalid={!!errors.user_phone}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.user_phone}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail" className="mb-3">
                            <Form.Label>Email*</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                name="user_email"
                                value={formData.user_email}
                                onChange={handleChange}
                                isInvalid={!!errors.user_email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.user_email}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" className="mb-3">
                            <Form.Label>Password*</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                name="user_password"
                                value={formData.user_password}
                                onChange={handleChange}
                                isInvalid={!!errors.user_password}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.user_password}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formBasicZipcode" className="mb-3">
                            <Form.Label>Zipcode*</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your zipcode"
                                name="user_zipcode"
                                value={formData.user_zipcode}
                                onChange={handleChange}
                                isInvalid={!!errors.user_zipcode}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.user_zipcode}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formBasicCity" className="mb-3">
                            <Form.Label>City*</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your city"
                                name="user_city"
                                value={formData.user_city}
                                onChange={handleChange}
                                isInvalid={!!errors.user_city}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.user_city}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formBasicAgreement" className="mb-3">
                            <Form.Check
                                type="checkbox"
                                label="I agree to the terms and conditions"
                                name="user_agreement"
                                checked={formData.user_agreement}
                                onChange={handleChange}
                                isInvalid={!!errors.user_agreement}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.user_agreement}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">
                            Register
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
