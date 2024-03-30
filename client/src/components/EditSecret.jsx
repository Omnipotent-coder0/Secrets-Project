import * as Dialog from '@radix-ui/react-dialog'
import { Cross1Icon } from '@radix-ui/react-icons'
import axios from 'axios';
import React, { useState } from 'react'

const EditSecret = (props) => {
    const [open, setOpen] = useState(false);

    const handleEdit = async (e) => {
        e.preventDefault();
        const item = {
            title: e.target.title.value,
            description: e.target.description.value,
            visibility: e.target.visibility.value,
        }
        try {
            const response = await axios.put(`/api/users/secrets/${props.item._id}`, item);
            console.log(response.data);
            if (response.status == 200) {
                setOpen(false);
            }
            else console.log("Internal Server Error!");
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger className=' bg-cyan-500 hover:bg-cyan-600 p-2 px-4 font-semibold rounded-md text-white' >Edit</Dialog.Trigger>
            <Dialog.Overlay className='fixed inset-0 bg-black/50' />
            <Dialog.Portal>
                <Dialog.Content className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                    bg-white p-6 rounded-md w-full max-w-md'>

                    <form onSubmit={handleEdit}>
                        <div className='flex justify-between text-xl font-medium mb-4'>
                            <h1>Edit</h1>
                            <Dialog.Close>
                                <Cross1Icon className='text-gray-600 hover:text-gray-700' />
                            </Dialog.Close>
                        </div>
                        <div className='flex flex-col text-lg font-medium'>
                            <label htmlFor="title" >Title</label>
                            <input type="text" id='title' name='title' defaultValue={props.item.title} required className="w-full border-2 border-gray-300 rounded-md mt-1 mb-4" />
                        </div>
                        <div className='flex flex-col text-lg font-medium'>
                            <label htmlFor="description" >Description</label>
                            <textarea rows={4} type="text" id='description' defaultValue={props.item.description} name='description' required className="w-full border-2 border-gray-300 rounded-md mt-1 mb-4" />
                        </div>
                        <div className='space-x-4 text-lg font-medium'>
                            <label htmlFor="visibility">Visibility</label>
                            <select name="visibility" id="visibility" defaultValue={props.item.visibility} className='border-2 border-gray-300 p-2 font-normal rounded'>
                                <option value={false}>Private</option>
                                <option value={true}>Public</option>
                            </select>
                        </div>
                        <div className='text-right space-x-4'>
                            <Dialog.Close className=' bg-red-400 hover:bg-red-500 p-2 px-3 font-semibold rounded-md text-white'>Cancel</Dialog.Close>
                            <button type="submit" className=' bg-green-600 hover:bg-green-800 p-2 px-3 font-semibold rounded-md text-white'>Save</button>
                        </div>
                    </form>


                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default EditSecret