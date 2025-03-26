import React, { useEffect, useState } from 'react';
import useconversation from '../zustand/useconversation.js';
import axios from "axios";


const useGetmessage=()=> {
    const [loading, setloading]= useState(false)
    const {messages,setmessages, selectedconversation }= useconversation();
    useEffect(()=>{
        const getmessage=async ()=>{
            
            setloading(true)
            if(selectedconversation && selectedconversation._id){
                try {
                    const response= await axios.
                    get(`/api/message/get/${selectedconversation._id}`)
                    setmessages(response.data);
                    setloading(false);
                    
                    
                } catch (error) {
                    console.log("Error in getting messages", error);
                    setloading(false);
                }
            
            }
        }
        getmessage();


    },[selectedconversation, setmessages]);
    return {loading, messages};
};
export default useGetmessage;
