

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const Login = () => {
    const [formData, setFormData] = useState({
        user_email: '',
        user_password: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: '',
        });
    };

    const validateForm = () => {
        let valid = true;
        let newErrors = {};

        if (!formData.user_email) {
            valid = false;
            newErrors.user_email = 'Email is required';
        }
        if (!formData.user_password) {
            valid = false;
            newErrors.user_password = 'Password is required';
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
            const response = await axios.post('https://syoft.dev/Api/userlogin/api/userlogin', {
                user_email: formData.user_email,
                user_password: formData.user_password,
            });

            if (response.data.status) {
                const userData = response.data.user_data[0];
                localStorage.setItem('username', userData.user_firstname);
                setSuccessMessage('Successful Login!');
                
                setTimeout(() => navigate('/'), 2000); 
            } else {
                setErrorMessage(response.data.msg);
            }
        } catch (error) {
            setErrors({ global: 'An error occurred. Please try again.' });
            console.error(error);
        }
    };

    const handleNew = () => {
        navigate("/register");
    };

    return (
        <Container className="login-container mt-5">
            <div className="text-center mb-4">
                <h1 className="display-4">Welcome Back!</h1>
                <p className="lead">Login to access your account and manage your profile.</p>
            </div>
            <div className="form-container">
                <Form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
                    {errors.global && <Alert variant="danger">{errors.global}</Alert>}
                    {successMessage && <Alert variant="success">{successMessage}</Alert>}
                    {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                    <Form.Group controlId="formBasicEmail" className="mb-3">
                        <Form.Label>Email</Form.Label>
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
                        <Form.Label>Password</Form.Label>
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

                    <Button variant="primary" type="submit" className="w-100">
                        Login
                    </Button>

                    <div className="text-center mt-3">
                        <p onClick={handleNew} className="text-primary cursor-pointer">
                            Don't have an account? Create a new account!
                        </p>
                    </div>
                </Form>
            </div>
        </Container>
    );
};

export default Login;
