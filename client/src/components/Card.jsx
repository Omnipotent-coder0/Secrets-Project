import axios from 'axios';
import React, { useState } from 'react';
import DeleteSecret from './DeleteSecret';
import EditSecret from './EditSecret';

const Card = (props) => {
    if (!props.item) return null;
    return (
        <div className='bg-purple-100 rounded-lg max-w-sm w-full min-h-52 flex flex-col justify-between'>
            <div className='content'>
                <div className='bg-gray-700 p-2 rounded-t-lg text-white'>{props.item.title}</div>
                <div className='p-4'>{props.item.description}</div>
            </div>
            {
                props.route == "private" &&
                <div className='flex m-4 justify-end gap-5 font-medium text-sm'>
                    <EditSecret item={props.item} />
                    <DeleteSecret id = {props.item._id}/>
                </div>
            }
        </div>
    )
}

export default Card