import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Table, Input } from './styles/ListStyles';
import InternalLinksList from './InternalLinksList';
import { getNonCanonicalUrls, getDomainDetails } from '../services/api';

const NonCanonicalList = () => {
    const { domainId } = useParams();
    const [domainUrl, setDomainUrl] = useState('');
    const [urls, setUrls] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedUrl, setSelectedUrl] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'url', direction: 'ascending' });

    useEffect(() => {
        const fetchDomainDetails = async () => {
            const data = await getDomainDetails(domainId);
            setDomainUrl(data.url);
        };

        const fetchData = async () => {
            const data = await getNonCanonicalUrls(domainId);
            const nonCanonicalUrls = data.filter(url => url.canonical && url.canonical !== url.url);
            setUrls(nonCanonicalUrls);
        };

        fetchDomainDetails();
        fetchData();
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

    const handleCanonicalClick = async (urlId) => {
        if (selectedUrl === urlId) {
            setSelectedUrl(null);
        } else {
            setSelectedUrl(urlId);
        }
    };

    return (
        <Container>
            <h2>Non-Canonical URLs for Domain {domainUrl}</h2>
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
                    {sortedUrls.map(({ url, canonical, title, url_id }) => (
                        <React.Fragment key={url}>
                            <tr>
                                <td>{url}</td>
                                <td>
                                    <button onClick={() => handleCanonicalClick(url_id)}>
                                        {canonical}
                                    </button>
                                </td>
                                <td>{title}</td>
                            </tr>
                            {selectedUrl === url_id && (
                                <tr>
                                    <td colSpan="3">
                                        <InternalLinksList urlId={url_id} />
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
