import React, { createContext, useContext, useState } from 'react'
import Cookies from "js-cookie"
export const AuthContext=createContext();

export const AuthProvider=({children})=> {
    const initialuserstate=Cookies.get("jwt") ||
     localStorage.getItem("ChatApp");

    // we will take user info which is present in local storage
    // and token is present in cookies 

    // parse the user data and storing in state
    const [authuser, setauthuser]=useState(initialuserstate ? JSON.parse(initialuserstate): undefined);

    
    return (
       <AuthContext.Provider value={[authuser,setauthuser]}>
        {children}

       </AuthContext.Provider>
    )
}

export const useAuth=()=> useContext(AuthContext);
