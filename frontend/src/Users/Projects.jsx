import axios from "axios";
import React, { useEffect, useState } from "react";
import AddText from "./AddText";
import Prompt from "./Prompt";
import { useNavigate } from "react-router";

const Projects = ({ isNew, setIsNew, setIsFetching }) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [toggleProject, setToggleProject] = useState("");
  const [showdetails, setShowdetails] = useState(false);
  const [id, setId] = useState("");
  //   const navigate = useNavigate();
  console.log("projects");

  const toggleAddProjectHandler = () => {
    setToggleProject(true);
    setIsNew(true);
  };

  const showProjectHandler = (id) => {
    // navigate("/employee/prompt", {state: {id: id}});
    setShowdetails(true);
    setId(id);
  };

  useEffect(() => {
    let user_id;
    let token;
    if(localStorage.getItem("user")) {
      user_id = JSON.parse(localStorage.getItem("user")).user._id;
      token = JSON.parse(localStorage.getItem("user")).token;
    }
    else {
      navigate("/");
    }

    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/ideas/${user_id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProjects(response.data.history);
        if(response.data.history.length > 0) {
          setToggleProject(false);
          setIsNew(false);
        }
      })
      .catch((error) => {
        console.log("projects", error);
        // alert(error);
      });
  }, [setIsNew, navigate]);

  return !showdetails ? (
    !isNew ? (
      <div className=" overflow-y-auto">
        <div className="p-12">
          <div className="flex flex-row w-full justify-between items-center">
            <h1 className="font-bold text-xl">All projects</h1>
            <button
              className="bg-indigo-600 rounded-md px-4 py-2 text-white"
              onClick={toggleAddProjectHandler}
            >
              New project
            </button>
          </div>
          {/* <div className="flex flex-col items-center mt-10 bg-white h-full shadow-xl gap-2 py-10">
        {projects.map((item, index) => (
          <button key={item.id} onClick={showProjectHandler.bind(null, item.id)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white w-1/2 px-10 py-2">
            {item.name}
          </button>
        ))}
        </div> */}
          {/* Sarthak code */}
          <div className="p-5 overflow-y-auto">
            {/* {/<div className="flex flex-col items-center mt-10 bg-white h-full shadow-xl gap-2 py-10">/} */}
            {projects.map((item, index) => (
              // <div className="p-5 overflow-y-auto">
              <div
                key={index}
                onClick={showProjectHandler.bind(null, item._id)}
                className=" px-4 mx-2 mt-10 flex flex-row justify-between overflow-hidden rounded-lg border py-8 text-gray-700 shadow transition hover:shadow-lg sm:mx-auto bg-white"
              >
                <div className="col-span-11 flex flex-col pr-8 text-left sm:pl-4 flex-[5]">
                  <p
                    className="mb-3 overflow-hidden pr-7 text-lg font-semibold sm:text-xl"
                  >
                    {item.name}
                  </p>
                  <p className="overflow-hidden pr-7 text-sm">{item.description}</p>
                </div>
                <button className="w-30 h-10 bg-indigo-600 text-white px-2 py-2 flex-[1] items-center text-center">Open Plan</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    ) : (
      <AddText setIsNew={setIsNew} setIsFetching={setIsFetching} />
    )
  ) : (
    <Prompt id={id} />
  );
};

export default Projects;
