import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import CreateNewSecretForm from '../components/CreateNewSecretForm';


const Private = () => {
    const [secrets, setSecrets] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        async function getStatus() {
            try {
                const response = await axios.get("/api/users/secrets");
                if (response.data.secrets) {
                    setSecrets(response.data.secrets);
                }
                else {
                    navigate("/login");
                    console.log("response", response);
                }

            } catch (error) {
                console.log("error", error);
                navigate("/login");
            }
        }
        getStatus();
    }, [secrets])
    return (
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
