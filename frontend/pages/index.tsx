import type { NextPage } from "next";
import { getWorldMapAttributesState } from "../store/slices/dataStoreSlice";
import { useSelector } from "react-redux";

const Home: NextPage = () => {
  const worldMapAttributes = useSelector(getWorldMapAttributesState)
  return (
    <>
      <ul>
        {Object.keys(worldMapAttributes)}
      </ul>
    </>
    
  );
};

export default Home;
