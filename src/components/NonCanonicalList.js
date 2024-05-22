import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Table, Input } from './styles/ListStyles';
import InternalLinksList from './InternalLinksList';

const NonCanonicalList = () => {
    const { domainId } = useParams();
    const [urls, setUrls] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedUrl, setSelectedUrl] = useState(null);

    useEffect(() => {
        // ここでAPI呼び出しをして、domainIdに基づいてURLデータを取得します
        // ダミーデータを使用
        const data = [
            { url: 'https://example.com/page1', canonical: 'https://other.com', title: 'Page 1' },
            { url: 'https://example.com/page2', canonical: 'https://example.com/page2', title: 'Page 2' },
            { url: 'https://example.com/page3', canonical: 'https://other.com/page3', title: 'Page 3' },
        ];

        setUrls(data);
    }, [domainId]);

    const filteredUrls = urls.filter(
        ({ url, canonical, title }) =>
            url.includes(search) || canonical.includes(search) || title.includes(search)
    );

    return (
        <Container>
            <h2>Non-Canonical URLs for Domain {domainId}</h2>
            <Input
                type="text"
                placeholder="Search by URL, Canonical, Title"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <Table>
                <thead>
                    <tr>
                        <th>URL</th>
                        <th>Canonical</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUrls.map(({ url, canonical, title }) => (
                        <React.Fragment key={url}>
                            <tr>
                                <td>{url}</td>
                                <td><button onClick={() => setSelectedUrl(url)}>{canonical}</button></td>
                                <td>{title}</td>
                            </tr>
                            {selectedUrl === url && (
                                <tr>
                                    <td colSpan="3">
                                        <InternalLinksList url={url} />
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default NonCanonicalList;
