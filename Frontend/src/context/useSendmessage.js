import React , {useState} from 'react';
import useconversation from '../zustand/useconversation.js';
import axios from "axios";


function useSendmessage() {
    const [loading, setloading]= useState(false)
    const {messages,setmessages, selectedconversation }= useconversation();
    const sendmessage=async (message)=>{

            
        setloading(true)
        
            try {
                const response= await axios.
                post(`/api/message/send/${selectedconversation._id}`,
                    {message});
                setmessages([...messages, response.data.newmessage]);
                setloading(false);
                
                
            } catch (error) {
                console.log("Error in sending messages", error);
                setloading(false);
            
        
        }

    };
    return {loading, sendmessage};

};

export default useSendmessage;

