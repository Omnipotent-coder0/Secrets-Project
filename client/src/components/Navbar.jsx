import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const getIsAuthenticated = async () => {
            const { data } = await axios.get("/api/auth/status");
            data.user && setIsAuthenticated(true);
        }
        getIsAuthenticated();
    });
    const handleLogOut = async () => {
        try {
            const response = await axios.post("/api/auth/logout");
            if (response.status === 200) {
                navigate("/login");
                setIsAuthenticated(false);
            };
        } catch (error) {
            console.log(error);
            alert(error);
        }
    };
    return (
        <div className='flex p-8 bg-stone-800 text-white font-semibold relative justify-between'>
            <Link className="logo text-2xl " to="/">LOGO</Link>
            <div className='flex gap-10 justify-center items-center text-xl'>
                <Link to="/public">Public</Link>
                <Link to="/private">Private</Link>
            </div>
            <div>
                {
                    isAuthenticated ?
                        <div className="logo text-2xl ">
                            <h1 className='cursor-pointer' onClick={handleLogOut}>Log Out</h1>
                        </div> :
                        null

                }
            </div>

        </div>
    )
}

export default Navbar