import type { NextPage } from "next";
import { getLaNosceaMapAttributesState } from "../store/slices/dataStoreSlice";
import { useSelector } from "react-redux";

const Home: NextPage = () => {
  const laNosceaMapAttributes = useSelector(getLaNosceaMapAttributesState)
  return (
    <>
      <ul>
        {Object.keys(laNosceaMapAttributes)}
      </ul>
    </>
    
  );
};

export default Home;
