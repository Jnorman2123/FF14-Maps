import type { NextPage } from "next";
import { getClassesState, getQuestTypesState, getQuestLevelsState, getInsideZoneNamesState,
getOutsideZoneNamesState, getLaNosceaZoneNamesState, getTheBlackShroudZoneNamesState, getThanalanZoneNamesState } 
from "../store/slices/dataStoreSlice";
import { useSelector } from "react-redux";
import { useGetItemsQuery } from "@/store/services/helperquest";

const Home: NextPage = () => {
  const itemsArray = useGetItemsQuery('items');
  const classesArray = useSelector(getClassesState);
  const questTypesArray = useSelector(getQuestTypesState);
  const questLevelsArray = useSelector(getQuestLevelsState);
  const insideZoneNamesArray = useSelector(getInsideZoneNamesState)
  const outsideZoneNamesArray = useSelector(getOutsideZoneNamesState)
  const laNosceaZoneNamesArray = useSelector(getLaNosceaZoneNamesState)
  const theBlackShroudZoneNamesArray = useSelector(getTheBlackShroudZoneNamesState)
  const thanalanZoneNamesArray = useSelector(getThanalanZoneNamesState)
  console.log(thanalanZoneNamesArray)
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
