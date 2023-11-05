import React, { useState } from "react";
import AddText from "./AddText";
import Projects from "./Projects";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";

const Dashboard = () => {
    const [tab] = useState("dashboard");
    const [isNew, setIsNew] = useState(true);
    const [isFetching, setIsFetching] = useState(false);

    // const logoutHandler = () => {
    //     localStorage.removeItem('token');
    //     navigate("/");
    // };

  return (
    <div className="bg-slate-200 flex h-screen">
      {/* <!-- /Sidebar --> */}
      <Sidebar />

      <div className="flex w-full flex-col">
        {/* <!-- Navbar --> */}
        <Navbar />
        {/* <!-- /Navbar --> */}

        {/* <!-- Main --> */}
        {isFetching && <p className=" text-red-700 text-center">Hang tight! We are working on your prompt.</p>}
        {tab==="dashboard" && <Projects setIsNew={setIsNew} setIsFetching={setIsFetching} />}
        {/* <!-- /Main --> */}
        {isNew && tab==="dashboard" && <AddText setIsNew={setIsNew.bind(null, null)} />}
        {/* {tab==="profile" && <EmployeeProfile />} */}
        {/* {tab==="jobPostings" && <JobPostings />} */}
      </div>
    </div>
  );
};

export default Dashboard;
