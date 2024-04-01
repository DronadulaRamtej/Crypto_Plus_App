import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';

const Cryptocurrencies = ({ simplified }) => {
    const count = simplified ? 10 : 100; // Assuming you want to show more on a detailed page
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState([]);

    useEffect(() => {
        const filteredData = cryptosList?.data?.coins.slice(0, count);
        setCryptos(filteredData);
    }, [cryptosList, count]);

    if (isFetching) return 'Loading...';

    return (
        <Row gutter={[32, 32]} className='crypto-card-container'>
            {cryptos && cryptos.map((currency) => (
                <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.uuid}>
                    <Link to={`/crypto/${currency.uuid}`}>
                        <Card
                            title={`${currency.rank}. ${currency.name}`}
                            extra={<img className='crypto-image' src={currency.iconUrl} alt={currency.name} />}
                            hoverable
                        >
                            <p>Price: {millify(currency.price)}</p>
                            <p>Market Cap: {millify(currency.marketCap)}</p>
                            <p>Daily Change: {currency.change}%</p>
                        </Card>
                    </Link>
                </Col>
            ))}
        </Row>
    );
}

export default Cryptocurrencies;
