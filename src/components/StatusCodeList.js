import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Table, Input } from './styles/ListStyles';
import InternalLinksList from './InternalLinksList';

const StatusCodeList = () => {
    const { domainId } = useParams();
    const [urls, setUrls] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedUrl, setSelectedUrl] = useState(null);

    useEffect(() => {
        // ここでAPI呼び出しをして、domainIdに基づいてURLデータを取得します
        // ダミーデータを使用
        const data = [
            { url: 'https://example.com/page1', statusCode: 200, title: 'Page 1' },
            { url: 'https://example.com/page2', statusCode: 404, title: 'Page 2' },
            { url: 'https://example.com/page3', statusCode: 500, title: 'Page 3' },
        ];

        setUrls(data);
    }, [domainId]);

    const filteredUrls = urls.filter(
        ({ url, statusCode, title }) =>
            url.includes(search) || title.includes(search) || statusCode.toString().includes(search)
    );

    return (
        <Container>
            <h2>HTTP Status Codes for Domain {domainId}</h2>
            <Input
                type="text"
                placeholder="Search by URL, Title, Status Code"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <Table>
                <thead>
                    <tr>
                        <th>URL</th>
                        <th>Status Code</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUrls.map(({ url, statusCode, title }) => (
                        <React.Fragment key={url}>
                            <tr>
                                <td>{url}</td>
                                <td><button onClick={() => setSelectedUrl(url)}>{statusCode}</button></td>
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

export default StatusCodeList;
