import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Info, ChartContainer, Button } from './styles/DomainDetailStyles';
import { Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { crawlDomain, getDomainDetails, getDomainUrls } from '../services/api';

const DomainDetail = () => {
    const { domainId } = useParams();
    const navigate = useNavigate();
    const [domainData, setDomainData] = useState(null);
    const [urls, setUrls] = useState([]);
    const [isCrawling, setIsCrawling] = useState(false);

    useEffect(() => {
        const fetchDomainDetails = async () => {
            const data = await getDomainDetails(domainId);
            setDomainData(data);
            const urlData = await getDomainUrls(domainId);
            setUrls(urlData);
        };

        fetchDomainDetails();
    }, [domainId]);

    const handleManualCrawl = async () => {
        if (!domainData) return;
        setIsCrawling(true);
        try {
            await crawlDomain(domainId, domainData.url);
            const intervalId = setInterval(async () => {
                const urlData = await getDomainUrls(domainId);
                setUrls(urlData);
                if (urlData.every(url => url.last_crawled_at !== null)) {
                    setIsCrawling(false);
                    clearInterval(intervalId);
                }
            }, 5000); // 5秒ごとにポーリング
        } catch (error) {
            console.error('Failed to crawl domain:', error);
            setIsCrawling(false);
        }
    };

    if (!domainData) return <p>Loading...</p>;

    const statusCodeDistribution = urls.reduce((acc, url) => {
        acc[url.http_status_code] = (acc[url.http_status_code] || 0) + 1;
        return acc;
    }, {});

    const nonCanonicalCounts = urls.reduce((acc, url) => {
        if (url.canonical && url.canonical !== url.url) {
            const date = new Date(url.last_crawled_at).toLocaleDateString();
            acc[date] = (acc[date] || 0) + 1;
        }
        return acc;
    }, {});

    const statusCodeData = {
        labels: Object.keys(statusCodeDistribution),
        datasets: [
            {
                label: 'Status Codes',
                data: Object.values(statusCodeDistribution),
                backgroundColor: ['#4caf50', '#f44336', '#ffeb3b'],
            },
        ],
    };

    const crawlHistoryData = {
        labels: Object.keys(nonCanonicalCounts),
        datasets: [
            {
                label: 'Non-Canonical URLs Over Time',
                data: Object.values(nonCanonicalCounts),
                borderColor: '#42a5f5',
                fill: false,
            },
        ],
    };

    return (
        <Container>
            <h2><strong>URL:</strong> {domainData.url}</h2>
            <Info><strong>Last Crawled At:</strong> {domainData.lastCrawledAt ? new Date(domainData.lastCrawledAt).toLocaleString() : 'N/A'}</Info>

            <Button onClick={handleManualCrawl} disabled={isCrawling}>
                {isCrawling ? 'Crawling...' : 'Manual Crawl'}
            </Button>

            <h3 onClick={() => navigate(`/domains/${domainId}/status-codes`)} style={{ cursor: 'pointer', color: 'blue' }}>HTTP Status Code Distribution</h3>
            <ChartContainer>
                <Pie data={statusCodeData} />
            </ChartContainer>

            <h3 onClick={() => navigate(`/domains/${domainId}/non-canonical`)} style={{ cursor: 'pointer', color: 'blue' }}>Non-Canonical URLs Over Time</h3>
            <ChartContainer>
                <Line data={crawlHistoryData} />
            </ChartContainer>

        
        </Container>
    );
};

export default DomainDetail;
