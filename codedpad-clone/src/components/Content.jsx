import React, { useState, useEffect, useContext } from "react";
import { UniqId } from "../App";
import axios from "axios";

const Content = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(false);
  const uniq_id = useContext(UniqId)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://copy-code-server.vercel.app/?uniq_id=${uniq_id}`
        );
        if (response.data && response.data.content) {
          setContent(response.data.content);
        } else {
          setContent("");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      setContent("");
    };
  }, [uniq_id]);

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSave = async () => {
    try {
      await axios.post("https://copy-code-server.vercel.app/", {
        uniq_id,
        content: content,
      });
      setMessage("Your Code is Saved!");
      setTimeout(() => setMessage(""), 1000);
    } catch (error) {
      console.error(error);
    }
  };



  const handleCopy = () => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        setMessage("Your Code is Copied!");
        setTimeout(() => setMessage(""), 1000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <>
      {loading ? (
        <div className="delay-250 animate-spin delay-50 duration-1000 bg-gradient-to-br border-4 shadow-inner shadow-neutral-700 border-neutral-950 from-yellow-800 to-yellow-600 rounded-full grid place-items-center z-0 h-20 w-20 relative">
          <div className="rounded-full bg-neutral-900 absolute rotate-[90deg] z-20 h-20 scale-50 w-2"></div>
          <div className="rounded-full bg-neutral-900 absolute rotate-[180deg] z-20 h-20 scale-50 w-2"></div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 md:gap-4 items-center justify-around w-screen h-screen p-3">
          <h1 className="font-font2 text-[24px] sm:text-[30px] text-center">
            Bro, Save Your Code Here!
          </h1>
          <div className="flex flex-col md:flex-row items-center p-2 justify-center gap-3  w-full md:h-[70vh]">
            <div className="flex flex-col items-center gap-5 bg-black rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border-[3px] border-white p-5 w-full md:w-[50%]  md:h-[100%]">
              <textarea
                value={content}
                onChange={handleChange}
                placeholder="Any text you enter will be saved here"
                className="w-full border-[2px] border-yellow-400 text-white rounded-md bg-black bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 resize-none p-3 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                rows="15"
              ></textarea>
              <div className="flex justify-around gap-2">
                <button
                  onClick={handleCopy}
                  className="flex font-font2 justify-center items-center gap-2 border-[2px] border-yellow-400 px-3 py-1 bg-black bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 rounded-[6px] transition-transform transform text-white hover:scale-105 hover:bg-gradient-to-r from-yellow-500 to-yellow-600"
                >
                  Copy
                  <lord-icon
                    src="https://cdn.lordicon.com/depeqmsz.json"
                    trigger="hover"
                    colors="primary:#ffffff"
                  ></lord-icon>
                </button>

                <button
                  onClick={handleSave}
                  className="flex font-font2 justify-center items-center gap-2 border-[2px] border-yellow-400 px-3 py-1 bg-black bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 rounded-[6px] transition-transform transform text-white hover:scale-105 hover:bg-gradient-to-r from-yellow-500 to-yellow-600"
                >
                  Save
                  <lord-icon
                    src="https://cdn.lordicon.com/jkzgajyr.json"
                    trigger="hover"
                    colors="primary:#ffffff"
                  ></lord-icon>
                </button>
              </div>
              <p className={`font-font2 text-[15px] ${message ? "" : "hidden"}`}>
                Bro, {message}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Content;
