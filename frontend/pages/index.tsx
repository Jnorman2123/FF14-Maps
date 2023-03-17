import type { NextPage } from "next";
import { getSeoMessagesState } from "../store/slices/dataStoreSlice";
import { useSelector } from "react-redux";

const Home: NextPage = () => {
  const SeoMessagesArray = useSelector(getSeoMessagesState);
  return (
    <>
      <ul>
        {SeoMessagesArray.map((c: any) => {
          return <li key={c} >{c}</li>
        })}
      </ul>
    </>
    
  );
};

export default Home;
