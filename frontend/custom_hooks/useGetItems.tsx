import { useGetItemsQuery } from '@/store/services/helperquest';
import { useState } from 'react';

export const useGetItems = () => {
  const [items, setItems] = useState([]);

  const { data, error, isLoading } = useGetItemsQuery('items');

  if (isLoading) {
    return items;
  } else {
    return data;
  }
};