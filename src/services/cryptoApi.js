import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
    'X-RapidAPI-Key': '1a5ad0854bmshcc3ad660f15a63dp1f1f26jsn14a2298db021',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'

};
  

  const baseUrls = {
    coingecko: 'https://api.coingecko.com/api/v3',
    coinranking: 'https://coinranking1.p.rapidapi.com',
};
// Create request utility function
const createRequest = (url, headers = {}, params = {}) => ({ url, headers, params });


export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    // Note: Since endpoints can override the baseQuery's url, setting a default baseQuery isn't strictly necessary.
    baseQuery: fetchBaseQuery({ baseUrl: '' }), 
    endpoints: (builder) => ({
        // Endpoint for CoinGecko global stats
        getCryptoStats: builder.query({
            query: () => createRequest(`${baseUrls.coingecko}/global`),
        }),
        // New endpoint for fetching all coins from CoinRanking
        getCryptos: builder.query({
            query: () => createRequest(`${baseUrls.coinranking}/coins`, cryptoApiHeaders, {
                referenceCurrencyUuid: 'yhjMzLPhuIDl', // Sample param; replace as needed
                timePeriod: '24h',
                'tiers[0]': '1',
                orderBy: 'marketCap',
                orderDirection: 'desc',
                limit: '50',
                offset: '0'
            }),
        }),
    }),
});

export const {
    useGetCryptoStatsQuery,
    useGetCryptosQuery, // Hook for fetching coins from CoinRanking
} = cryptoApi;


