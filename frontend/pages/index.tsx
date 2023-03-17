import type { NextPage } from "next";
import { useGetJobsQuery } from "@/store/services/helperquest";

const Home: NextPage = () => {
  const jobsArray = useGetJobsQuery('jobs');
  console.log(jobsArray.data)
  
  return (
      <ul>
        {jobsArray.data.map((c: any) => {
          return <li key={c.job_name} >{c.job_name}</li>
        })}
      </ul>
  );
};

export default Home;
