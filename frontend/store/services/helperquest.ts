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
    getQuests: builder.query({
      query: () => 'quests',
    }),
    getNpcs: builder.query({
      query: () => 'npcs',
    }),
    getRewards: builder.query({
      query: () => 'rewards',
    }),
    getSteps: builder.query({
      query: () => 'steps',
    }),
    getJobs: builder.query({
      query: () => 'jobs',
    }),
  }),
})

export const { useGetItemsQuery, useGetQuestsQuery, useGetNpcsQuery, useGetRewardsQuery, useGetStepsQuery, 
  useGetJobsQuery } = helperquestApi