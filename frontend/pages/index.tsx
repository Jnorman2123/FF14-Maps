import type { NextPage } from "next";
import { getThanalanMapAttributesState } from "../store/slices/dataStoreSlice";
import { useSelector } from "react-redux";

const Home: NextPage = () => {
  const thanalanMapAttributes = useSelector(getThanalanMapAttributesState)
  return (
    <>
      <ul>
        {Object.keys(thanalanMapAttributes)}
      </ul>
    </>
    
  );
};

export default Home;
