import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Input, Button, List, ListItem, DeleteButton } from './styles/DomainListStyles';
import { addDomain, getDomains, deleteDomain } from '../services/api';

const DomainList = () => {
    const [domains, setDomains] = useState([]);
    const [newDomain, setNewDomain] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }

        const fetchDomains = async () => {
            const domainData = await getDomains();
            setDomains(domainData);
        };

        fetchDomains();
    }, []);

    const handleAddDomain = async (e) => {
        e.preventDefault();
        if (newDomain) {
            const domain = await addDomain(newDomain);
            setDomains([...domains, domain]);
            setNewDomain('');
        }
    };

    const handleDeleteDomain = async (domainId) => {
        await deleteDomain(domainId);
        setDomains(domains.filter((d) => d.domain_id !== domainId));
    };

    const handleDomainClick = (domainId) => {
        navigate(`/domains/${domainId}`);
    };

    return (
        <Container>
            <h2>Welcome, {username}</h2>
            <h2>Domain List</h2>
            <Form onSubmit={handleAddDomain}>
                <Input
                    type="text"
                    placeholder="Add new domain"
                    value={newDomain}
                    onChange={(e) => setNewDomain(e.target.value)}
                />
                <Button type="submit">Add</Button>
            </Form>
            <List>
                {domains.map((domain) => (
                    <ListItem key={domain.domain_id}>
                        <span onClick={() => handleDomainClick(domain.domain_id)} style={{ cursor: 'pointer', color: 'blue' }}>
                            {domain.url}
                        </span>
                        <DeleteButton onClick={() => handleDeleteDomain(domain.domain_id)}>Delete</DeleteButton>
                    </ListItem>
                ))}
            </List>
            <Link to="/login">Back to Login</Link>
        </Container>
    );
};

export default DomainList;
