import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Content = ({ uniq_id }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/?uniq_id=${uniq_id}`);
        if (response.data && response.data.content) {
          setContent(response.data.content);
        } else {
          setContent('');
        }
      } catch (error) {
        console.error(error);
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" flex items-center justify-center md:grid md:place-items-center">
  <div className='flex flex-col items-center gap-10 bg-black rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border-[3px] border-white p-10 md:w-[100%] w-[75%]'>
    <div className=''>
      <textarea
        value={content}
        onChange={handleChange}
        className='w-full border-[2px] border-yellow-400 text-white rounded-md bg-black bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 resize-none p-5 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500'
        name=""
        id=""
        cols="70"
        rows="15"
      >
      </textarea>
    </div>
    <button onClick={handleSave} className="flex justify-center items-center gap-3 border-[2px] border-yellow-400 px-4 py-[5px] bg-black bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 rounded-[6px] relative group transition duration-200 text-white hover:px-5 hover:py-[6px] hover:bg-gradient-to-r from-yellow-500 to-yellow-600">
      Save
      <lord-icon
        src="https://cdn.lordicon.com/rbbnmpcf.json"
        trigger="hover"
        colors="primary:#ffffff"
      >
      </lord-icon>
    </button>
  </div>
</div>

  );
};

export default Content;
