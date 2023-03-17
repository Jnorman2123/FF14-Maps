import type { NextPage } from "next";
import { getClassesState, getQuestTypesState, getQuestLevelsState } from "../store/slices/dataStoreSlice";
import { useSelector } from "react-redux";
import { useGetItemsQuery } from "@/store/services/helperquest";

const Home: NextPage = () => {
  const itemsArray = useGetItemsQuery('items');
  const classesArray = useSelector(getClassesState);
  const questTypesArray = useSelector(getQuestTypesState);
  const questLevelsArray = useSelector(getQuestLevelsState);
  console.log(questLevelsArray)
  return (
    <>
      <ul>
        {classesArray.map((c: any) => {
          return <li key={c.name} >{c.name}</li>
        })}
      </ul>
    </>
    
  );
};

export default Home;
