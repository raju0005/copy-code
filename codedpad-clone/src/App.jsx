import { useState } from 'react'
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom'
import axios from 'axios'; // Add this import

import Home from './components/Home'
import Content from './components/Content'

function App() {
  const [data, setData] = useState('');
  const [uniq_id, setuniq_id] = useState('');

  const handleSubmit = async (uniq_id) => {
    try {
      const response = await axios.get(`https://copy-code-server.vercel.app/?uniq_id=${uniq_id}`);      
      setuniq_id(uniq_id);
      if (response.data && response.data.content) {
        setData(response.data.content);
      } else {
        setData('');
      }
      console.log(response.data)
      
    
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home submit={handleSubmit} />} />
          <Route path="/content" element={<Content uniq_id={uniq_id} />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
