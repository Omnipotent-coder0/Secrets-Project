import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Dialog from "@radix-ui/react-dialog";
import axios from 'axios';
import { FaPlus } from 'react-icons/fa6';
import { Cross1Icon } from '@radix-ui/react-icons';

const CreateNewSecretForm = () => {
    const [open, setOpen] = useState(false);
    const handleCreate = async (e) => {
        e.preventDefault()
        const {
            title,
            description,
            visibility
        } = e.target;
        try {
            const response = await axios.post("/api/users/secrets", {
                title: title.value,
                description: description.value,
                visibility: visibility.value
            });
            if (response.status == 201) {
                console.log("Secret Created");
                const newSecret = response.data;
                setOpen(false);
            }
            else console.log("Internal Sever Error!");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <Dialog.Root open={open} onOpenChange={setOpen}>
                <Dialog.Trigger className='bg-white/50 text-rose-600 cursor-pointer rounded-md 
                max-w-sm w-full min-h-52 flex justify-center items-center text-8xl hover:bg-white/60'>
                    <FaPlus className='text-black/50' />
                </Dialog.Trigger>

                <Dialog.Overlay className='fixed inset-0 bg-black/50' />

                <Dialog.Portal>
                    <Dialog.Content className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                    bg-white p-6 rounded-md w-full max-w-md'>
                        <form onSubmit={handleCreate}>
                            <div className='flex justify-between text-xl font-medium mb-4'>
                                <h1>Create New</h1>
                                <Dialog.Close>
                                    <Cross1Icon className='text-gray-600 hover:text-gray-700' />
                                </Dialog.Close>
                            </div>
                            <div className='flex flex-col text-lg font-medium'>
                                <label htmlFor="title" >Title</label>
                                <input type="text" id='title' name='title' required className="w-full border-2 border-gray-300 rounded-md mt-1 mb-4" />
                            </div>
                            <div className='flex flex-col text-lg font-medium'>
                                <label htmlFor="description" >Description</label>
                                <textarea rows={4} type="text" id='description' name='description' required className="w-full border-2 border-gray-300 rounded-md mt-1 mb-4" />
                            </div>
                            <div className='space-x-4 text-lg font-medium'>
                                <label htmlFor="visibility">Visibility</label>
                                <select name="visibility" id="visibility" className='border-2 border-gray-300 p-2 font-normal rounded'>
                                    <option value={false}>Private</option>
                                    <option value={true}>Public</option>
                                </select>
                            </div>
                            <div className='text-right space-x-4'>
                                <Dialog.Close className=' bg-red-400 hover:bg-red-500 p-2 px-3 font-semibold rounded-md text-white'>Cancel</Dialog.Close>
                                <button type="submit" className=' bg-green-600 hover:bg-green-800 p-2 px-3 font-semibold rounded-md text-white'>Create</button>
                            </div>
                        </form>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </>
    )
}

export default CreateNewSecretForm