import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Container } from './styles/RegisterStyles';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // ここでユーザー登録のロジックを実装
        navigate('/login');
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <h2>Register</h2>
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
