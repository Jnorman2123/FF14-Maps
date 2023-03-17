import type { NextPage } from "next";
import { getOriginalRegionsState } from "../store/slices/dataStoreSlice";
import { useSelector } from "react-redux";

const Home: NextPage = () => {
  const originalRegionsArray = useSelector(getOriginalRegionsState)
  return (
    <>
      <ul>
        {originalRegionsArray.map((c: any) => {
          return <li key={c} >{c}</li>
        })}
      </ul>
    </>
    
  );
};

export default Home;
