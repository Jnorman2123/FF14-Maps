import type { NextPage } from "next";
import { useGetQuestsQuery, useGetRewardsQuery, useGetItemsQuery, useGetJobsQuery, useGetNpcsQuery, 
useGetStepsQuery } from "@/store/services/helperquest";
import Quest from './containers/quest'
import Reward from "./containers/reward";

const Home: NextPage = () => {

  interface Quest {
    id: number,
    name: string,
    previousQuest: string,
    level: number,
    type: string,
    class: number[],
    nextQuest: string,
    npcs: number[],
    reward: number
  }

  interface Reward {
    id: number,
    questName: string,
    experience: number,
    gil: number,
    items: number[],
    other: string,
  }

  interface Npc {
    id: number,
    name: string,
    type: string,
    zone: string,
    locationX: number,
    locationY: number,
    soldItems: number[]
  }

  interface Item {
    id: number,
    name: string,
    quantity: number,
    optional: boolean,
  }

  interface Step {
    id: number,
    description: string,
    quest: number,
    npc: number
  }

  interface Job {
    id: number,
    name: string,
  }

  let quests: Quest[] = [];
  let rewards: Reward[] = [];
  let npcs: Npc[] = [];
  let items: Item[] = [];
  let jobs: Job[] = [];
  let steps: Step[] = [];

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
