import axios from "axios";
import React, { useEffect, useState } from "react";

const Prompt = ({ id }) => {
  const [prompt, setPrompt] = useState([]);
  const [position, setPosition] = useState({
    step_number: "",
    positions: [{
        index: "",
        headline: "",
        description: "",
    }],
  });

  const changePositionHandler = (step_number, pos, posIdx) => {
    console.log(step_number, pos,posIdx);
    if(step_number===position.step_number) {
        const removePositions = position.positions.filter((item) => item.index===posIdx);
        if(removePositions.length > 0) {
            const newPositions = position.positions.filter((item) => item.index!==posIdx);
            setPosition((prevState) => ({
                ...prevState,
                positions: newPositions,
            }))
        }
        else {
            const newPosition = {
                index: posIdx,
                headline: pos.position,
                description: pos.description,
            }
            let newPositions = [...position.positions];
            newPositions.push(newPosition);
            setPosition((prevState) => ({
                ...prevState,
                positions: newPositions,
            }));
        }
    }
    else {
        const newPosition = {
            index: posIdx,
            headline: pos.position,
            description: pos.description,
        }
        let newPositions= [];
        newPositions.push(newPosition);
        setPosition({
            step_number: step_number,
            positions: [...newPositions],
        });
    }
  };

  const postJobHandler = (item) => {
    console.log(item);
    if(item.step_number === position.step_number) {
        position.positions.map(async(pos) => {
            let form_data = new FormData();
            form_data.append('headline', pos.headline);
            form_data.append("description", pos.description);

            // for(const x of form_data.entries()) {
            //     console.log(`${x[0]} : ${x[1]}`);
            // }
            await axios.post(`${process.env.SERVER_URL}/employer/create_job`, form_data, {headers: {
                'Authorization': `Token ${localStorage.getItem("token")}`,
            }}).then((response) => {
                alert("Job posted successfully");
            }).catch((error) => {
                alert(`Error posting job, ${error}`);
            });
        })
    }
  };

  useEffect(() => {
    axios
      .get(`${process.env.SERVER_URL}/employer/get_project_details/${id}`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const obj = JSON.parse(JSON.parse(response.data.content));
        // console.log(typeof((obj)));
        console.log(obj.steps);
        setPrompt(obj.steps);
      })
      .catch((error) => {
        alert(error);
      });
  }, [id]);

  return (
    <div className="h-full overflow-hidden pl-10">
      <main
        id="dashboard-main"
        className="h-[calc(100vh-10rem)] overflow-auto px-4 py-10"
      >
        {/* <!-- Put your content inside of the <main/> tag --> */}
        <div className="flex flex-row justify-between w-full">
        <h1 className="text-2xl font-black text-gray-800">Your learning starting roadmap</h1>
        <button className="underline text-blue-600" onClick={() => window.location.reload()}>Go back</button>
        </div>
        <p className="mb-6 text-gray-600">
          Steps to start your roadmap
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-8">
          {/* <div className="h-56 w-72 rounded-xl bg-white p-10 shadow-md"></div>
          <div className="h-56 w-72 rounded-xl bg-white p-10 shadow-md"></div> */}
          {/* <div className="h-56 w-full rounded-xl bg-white p-10 shadow-md"></div> */}
          {/* <div className="h-56 w-full rounded-xl bg-white p-10 shadow-md"></div> */}
          {prompt.map((item, index) => (
            <div key={item.step_number} className="h-fit w-full rounded-xl bg-white p-10 shadow-md flex flex-col gap-4">
              <div className="flex flex-row gap-40">
                <h1 className="w-20 font-bold">Category</h1>
                <p className="font-semibold">{item.category}</p>
              </div>
              <div className="flex flex-row gap-40">
                <h1 className="w-20 font-bold">Tasks</h1>
                <ul>
                  {item.tasks.map((task, index) => (
                    <li key={index}>{task}</li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-row gap-40">
                <h1 className="w-20 font-bold">Positions</h1>
                <div className="flex flex-row justify-between w-full">
                  <div className="flex flex-col gap-2">
                    {item.team_positions.map((pos, index) => (
                      <div key={index}>
                        <div className=" flex flex-row gap-2">
                          <input
                            type="checkbox"
                            id="positions"
                            value={pos.position}
                            name={pos.position}
                            onChange={() => changePositionHandler(item.step_number, pos, index)}
                          />
                          <label htmlFor="positions">
                            <span>{pos.position}</span>
                          </label>
                        </div>
                        <p>
                          <span className="italic text-gray-500">
                            Description:{" "}
                          </span>
                          <span>{pos.description}</span>
                        </p>
                        <div className="flex flex-row">
                          <p className="italic text-gray-500 mr-1">Skills: </p>
                          <ul className="flex flex-row">
                            {pos.required_skills.map((skill, index) => (
                              <li key={index} className="mr-1">{skill}, </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className=" bg-gradient-to-tr from-indigo-600 to-cyan-500 hover:bg-indigo-500 rounded-md px-4 text-white h-10"
                  onClick={postJobHandler.bind(null, item)}>
                    Post
                  </button>
                </div>
              </div>
              <div className="flex flex-row gap-40">
                <h1 className="w-20 font-bold">Resources</h1>
                <div className="flex flex-col gap-2">
                  {item.resources.map((rsr, index) => (
                    <div key={index} className="flex flex-col">
                      <div className="flex flex-row gap-2">
                        <h1 className="w-40">Organization:</h1>
                        <p>{rsr.resource_name}</p>
                      </div>
                      <div className="flex flex-row gap-2">
                        <h1 className="w-40">Website:</h1>
                        <p>{rsr.website}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Prompt;
