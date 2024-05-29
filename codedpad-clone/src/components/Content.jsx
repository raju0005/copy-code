import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Content = ({ uniq_id }) => {
  const [content, setContent] = useState('');
  const [loading, setloading] = useState(true)
  const [save, setsave] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://copy-code-server.vercel.app/?uniq_id=${uniq_id}`);
        if (response.data && response.data.content) {
          setContent(response.data.content);
        } else {
          setContent('');
        }
      } catch (error) {
        console.error(error);
      }
      finally {
        setloading(false);
      }
    };

    fetchData();


    return () => {
      setContent('');
    };
  }, [uniq_id]);

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSave = async () => {
    try {
      await axios.post('https://copy-code-server.vercel.app/', { uniq_id, content: content });
      setsave(true)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {loading ? (<div
        className=" delay-250 animate-spin delay-50 duration-1000 bg-gradient-to-br border-4 shadow-inner shadow-neutral-700 border-neutral-950 from-yellow-800 to-yellow-600 rounded-full grid place-items-center z-0 h-20 w-20 relative"
      >
        <div
          className="rounded-full bg-neutral-900 absolute rotate-[90deg] z-20 h-20 scale-50 w-2"
        ></div>
        <div
          className="rounded-full bg-neutral-900 absolute rotate-[180deg] z-20 h-20 scale-50 w-2"
        ></div>
      </div>) : (
        <div className=" flex flex-col gap-3 items-center justify-center sm:grid sm:place-items-center ">
          <h1 className='font-font2 text-[30px] sm:text-[40px]'>Bro ,Save Your Code Here !</h1>
        <div className='flex flex-col items-center gap-10 bg-black rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border-[3px] border-white p-10 sm:w-[100%] w-[95%]'>
          <div className=''>
            <textarea
              value={content}
              onChange={handleChange}
              placeholder="Any text you enter will be saved here"
              className='w-full border-[2px] border-yellow-400 text-white rounded-md bg-black bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 resize-none p-5 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500'
              name=""
              id=""
              cols="70"
              rows="15"
            >
            </textarea>
          </div>
          <button onClick={handleSave} className="flex font-font2 justify-center items-center gap-3 border-[2px] border-yellow-400 px-4 py-[5px] bg-black bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 rounded-[6px] relative group transition duration-200 text-white hover:px-5 hover:py-[6px] hover:bg-gradient-to-r from-yellow-500 to-yellow-600">
            Save
            <lord-icon
              src="https://cdn.lordicon.com/rbbnmpcf.json"
              trigger="hover"
              colors="primary:#ffffff"
            >
            </lord-icon>
          </button>
          <p className={`${!save ? 'hidden' :''} font-font2` }> Bro,Your Code is Saved  !</p>
        </div>
        </div>
        )}
    
    </>

  );
};

export default Content;
