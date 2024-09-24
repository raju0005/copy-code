import React, { useState, useEffect } from "react";
import axios from "axios";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import Select from "react-select";

const Content = ({ uniq_id }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(false);

  const [language, setLanguage] = useState({
    value: "javascript",
    label: "JavaScript",
  });

  const languageOptions = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "typescript", label: "TypeScript" },
    { value: "csharp", label: "C#" },
    { value: "ruby", label: "Ruby" },
    { value: "php", label: "PHP" },
  ];

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

  const handleLanguageChange = (selectedOption) => {
    setLanguage(selectedOption);
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
            <div className="flex flex-col items-center gap-3 bg-black rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border-[3px] border-white p-5 w-full md:w-[50%] md:h-[100%]">
              <div className="mb-2 w-full">
                <label className="text-[16px] font-font2 text-yellow-500 mr-3 mb-2">
                  Select Language:
                </label>
                <Select
                  value={languageOptions.find(
                    (option) => option.value === language.value
                  )}
                  onChange={handleLanguageChange}
                  options={languageOptions}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      backgroundColor: "transparent",
                      borderColor:
                        state.isFocused || state.isHovered
                          ? "rgb(250 204 21/1)"
                          : "rgb(250 204 21 / 1)",
                      borderWidth: "2px",
                      borderStyle: "solid",
                      color: "white",
                      boxShadow: "none",
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isSelected
                        ? "rgba(255, 215, 0, 0.8)"
                        : state.isFocused
                        ? "rgba(255, 215, 0, 0.5)"
                        : "rgba(0, 0, 0, 0.6)",
                      color: "white",
                      fontFamily: "Play, sans-serif",
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: "white",
                    }),
                    menu: (provided) => ({
                      ...provided,
                      backgroundColor: "transparent",
                      maxHeight: "250px",
                      overflow: "hidden",
                      borderColor: "yellow",
                    }),
                    menuList: (provided) => ({
                      ...provided,
                      overflowY: "scroll",
                      maxHeight: "250px",
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                      "&::-webkit-scrollbar": {
                        display: "none",
                      },
                    }),
                  }}
                />
              </div>

              <div className="md:max-w-[100%] w-full h-[400px] md:max-h-[100%] mt-3 overflow-auto">
                <h2 className="font-font2 text-yellow-500 text-[16px]">
                  Preview:
                </h2>

                <SyntaxHighlighter language={language.value} style={dracula}>
                  {content}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Content;
