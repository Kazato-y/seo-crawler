import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Input, Button, List, ListItem, DeleteButton } from './styles/DomainListStyles';

const DomainList = () => {
    const [domains, setDomains] = useState([]);
    const [newDomain, setNewDomain] = useState('');

    const handleAddDomain = (e) => {
        e.preventDefault();
        if (newDomain) {
            setDomains([...domains, { id: domains.length + 1, url: newDomain }]);
            setNewDomain('');
        }
    };

    const handleDeleteDomain = (domainId) => {
        setDomains(domains.filter((d) => d.id !== domainId));
    };

    return (
        <Container>
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
                    <ListItem key={domain.id}>
                        <Link to={`/domains/${domain.id}`}>{domain.url}</Link>
                        <DeleteButton onClick={() => handleDeleteDomain(domain.id)}>Delete</DeleteButton>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default DomainList;
