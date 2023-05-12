import { useGetQuestsQuery } from '@/store/services/helperquest';
import { useState } from 'react';

export const useGetQuests = () => {
  const [quests, setQuests] = useState([]);

  const { data, error, isLoading } = useGetQuestsQuery('quests');

  if (isLoading) {
    return quests;
  } else {
    return data;
  }
};