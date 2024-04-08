import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthenticationContext } from '../context/AuthenticationContext';

const Navbar = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthenticationContext);
    const navigate = useNavigate();
    const handleLogOut = async () => {
        try {
            const response = await axios.post("/api/auth/logout");
            if (response.status === 200) {
                setIsAuthenticated(false);
                navigate("/login");
            };
        } catch (error) {
            if (error.response.status == 401) setIsAuthenticated(false);
            console.error(error);
        }
    };
    return (
        <div className='flex p-8 bg-stone-800 text-white font-semibold relative justify-between'>
            <Link className="logo text-2xl " to="/">LOGO</Link>
            <div className='flex gap-10 justify-center items-center text-xl'>
                <Link to="/public">Public</Link>
                <Link to="/private">Private</Link>
            </div>
            {/* <div>
                {
                    isAuthenticated ? <h1>isAuthenticated : true</h1> : <h1>isAuthenticated : false</h1>
                }
            </div> */}
            <div>
                {
                    isAuthenticated &&
                    <div className="logo text-2xl ">
                        <h1 className='cursor-pointer' onClick={handleLogOut}>Log Out</h1>
                    </div>
                }
            </div>
        </div>
    )
}

export default Navbar