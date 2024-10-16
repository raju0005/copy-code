import { useState } from 'react'
import {createContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Content from './components/Content'

export  const UniqId = createContext()

function App() {
  const [data, setData] = useState('');
  const [uniq_id, setuniq_id] = useState('');

  const handleSubmit = async (uniq_id) => {
    try {
      setuniq_id(uniq_id);
    } catch (error) {
      console.error(error);
    }
  };

 

  return (
    <div>
     <UniqId.Provider value={uniq_id}>
      <Router>
        <Routes>
          <Route path="/" element={<Home submit={handleSubmit} />} />
          <Route path="/content" element={<Content />} />
        </Routes>
      </Router>
      </UniqId.Provider>
    </div>
  )
}

export default App
