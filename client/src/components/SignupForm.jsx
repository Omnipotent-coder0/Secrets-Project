import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const SignupForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/auth/signup", { username: username, password: password, displayName: displayName });
            if (response.status === 201) {
                setIsRegistered(true);
                setTimeout(() => {
                    navigate("/login");
                }, 10000);
            }
        } catch (error) {
            if (error.response.status === 401) console.log(error.response);
            else alert('An error occurred. Please try again later.');
        }
    }
    return (

        <div>
            {
                isRegistered ?
                    <div className=' text-3xl bg-green-400 text-white font-semibold p-3 text-center'>
                        <h1>You are successfully registered, You will be redirected to the login page</h1>
                    </div> :
                    <div className='flex justify-center items-center mt-40 '>
                        <div className=' bg-white border-4 border-gray-600 rounded-3xl p-4'>
                            <h1 className='text-3xl font-bold text-center'>Sign up</h1>
                            <form className=' w-max m-4' onSubmit={handleSubmit}>
                                <label htmlFor="username">Email : </label>
                                <input type="email" name='username' id='username' placeholder='manish@gmail.com' required={true} className='border-2 mb-4' onChange={(e) => setUsername(e.target.value)} />
                                <br />
                                <label htmlFor="password">Password : </label>
                                <input type="password" name='password' id='password' placeholder='123456' minLength={3} className='border-2 mb-4' onChange={(e) => setPassword(e.target.value)} />
                                <br />
                                <label htmlFor="displayName">Display Name : </label>
                                <input type="text" id='displayName' name='displayName' placeholder='Manish Kumar' minLength={2} maxLength={15} className='border-2 mb-4' onChange={(e) => setDisplayName(e.target.value)} />
                                <div className='text-center'>
                                    <button type="submit" className=' bg-blue-600 hover:bg-blue-800 p-2 px-3 font-semibold rounded-md text-white'>Submit</button>
                                </div>
                                <div className='font-semibold mt-4 text-center'>
                                    <h1>Already have an account?  <Link className='text-blue-400 hover:text-blue-600 cursor-pointer underline' to="/login">Log In</Link></h1>
                                </div>
                            </form>
                        </div>
                    </div>
            }
        </div>



    )
}

export default SignupForm