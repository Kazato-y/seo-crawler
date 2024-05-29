import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Container } from './styles/LoginStyles';
import { loginUser } from '../services/api';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Logging in with', username, password);
            const data = await loginUser(username, password);
            console.log('Login response:', data);
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', username);
            navigate('/domains');
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage('Login failed. Please try again.');
        }
    };
    

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <h2>Login</h2>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <Input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button type="submit">Login</Button>
                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </Form>
        </Container>
    );
};

export default Login;
