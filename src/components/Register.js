import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Container } from './styles/RegisterStyles';
import { registerUser } from '../services/api';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(username, password, email);
            navigate('/login');
        } catch (error) {
            setErrorMessage('Registration failed. Please try again.');
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <h2>Register</h2>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <Input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button type="submit">Register</Button>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </Form>
        </Container>
    );
};

export default Register;
