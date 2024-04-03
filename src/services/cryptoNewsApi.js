import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const newsApiHeaders = {
    'X-RapidAPI-Key': '1a5ad0854bmshcc3ad660f15a63dp1f1f26jsn14a2298db021',
    'X-RapidAPI-Host': 'google-news13.p.rapidapi.com',
};

const baseUrl = 'https://google-news13.p.rapidapi.com';

// Since RTK Query's fetchBaseQuery utility automatically sets up the request, 
// you can configure it directly for the base URL and headers.
export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl,
        prepareHeaders: (headers) => {
            // Append the necessary headers to each request
            headers.set('X-RapidAPI-Key', newsApiHeaders['X-RapidAPI-Key']);
            headers.set('X-RapidAPI-Host', newsApiHeaders['X-RapidAPI-Host']);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: (newsCategory) => ({
                url: `/latest`,
                params: { q: newsCategory, lr: 'en-US' },
            }),
        }),
    }),
});

export const {
    useGetCryptoNewsQuery,
} = cryptoNewsApi;
