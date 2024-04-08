import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import DeleteSecret from './DeleteSecret';
import EditSecret from './EditSecret';
import { SecretsContext, useSecrets } from '../context/SecretsContext';

const Card = (props) => {
    const {item} = props;

    // useEffect(() => {
    // }, [secrets])

    // if (!item) return null;
    return (
        <div className='bg-purple-100 rounded-lg max-w-sm w-full min-h-52 flex flex-col justify-between'>
            <div className='content'>
                <div className='bg-gray-700 p-2 rounded-t-lg text-white'>{item.title}</div>
                <div className='p-4'>{item.description}</div>
            </div>
            {
                props.route == "private" &&
                <div className='flex m-4 justify-end gap-5 font-medium text-sm'>
                    <EditSecret item={item} />
                    <DeleteSecret id={item._id} />
                </div>
            }
        </div>
    )
}

export default Card