import React, { useState } from "react";
import AddText from "./AddText";
import Projects from "./Projects";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";

const Dashboard = () => {
    const [tab, setTab] = useState("dashboard");
    const [isNew, setIsNew] = useState(true);

    // const logoutHandler = () => {
    //     localStorage.removeItem('token');
    //     navigate("/");
    // };

  return (
    <div className="bg-slate-200 flex h-screen">
      {/* <!-- /Sidebar --> */}
      <Sidebar />

      <div className="flex h-full w-full flex-col">
        {/* <!-- Navbar --> */}
        <Navbar />
        {/* <!-- /Navbar --> */}

        {/* <!-- Main --> */}
        {!isNew && tab==="dashboard" && <Projects setIsNew={setIsNew} />}
        {/* <!-- /Main --> */}
        {isNew && tab==="dashboard" && <AddText setIsNew={setIsNew.bind(null, null)} />}
        {/* {tab==="profile" && <EmployeeProfile />} */}
        {/* {tab==="jobPostings" && <JobPostings />} */}
      </div>
    </div>
  );
};

export default Dashboard;
