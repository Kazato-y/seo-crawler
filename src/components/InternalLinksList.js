import React, { useState, useEffect } from 'react';
import { List, ListItem, Button, ToggleContainer } from './styles/ListStyles';

const InternalLinksList = ({ url }) => {
    const [internalLinks, setInternalLinks] = useState([]);
    const [showLinks, setShowLinks] = useState(false);

    useEffect(() => {
        // ここでAPI呼び出しをして、内部リンクデータを取得します
        // ダミーデータを使用
        const data = {
            'https://example.com/page1': [
                'https://example.com',
                'https://example.com/page2',
            ],
            'https://example.com/page2': [
                'https://example.com',
            ],
            'https://example.com/page3': [
                'https://example.com',
                'https://example.com/page1',
            ],
        };

        setInternalLinks(data[url] || []);
    }, [url]);

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
