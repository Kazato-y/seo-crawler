import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Table, Input } from './styles/ListStyles';
import { getStatusCodeUrls, getInternalLinks } from '../services/api';

const StatusCodeList = () => {
    const { domainId } = useParams();
    const [urls, setUrls] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedUrl, setSelectedUrl] = useState(null);
    const [internalLinks, setInternalLinks] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'url', direction: 'ascending' });

    useEffect(() => {
        const fetchData = async () => {
            const data = await getStatusCodeUrls(domainId);
            setUrls(data);
        };

        fetchData();
    }, [domainId]);

    const filteredUrls = urls.filter(
        ({ url, http_status_code, title }) =>
            url.includes(search) || title.includes(search) || http_status_code.toString().includes(search)
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

    const handleStatusCodeClick = async (urlId) => {
        if (selectedUrl === urlId) {
            setSelectedUrl(null);
            setInternalLinks([]);
        } else {
            setSelectedUrl(urlId);
            const links = await getInternalLinks(urlId);
            setInternalLinks(links);
        }
    };

    return (
        <Container>
            <h2>HTTP Status Codes</h2>
            <Input
                type="text"
                placeholder="Search by URL, Title, Status Code"
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
                            <button type="button" onClick={() => requestSort('http_status_code')}>
                                Status Code
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
                    {sortedUrls.map(({ url, http_status_code, title, url_id }) => (
                        <React.Fragment key={url}>
                            <tr>
                                <td>
                                    <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
                                </td>
                                <td>
                                    <button onClick={() => handleStatusCodeClick(url_id)}>{http_status_code}</button>
                                </td>
                                <td>{title}</td>
                            </tr>
                            {selectedUrl === url_id && (
                                <tr>
                                    <td colSpan="3">
                                        <ul>
                                            {internalLinks.map((link, index) => (
                                                <li key={index}>{link}</li>
                                            ))}
                                        </ul>
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

export default StatusCodeList;
