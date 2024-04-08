import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import CreateNewSecretForm from '../components/CreateNewSecretForm';
import { useAuthentication } from '../context/AuthenticationContext';


const Private = () => {
    const [secrets, setSecrets] = useState([{
        "title": "The Singing Shower Mishap",
        "description": "Belted out my favorite song in the shower only to realize later that the window was wide open and the neighbors heard it all."
    }]);
    const { isAuthenticated } = useAuthentication();
    const navigate = useNavigate();
    
    useEffect(()=>{
        if (!isAuthenticated) navigate("/login");
        const getSecrets = async () => {
            const { data } = await axios.get("/api/users/secrets");
            setSecrets(data);
        }
        getSecrets();
    },[]);

    return (
        // <></>
        <div className='m-6 flex gap-8 flex-wrap'>
            {
                secrets.map((item, index) => (
                    <Card item={item} key={index} route={"private"} />
                ))
            }
            <CreateNewSecretForm />
        </div>
    )
}

export default Private
