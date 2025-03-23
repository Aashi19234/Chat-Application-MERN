import React, { useState } from 'react'
import { IoMdSend } from "react-icons/io";
import useSendmessage from '../../context/usesendmessage.js';

function TypeSend() {
    const [message, setmessage]=useState("");
    const {loading, sendmessage}=useSendmessage(); 
    const handleSubmit=async(e)=>{
        e.preventDefault();
        await sendmessage(message);
        setmessage("");
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className='flex space-x-1 h-[8vh]  bg-gray-800'>
        <div className='w-[70%] mx-4'>
            <input type="text"
             placeholder="Type here" 
             value={message}
             onChange={(e)=> setmessage(e.target.value)}
            className="border border-gray-700 text-white
             rounded-xl outline-none  mt-1 px-4 py-2
            w-full bg-gray-700 " />
        </div>
        <button>
        <IoMdSend className='text-3xl text-white'/>
        </button>
        </div>
        </form>
        

    )
}

export default TypeSend
