import React from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';

import { useGetCryptoStatsQuery } from '../services/cryptoApi';


import { Cryptocurrencies, News } from '../components'

const { Title } = Typography;

const Homepage = () => {
    const { data, isFetching } = useGetCryptoStatsQuery();

    if (isFetching) return 'Loading...';

    const stats = data?.data;

    const marketCapChangePercentage = stats?.market_cap_change_percentage_24h_usd.toFixed(2);

    const updatedAt = new Date(stats?.updated_at * 1000);
    // Format the date as a string (e.g., "MM/DD/YYYY, HH:MM:SS")
    const formattedDate = updatedAt.toLocaleString();
    

    return (
        <>
            <Title level={2} className='heading'>Global Crypto Stats</Title>

            <Row>
                <Col span={12}> 
                    <Statistic title="Total Cryptocurrencies" value={millify(stats?.active_cryptocurrencies || 0)} />
                </Col>
                <Col span={12}> 
                    <Statistic 
                        title="Market Cap Change % (24h)" 
                        value={`${marketCapChangePercentage}%`} 
                        valueStyle={{ color: marketCapChangePercentage >= 0 ? 'green' : 'red' }} 
                    />
                </Col>

                <Col span={12}> 
                    <Statistic title="Total Market Cap" value={`$${millify(stats?.total_market_cap?.usd || 0)}`} />
                </Col>
                <Col span={12}> 
                    <Statistic title="Total 24h Volume" value={`$${millify(stats?.total_volume?.usd || 0)}`} />
                </Col>
                <Col span={12}> 
                    <Statistic title="Total Markets" value={millify(stats?.markets || 0)} />
                </Col>
            </Row>

            <div className='home-heading-container'>
                <Title level={2} className='home-title'>Top 10 Cryptocurrencies in the world</Title>
                <Title level={3} className='show-more'><Link to="/cryptocurrencies">Show More</Link></Title>
            </div>
            <Cryptocurrencies simplified />

            <div className='home-heading-container'>
                <Title level={2} className='home-title'>Latest Crypto News</Title>
                <Title level={3} className='show-more'><Link to="/cryptocurrencies">Show More</Link></Title>
            </div>
            <News simplified />
        </>
    );
};

export default Homepage;
