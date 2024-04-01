import React, { useState, useEffect } from 'react';

import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';

const Cryptocurrencies = () => {
    const { data: cryptosList, isFetching } = useGetCryptosQuery();
    const [cryptos, setCryptos] = useState([]);

    // Use useEffect to update the cryptos state whenever cryptosList changes
    useEffect(() => {
        setCryptos(cryptosList?.data?.coins);
    }, [cryptosList]);

    if (isFetching) return 'Loading...';

    

  return (
    <>
        <Row gutter={[32, 32]} className='crypto-card-container'>
            {cryptos.map((currency) => (
                <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.uuid}>
                    <Link to={`/crypto/${currency.uuid}`}>
                        <Card
                            title={`${currency.rank}. ${currency.name}`}
                            extra={<img className='crypto-image' src={currency.iconUrl} />}
                            hoverable
                        >
                            <p>Price: {millify(currency.price)}</p>
                            <p>Market CaP: {millify(currency.marketCap)}</p>
                            <p>Daily Change: {millify(currency.change)}%</p>
                        </Card>
                    </Link>
                </Col>
            ))}
        </Row>
    </>
  )
}

export default Cryptocurrencies