import { useGetNpcsQuery } from '@/store/services/helperquest';
import { useState } from 'react';

export const useGetNpcs = () => {
  const [npcs, setNpcs] = useState([]);

  const { data, error, isLoading } = useGetNpcsQuery('npcs');

  if (isLoading) {
    return npcs;
  } else {
    return data;
  }
};