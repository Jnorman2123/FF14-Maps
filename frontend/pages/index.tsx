import type { NextPage } from "next";
import { getClassesState } from "../store/slices/classesSlice";
import { useSelector } from "react-redux";
import { useGetItemsQuery } from "@/store/services/helperquest";

const Home: NextPage = () => {
  const itemsArray = useGetItemsQuery('items');
  console.log(itemsArray.data)
  const classesArray = useSelector(getClassesState);
  return (
    <>
      <ul>
        {classesArray.map((c: any) => {
          return <li key={c.name} >{c.name}</li>
        })}
      </ul>
      {/* <ul>
        {itemsArray.map((item: any) => {
          return <li key={item.name} >{item.name}</li>
        })}
      </ul> */}
    </>
    
  );
};

export default Home;
