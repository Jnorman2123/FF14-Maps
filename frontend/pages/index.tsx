import type { NextPage } from "next";
import { getLegendIconAttributesState } from "../store/slices/dataStoreSlice";
import { useSelector } from "react-redux";

const Home: NextPage = () => {
  const LegendIconAttributes = useSelector(getLegendIconAttributesState)
  return (
    <>
      <ul>
        {Object.keys(LegendIconAttributes)}
      </ul>
    </>
    
  );
};

export default Home;
