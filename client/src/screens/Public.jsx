import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Card from '../components/Card';

const Public = () => {
    const [secrets, setSecrets] = useState([{
        "title": "The Singing Shower Mishap",
        "description": "Belted out my favorite song in the shower only to realize later that the window was wide open and the neighbors heard it all."
    }]);
    useEffect(() => {
        const getSecrets = async () => {
            const {data} = await axios.get("/api/secrets");
            setSecrets(data);
        }
        getSecrets();
    }, [])
    return (
        <div className='m-4 flex gap-4 flex-wrap'>
            {
                secrets.map((item,index)=>(
                    <Card item = {item} key={index} route = {"public"}/>
                ))
            }
        </div>
    )
}

export default Public