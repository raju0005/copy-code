import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-no-background.svg";
const Home = ({ submit }) => {
  const navigate = useNavigate();
  const [uniqId, setUniqId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (uniqId.trim() === "") {
      setErrorMessage("Please enter a username");
      return;
    }
    submit(uniqId);
    navigate("/content");
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col justify-center items-center w-full">
        <div className="mb-20">
          <img className="sm:w-[500px] w-[300px]" src={logo} alt="" />
        </div>
        <div className="flex flex-row items-center">
          <div className="flex justify-center flex-col items-center gap-10 bg-black rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20  border-[3px] border-white w-[400px] h-[300px]">
            <h4 className="text-yellow-500 text-center lowercase font-font2 px-5">
              To Share  Enter New Username or to open shared code Enter Used
              Username
            </h4>
            <div className="flex flex-row justify-center items-center gap-10">
              <input
                placeholder="Username"
                className="border-[2px] py-6 focus:outline-none focus:ring-1 font-font2  focus:ring-yellow-500 focus:border-yellow-500 border-yellow-400 rounded-md bg-black bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 h-[40px] text-center"
                type="text"
                value={uniqId}
                onChange={(e) => {
                  setUniqId(e.target.value);
                  setErrorMessage("");
                }}
              />
              <button
                onClick={handleSubmit}
                className="flex gap-2 font-font2 justify-center items-center tranform transition-transform hover:scale-105 border-[2px] border-yellow-400 px-4 py-[5px] bg-black  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 rounded-[6px]  relative text-white hover:bg-gradient-to-r from-yellow-500 to-yellow-600"
              >
                Go
                <lord-icon
                  src="https://cdn.lordicon.com/lzgmgrnn.json"
                  trigger="hover"
                  colors="primary:#ffffff"
                ></lord-icon>
              </button>
            </div>
            {errorMessage && <p className="text-red-400">{errorMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
