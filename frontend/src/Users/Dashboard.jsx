import React, { useState } from "react";
import AddText from "./AddText";
import Projects from "./Projects";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";
import Profile from "./Profile";
import Learning from "./Learning";

const Dashboard = () => {
    const [tab, setTab] = useState("dashboard");
    const [isNew, setIsNew] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [font_size, setFont_size] = useState(16);
    // const [ideaCount, setIdeaCount] = useState(localStorage.getItem("ideaCount")?localStorage.getItem("ideaCount"):0);
    // console.log(localStorage.getItem("isFetching"), localStorage.getItem("ideaCount"));

    // const logoutHandler = () => {
    //     localStorage.removeItem('token');
    //     navigate("/");
    // };

  return (
    <div className="bg-slate-200 flex h-screen" style={{fontSize: `${font_size}px`}}>
      {/* <!-- /Sidebar --> */}
      <Sidebar setTab={setTab} tab={tab} />

      <div className="flex w-full flex-col">
        {/* <!-- Navbar --> */}
        <Navbar setFont_size={setFont_size} font_size={font_size} />
        {/* <!-- /Navbar --> */}

        {/* <!-- Main --> */}
        {isFetching && <p className=" text-red-700 text-center">Hang tight! We are working on your prompt.</p>}
        {tab==="dashboard" && <Projects isNew={isNew} setIsNew={setIsNew} setIsFetching={setIsFetching} />}
        {/* <!-- /Main --> */}
        {/* {isNew && tab==="dashboard" && <AddText setIsNew={setIsNew} />} */}
        {tab==="profile" && <Profile />}
        {tab==="learnings" && <Learning />}
        {/* {tab==="jobPostings" && <JobPostings />} */}
      </div>
    </div>
  );
};

export default Dashboard;
