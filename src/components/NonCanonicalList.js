import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Table, Input } from './styles/ListStyles';
import InternalLinksList from './InternalLinksList';

const NonCanonicalList = () => {
    const { domainId } = useParams();
    const [urls, setUrls] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedUrl, setSelectedUrl] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'url', direction: 'ascending' });

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

    const sortedUrls = [...filteredUrls].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

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
                        <th>
                            <button type="button" onClick={() => requestSort('url')}>
                                URL
                            </button>
                        </th>
                        <th>
                            <button type="button" onClick={() => requestSort('canonical')}>
                                Canonical
                            </button>
                        </th>
                        <th>
                            <button type="button" onClick={() => requestSort('title')}>
                                Title
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedUrls.map(({ url, canonical, title }) => (
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
            <Link to={`/domains/${domainId}`}>Back to Domain Details</Link>
        </Container>
    );
};

export default NonCanonicalList;
