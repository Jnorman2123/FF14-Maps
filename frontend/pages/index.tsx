import type { NextPage } from "next";
import { getClassesState } from "../store/slices/dataStoreSlice";
import { getQuestTypesState } from "@/store/slices/questTypesSlice";
import { useSelector } from "react-redux";
import { useGetItemsQuery } from "@/store/services/helperquest";

const Home: NextPage = () => {
  const itemsArray = useGetItemsQuery('items');
  const classesArray = useSelector(getClassesState);
  const questTypesArray = useSelector(getQuestTypesState);
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
