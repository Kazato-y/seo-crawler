import React, { useState, useEffect } from 'react';
import { List, ListItem, Button, ToggleContainer } from './styles/ListStyles';
import { getInternalLinks } from '../services/api';

const InternalLinksList = ({ urlId }) => {
    const [internalLinks, setInternalLinks] = useState([]);
    const [showLinks, setShowLinks] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getInternalLinks(urlId);
            setInternalLinks(data);
        };

        fetchData();
    }, [urlId]);

    return (
        <ToggleContainer>
            <Button onClick={() => setShowLinks(!showLinks)}>
                {showLinks ? 'Hide Internal Links' : 'Show Internal Links'}
            </Button>
            {showLinks && (
                <List>
                    {internalLinks.map((link, index) => (
                        <ListItem key={index}>{link}</ListItem>
                    ))}
                </List>
            )}
        </ToggleContainer>
    );
};

export default InternalLinksList;
