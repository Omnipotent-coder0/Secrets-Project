import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '../context/AuthenticationContext';


const LoginForm = () => {
    const [flashMessage, setFlashMessage] = useState("");
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthenticationContext);
    const navigate = useNavigate();

    useEffect(() => {
        const getAuthentication = () => {
            if (isAuthenticated) navigate("/private");
        };
        getAuthentication();
    }, [isAuthenticated]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userCredentials = {
            username: e.target.username.value,
            password: e.target.password.value
        }
        try {
            const response = await axios.post("/api/auth/login", userCredentials);
            if (response.status == 200) {
                await setIsAuthenticated(true);
                try {
                    const response = await axios.get("/api/users/secrets");
                    if (response.status == 200) {
                        setSecrets(response.data);
                    }
                    else console.alert("Internal Server Error!");
                } catch (error) {
                    if (error.response.status == 401) setIsAuthenticated(false);
                    console.error(error);
                }
                navigate("/private");
            }
        } catch (error) {
            if (error.response.status === 401) {
                await setIsAuthenticated(false);
                const messages = error.response.data.message;
                const message = messages[messages.length - 1]
                setFlashMessage(message);
                console.error(error);
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
                    <input type="email" name='username' id='username' placeholder='manish@gmail.com' required={true} className='border-2 mb-4' />
                    <br />
                    <label htmlFor="password">Password : </label>
                    <input type="password" name='password' id='password' placeholder='123456' required={true} minLength={3} maxLength={12} className='border-2 mb-4' />
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
                {
                    isAuthenticated ? <h1>isAuthenticated : true</h1> : <h1>isAuthenticated : false</h1>
                }
            </div>
        </div>
    );
}

export default LoginForm;