import type { NextPage } from "next";
import { getZonesState } from "../store/slices/dataStoreSlice";
import { useSelector } from "react-redux";

const Home: NextPage = () => {
  const zonesArray = useSelector(getZonesState)
  return (
    <>
      <ul>
        {zonesArray.map((c: any) => {
          return <li key={c} >{c}</li>
        })}
      </ul>
    </>
    
  );
};

export default Home;
