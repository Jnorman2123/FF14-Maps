import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const helperquestApi = createApi({
  reducerPath: 'helperquestApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: "https://api.helperquest.com/",
  }),
  endpoints: (builder) => ({
    getItems: builder.query({
      query: () => 'items',
    }),
  }),
})

// const proxy = createProxyMiddleware({
//   target: "https://api.helperquest.com/",
//   changeOrigin: true,
// });

// // add the proxy middleware to your server
// const app = express();
// app.use("https://api.helperquest.com/", proxy);

// // start the server
// app.listen(3000);

export const { useGetItemsQuery } = helperquestApi