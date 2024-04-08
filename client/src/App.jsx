import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm.jsx';
import SignupForm from './components/SignupForm.jsx';
import Navbar from './components/Navbar.jsx';
import axios from 'axios';
import Public from './screens/Public.jsx';
import Private from './screens/Private.jsx';
import SecretsProvider from './context/SecretsContext.jsx';
axios.defaults.baseURL = import.meta.env.VITE_SERVER_BASE_URL;
axios.defaults.withCredentials = true;
export const isAuthenticated = false;

function App() {
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
