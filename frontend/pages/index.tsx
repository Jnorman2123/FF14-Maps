import type { NextPage } from "next";
import { useGetQuestsQuery } from "@/store/services/helperquest";
import Quest from './containers/quest'

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

  let quests: Quest[] = [];
  let rewards = [];
  let npcs = [];
  let items = [];
  let jobs = [];
  let steps = [];

  const setQuests = () => {
    const { data, error, isLoading } = useGetQuestsQuery('quests');
    if (isLoading) {
      return quests = [];
    } else {
      return quests = data
    }
  }

  setQuests();

  if (quests.length < 1) {
    return <div>Loading...</div>
  } else {
    return <div>
      <Quest quests={quests} />
    </div>
  }
};

export default Home;
