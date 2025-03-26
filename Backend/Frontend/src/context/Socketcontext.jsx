import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import io from "socket.io-client"

const Socketcontext=createContext();

// it is a hook
export const useSocketcontext=()=>{
    return useContext(Socketcontext);
}

export const SocketProvider=({children})=>{
    const [socket, setsocket]= useState(null);
    const [authuser]= useAuth();
    const [onlineusers, setonlineusers]=useState([]);

    useEffect(()=>{
        if(authuser){
            const socket=io("http://localhost:4000",{
                query:{
                    userid:authuser.user._id
                },

            }); 
            setsocket(socket);
            socket.on("getonlineusers", (users)=>{
                setonlineusers(users);

            });
            return ()=> socket.close();
        }
        else{
            if(socket){
                socket.close();
                setsocket(null);
            }
        }

    },[authuser]);
    return (
        <Socketcontext.Provider value ={{socket, onlineusers}}>
            {children}

        </Socketcontext.Provider>
    )

}