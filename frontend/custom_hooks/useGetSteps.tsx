import { useGetStepsQuery } from '@/store/services/helperquest';
import { useState } from 'react';

export const useGetSteps = () => {
  const [steps, setSteps] = useState([]);

  const { data, error, isLoading } = useGetStepsQuery('steps');

  if (isLoading) {
    return steps;
  } else {
    return data;
  }
};