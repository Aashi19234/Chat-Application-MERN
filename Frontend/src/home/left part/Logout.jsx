import React, { useState } from 'react';
import axios from "axios";
import Cookies from "js-cookie";

import { BiLogOutCircle } from "react-icons/bi";
import toast from 'react-hot-toast';

function Logout() {
    const [loading, setloading]= useState(false);
    const handlelogout=async ()=>{
        setloading(true);
        try {
           const response= await axios.post("/api/user/logout")
            localStorage.removeItem("ChatApp");
            Cookies.remove("jwt");
            setloading(false);
            toast.success("Logged out Successfully");
            window.location.reload();
        } catch (error) {
            toast.error("Error in logout function: ",error)
            
        }
        
    }
    return (
        <div className='h-[10vh] bg-slate-800 '>
            <div>
           <BiLogOutCircle onClick={handlelogout} className='text-5xl text-white
           hover:bg-slate-700 duration-300 cursor-pointer
            rounded-full px-2 py-2 ml-2 mt-1' />
           </div>
        </div>
    )
}

export default Logout
