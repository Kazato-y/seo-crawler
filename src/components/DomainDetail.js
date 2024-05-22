import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Info, ChartContainer, Button } from './styles/DomainDetailStyles'; // List, ListItemのインポートを削除
import { Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const DomainDetail = () => {
    const { domainId } = useParams();
    const navigate = useNavigate();
    const [domainData, setDomainData] = useState(null);

    useEffect(() => {
        // ここでAPI呼び出しをして、domainIdに基づいてドメインデータを取得します
        // ダミーデータを使用
        const data = {
            url: 'https://example.com',
            httpStatusCode: 200,
            canonical: 'https://example.com',
            title: 'Example Domain',
            description: 'This domain is for use in illustrative examples in documents.',
            lastCrawledAt: '2023-05-22T10:00:00Z',
            statusCodeDistribution: {
                '200': 80,
                '404': 15,
                '500': 5,
            },
            crawlHistory: [
                { date: '2023-05-01', status: 200, nonCanonicalCount: 5 },
                { date: '2023-05-15', status: 404, nonCanonicalCount: 3 },
                { date: '2023-05-22', status: 200, nonCanonicalCount: 7 },
            ],
        };

        setDomainData(data);
    }, [domainId]);

    const handleManualCrawl = () => {
        // ここで手動クロールのロジックを実装します
        console.log('Manual crawl initiated for domain:', domainId);
    };

    const handleStatusCodeClick = () => {
        navigate(`/domains/${domainId}/status-codes`);
    };

    const handleNonCanonicalClick = () => {
        navigate(`/domains/${domainId}/non-canonical`);
    };

    if (!domainData) return <p>Loading...</p>;

    const statusCodeData = {
        labels: Object.keys(domainData.statusCodeDistribution),
        datasets: [
            {
                label: 'Status Codes',
                data: Object.values(domainData.statusCodeDistribution),
                backgroundColor: ['#4caf50', '#f44336', '#ffeb3b'],
            },
        ],
    };

    const crawlHistoryData = {
        labels: domainData.crawlHistory.map(entry => entry.date),
        datasets: [
            {
                label: 'Non-Canonical URLs Over Time',
                data: domainData.crawlHistory.map(entry => entry.nonCanonicalCount),
                borderColor: '#42a5f5',
                fill: false,
            },
        ],
    };

    return (
        <Container>
            <h2>Domain Details</h2>
            <Info><strong>URL:</strong> {domainData.url}</Info>
            <Info><strong>HTTP Status Code:</strong> {domainData.httpStatusCode}</Info>
            <Info><strong>Canonical:</strong> {domainData.canonical}</Info>
            <Info><strong>Title:</strong> {domainData.title}</Info>
            <Info><strong>Description:</strong> {domainData.description}</Info>
            <Info><strong>Last Crawled At:</strong> {new Date(domainData.lastCrawledAt).toLocaleString()}</Info>

            <Button onClick={handleManualCrawl}>Manual Crawl</Button>

            <h3 onClick={handleStatusCodeClick} style={{ cursor: 'pointer', color: 'blue' }}>HTTP Status Code Distribution</h3>
            <ChartContainer>
                <Pie data={statusCodeData} />
            </ChartContainer>

            <h3 onClick={handleNonCanonicalClick} style={{ cursor: 'pointer', color: 'blue' }}>Non-Canonical URLs Over Time</h3>
            <ChartContainer>
                <Line data={crawlHistoryData} />
            </ChartContainer>
        </Container>
    );
};

export default DomainDetail;
