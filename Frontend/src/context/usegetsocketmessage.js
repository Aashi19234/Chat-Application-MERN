import React, { useEffect } from 'react'
import { useSocketcontext } from './Socketcontext'
import useconversation from '../zustand/useconversation.js';

function usegetsocketmessage() {
    const {socket}= useSocketcontext();
    const {messages, setmessages}= useconversation();

    useEffect(()=>{
        socket.on("newmessage", (newmessage)=>{
            setmessages([...messages, newmessage]);
        });
        return ()=>{
            socket.off("newmessage");
        };

    },[socket,messages.setmessages])

    
};

export default usegetsocketmessage;
