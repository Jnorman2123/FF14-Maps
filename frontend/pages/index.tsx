import type { NextPage } from "next";
import { getTheBlackShroudMapAttributesState } from "../store/slices/dataStoreSlice";
import { useSelector } from "react-redux";

const Home: NextPage = () => {
  const theBlackShroudMapAttributes = useSelector(getTheBlackShroudMapAttributesState)
  return (
    <>
      <ul>
        {Object.keys(theBlackShroudMapAttributes)}
      </ul>
    </>
    
  );
};

export default Home;
