import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';


const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [flashMessage, setFlashMessage] = useState("");
    // const flashMessage = "";
    const navigate = useNavigate();
    useEffect(() => {
        const isAuthenticated = async () => {
            const { data } = await axios.get("/api/auth/status");
            if (data.user) navigate("/private");
        }
        isAuthenticated();
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/auth/login", { username, password });
            console.log(response.data);
            navigate("/private");
        } catch (error) {
            if (error.response.status === 401) {
                const messages = error.response.data.message;
                const message = messages[messages.length - 1]
                setFlashMessage(message);
                console.log(message);
                // alert(message);

            }
            else alert('An error occurred. Please try again later.');
        }
    }
    return (
        <div className='flex justify-center items-center mt-40 '>
            <div className=' bg-white border-4 border-gray-600 rounded-3xl p-4'>
                <h1 className='text-3xl font-bold text-center'>Login</h1>
                <form className=' w-max m-4' onSubmit={handleSubmit}>
                    <label htmlFor="username">Email : </label>
                    <input type="email" name='username' id='username' placeholder='manish@gmail.com' required={true} className='border-2 mb-4' onChange={(e) => setUsername(e.target.value)} />
                    <br />
                    <label htmlFor="password">Password : </label>
                    <input type="password" name='password' id='password' placeholder='123456' required={true} minLength={3} maxLength={12} className='border-2 mb-4' onChange={(e) => setPassword(e.target.value)} />
                    <br />
                    <div className='text-center'>
                        <button type="submit" className=' bg-blue-600 hover:bg-blue-800 p-2 px-3 font-semibold rounded-md text-white'>Submit</button>
                    </div>
                    <div className='font-semibold mt-4 text-center'>
                        <h1>Didn't have an account?  <Link className='text-blue-400 hover:text-blue-600 cursor-pointer underline' to="/signup">Sign Up</Link></h1>
                    </div>

                    <div className='h-20 p-3'>
                        {
                            flashMessage &&
                            <div className='flex items-center justify-center m-3 h-14 rounded-lg bg-red-400 text-white font-semibold p-4'>
                                {
                                    flashMessage
                                }
                            </div>
                        }
                    </div>

                </form>
            </div>
        </div>
    )
}

export default LoginForm