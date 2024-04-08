import React, { useContext, useState } from 'react';
import * as Dialog from "@radix-ui/react-dialog";
import axios from 'axios';
import { SecretsContext } from '../context/SecretsContext';
import { AuthenticationContext } from '../context/AuthenticationContext';

const DeleteSecret = ({ id }) => {
    const [open, setOpen] = useState(false);
    const { setIsAuthenticated } = useContext(AuthenticationContext);


    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`/api/users/secrets/${id}`);
            if (response.status == 200) {
                setOpen(false);
                window.location.reload();
            }
            else console.alert("Internal server Error");
        } catch (error) {
            if (error.response.status == 401) setIsAuthenticated(false);
            console.error(error);
            setOpen(false);
        }
    }

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger className=' bg-red-500 hover:bg-red-600 p-2 px-3 font-semibold rounded-md text-white'>Delete</Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className='fixed inset-0 bg-black/50' />
                <Dialog.Content className='bg-white p-5 rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <div className='space-y-6'>
                        <h1 className='text-xl font-semibold'>
                            Are you sure you want to delete this Secret ?
                        </h1>
                        <div className='space-x-4 text-right'>
                            <Dialog.Close className='text-gray-500  hover:text-gray-600 p-2 px-3 font-semibold rounded-md'>Cancel</Dialog.Close>
                            <button onClick={handleDelete} className=' bg-red-500 hover:bg-red-600 p-2 px-3 font-semibold rounded-md text-white'>Delete</button>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default DeleteSecret