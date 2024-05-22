import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Container } from './styles/LoginStyles';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // ここでログインのロジックを実装
        navigate('/domains');
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <Input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button type="submit">Login</Button>
                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </Form>
        </Container>
    );
};

export default Login;
