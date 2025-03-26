import React, { useEffect } from 'react'
import ChatUser from './ChatUser'
import Messages from './Messages'
import TypeSend from './TypeSend'
import useconversation from '../../zustand/useconversation.js'
import { useAuth } from '../../context/AuthProvider.jsx'
import { CiMenuFries } from "react-icons/ci";

function Right() {
    const { selectedconversation, setselectedconversation } = useconversation();

    useEffect(() => {
        return setselectedconversation(null);
    }, [setselectedconversation]);

    return (
        <div className='w-full h-screen bg-slate-900'>
            {!selectedconversation ? <Nochatselected /> : (
                <>
                    <ChatUser />
                    <div className='flex-1 overflow-y-auto' style={{ maxHeight: "calc(92vh - 8vh)" }}>
                        <Messages />
                    </div>
                    <TypeSend />
                </>
            )}
        </div>
    );
}

export default Right;

const Nochatselected = () => {
    const [authuser] = useAuth();
    console.log(authuser);
    return (
      <>
        <div className="relative">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-ghost drawer-button lg:hidden absolute left-5"
          >
            <CiMenuFries className="text-white text-xl" />
          </label>
          <div className="flex h-screen items-center justify-center">
            <h1 className="text-center text-white ">
              Welcome{" "}
              <span className="font-semibold text-xl">
                {authuser.user.fullname}
              </span>
              <br />
              No chat selected, please start conversation by selecting anyone to
              your contacts
            </h1>
          </div>
        </div>
      </>
    );
};


