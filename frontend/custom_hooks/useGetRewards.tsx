import { useGetRewardsQuery } from '@/store/services/helperquest';
import { useState } from 'react';

export const useGetRewards = () => {
  const [rewards, setRewards] = useState([]);

  const { data, error, isLoading } = useGetRewardsQuery('rewards');

  if (isLoading) {
    return rewards;
  } else {
    return data;
  }
};