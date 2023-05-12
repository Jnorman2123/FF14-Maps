import { useGetJobsQuery } from '@/store/services/helperquest';
import { useState } from 'react';

export const useGetJobs = () => {
  const [jobs, setJobs] = useState([]);

  const { data, error, isLoading } = useGetJobsQuery('jobs');

  if (isLoading) {
    return jobs;
  } else {
    return data;
  }
};