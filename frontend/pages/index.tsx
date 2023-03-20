import type { MyPage } from "./components/types";
import { useGetQuestsQuery, useGetRewardsQuery, useGetItemsQuery, useGetJobsQuery, useGetNpcsQuery, 
useGetStepsQuery } from "@/store/services/helperquest";
import Quest from './containers/quest'
import type { TypeQuest, TypeReward, TypeNpc, TypeItem,  TypeJob, TypeStep } from "./components/types";
import Reward from "./containers/reward";
import { useState } from 'react';

const Home: MyPage = () => {

  const [questId, setQuestId] = useState(null);
  const [navigate, setNavigate] = useState(false);
  const [navigateLink, setNavigateLink] = useState('');
  const [toggleQuests, setToggledQuests] = useState([]);
  const [activeQuests, setActiveQuests] = useState([]);

  let quests: TypeQuest[] = [];
  let rewards: TypeReward[] = [];
  let npcs: TypeNpc[] = [];
  let items: TypeItem[] = [];
  let jobs: TypeJob[] = [];
  let steps: TypeStep[] = [];

  const setQuests = () => {
    const { data, error, isLoading } = useGetQuestsQuery('quests');
    if (isLoading) {
      return quests = [];
    } else {
      return quests = data
    }
  }

  const setRewards = () => {
    const { data, error, isLoading } = useGetRewardsQuery('rewards');
    if (isLoading) {
      return rewards = [];
    } else {
      return rewards = data
    }
  }

  const setNpcs = () => {
    const { data, error, isLoading } = useGetNpcsQuery('npcs');
    if (isLoading) {
      return npcs = [];
    } else {
      return npcs = data
    }
  }

  const setItems = () => {
    const { data, error, isLoading } = useGetItemsQuery('items');
    if (isLoading) {
      return items = [];
    } else {
      return items = data
    }
  }

  const setSteps = () => {
    const { data, error, isLoading } = useGetStepsQuery('steps');
    if (isLoading) {
      return steps = [];
    } else {
      return steps = data
    }
  }

  const setJobs = () => {
    const { data, error, isLoading } = useGetJobsQuery('jobs');
    if (isLoading) {
      return jobs = [];
    } else {
      return jobs = data
    }
  }

  setQuests();
  setRewards();
  setSteps();
  setNpcs();
  setItems();
  setJobs();

  if (quests.length < 1) {
    return <div>Loading...</div>
  } else {
    return <div>
      <Quest quests={quests} />
      <Reward rewards={rewards} />
    </div>
  }
};

export default Home;
Home.Layout = 'Main';
