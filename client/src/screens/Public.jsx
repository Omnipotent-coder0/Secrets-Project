import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Card from '../components/Card';
import { useSecrets } from '../context/SecretsContext';

const Public = () => {
    const { secrets, setSecrets } = useSecrets();
    useEffect(() => {
        const getSecrets = async () => {
            const { data } = await axios.get("/api/secrets");
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