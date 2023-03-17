import type { NextPage } from "next";
import { getQuestIconBgColorsState } from "../store/slices/dataStoreSlice";
import { useSelector } from "react-redux";
import { useGetItemsQuery } from "@/store/services/helperquest";

const Home: NextPage = () => {
  const QuestIconBgColorsArray = useSelector(getQuestIconBgColorsState);
  return (
    <>
      <ul>
        {QuestIconBgColorsArray.map((c: any) => {
          return <li key={c} >{c}</li>
        })}
      </ul>
    </>
    
  );
};

export default Home;
