import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm.jsx';
import SignupForm from './components/SignupForm.jsx';
import Navbar from './components/Navbar.jsx';
import axios from 'axios';
import Public from './screens/Public.jsx';
import Private from './screens/Private.jsx';
axios.defaults.baseURL = "http://localhost:3000/";
axios.defaults.withCredentials = true;

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Public />} />
          <Route path='/public' element={<Public />} />
          <Route path='/private' element={<Private />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/signup' element={<SignupForm />} />
        </Routes>
      </Router>
      {/* <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1> */}
    </>
  )
}

export default App
