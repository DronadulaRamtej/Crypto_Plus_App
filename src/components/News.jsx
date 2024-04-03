import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Card, Avatar, Select } from 'antd';
import moment from 'moment';
import axios from 'axios';

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [cryptos, setCryptos] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState('Cryptocurrency'); // Initialize with a default value
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const { data } = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
        setCryptos(data);
      } catch (error) {
        console.error('Error fetching cryptocurrencies:', error);
      }
    };

    fetchCryptos();
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      const apiKey = '0MMeggI65U3qpAPvfF8u0B7Vj61STHrYmcwKt4Si01WrCoMs'; // Replace with your Currents API key
      let url = `https://api.currentsapi.services/v1/latest-news?language=en&apiKey=${apiKey}`;

      // Assuming that the Currents API does not directly support filtering by cryptocurrency, 
      // the keyword addition might need adjustment or use a different API endpoint if available.
      if (selectedCrypto && selectedCrypto !== 'Cryptocurrency') {
        url += `&keywords=${encodeURIComponent(selectedCrypto)}`;
      }

      try {
        const { data } = await axios.get(url);
        setNews(data.news.slice(0, simplified ? 6 : 12)); // Adjust the slice as needed
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [selectedCrypto, simplified]);

  return (
    <>
      {!simplified && (
        <Row style={{ marginBottom: '20px' }}>
          <Col span={24}>
            <Select
              showSearch
              className="select-news"
              placeholder="Select a Crypto"
              optionFilterProp="children"
              onChange={(value) => setSelectedCrypto(value)}
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              <Option value="Cryptocurrency">All Cryptocurrencies</Option>
              {cryptos.map((crypto) => (
                <Option key={crypto.id} value={crypto.name}>{crypto.name}</Option>
              ))}
            </Select>
          </Col>
        </Row>
      )}
      <Row gutter={[24, 24]}>
        {news.map((item, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card hoverable className="news-card">
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <div className="news-image-container">
                  <Title level={4}>{item.title}</Title>
                  <img className="news-image" style={{ maxWidth: '100%', height: 'auto' }} src={item.image || 'https://via.placeholder.com/200'} alt="news" />
                </div>
                <p className="news-description">{item.description.length > 100 ? `${item.description.substring(0, 100)}...` : item.description}</p>
                <div className="provider-container">
                  <Avatar src={item.image || 'https://via.placeholder.com/40'} alt="news" />
                  <Text className="provider-name">{item.author || 'Unknown Author'}</Text>
                  <Text>{moment(item.published).startOf('second').fromNow()}</Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default News;
