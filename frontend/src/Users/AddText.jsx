import axios from "axios";
import React, { useState } from "react";
import { TbSquareRoundedArrowRightFilled } from "react-icons/tb";

const AddText = ({ setIsNew }) => {
  const [formData, setFormData] = useState({
    businessName: "",
    prompt: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const form_data = new FormData();
    form_data.append("name", formData.businessName);
    form_data.append("idea", formData.prompt);

    setIsLoading(true);
    axios
      .post(`${process.env.SERVER_URL}/employer/create_project`, form_data, {
        timeout: 500000,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setIsNew(false);
        window.location.reload();
      })
      .catch((error) => {
        alert(error);
      });
  };

  return !isLoading ? (
    <form className="pl-12 py-10">
      <h1 className="text-4xl">
        <strong>Let's get started</strong>
      </h1>
      <label
        htmlFor="business_name"
        className="mt-4 block text-lg text-gray-500 mb-2"
      >
        Business Name
      </label>
      <input
        type="text"
        id="businessName"
        name="businessName"
        value={formData.businessName}
        placeholder="Enter your business name"
        className="focus:outline-blue-400 break-words rounded-md px-4 py-2 text-base w-3/4"
        onChange={inputChangeHandler}
      />
      <label htmlFor="prompt" className="mt-4 block text-lg text-gray-500 mb-2">
        Enter a prompt
      </label>
      <div className="flex flex-row items-end">
        <textarea
          type="textarea"
          id="prompt"
          name="prompt"
          value={formData.prompt}
          placeholder="Enter your prompt..."
          className=" focus:outline-blue-400 break-words rounded-md px-4 py-2 text-base w-3/4 h-96"
          onChange={inputChangeHandler}
        />
        <button type="submit" onClick={formSubmitHandler}>
          <TbSquareRoundedArrowRightFilled size={35} />
        </button>
      </div>
    </form>
  ) : (
    <div className="">
      <h1>
        <strong>Thank you for your submission!</strong>
      </h1>
      <p>We will get back to you shortly.</p>
      {/* <p>Refresh the page to view all your projects.</p> */}
    </div>
  );
};

export default AddText;
