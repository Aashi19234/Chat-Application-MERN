import React from 'react';
import useconversation from '../../zustand/useconversation.js';
import { useSocketcontext } from '../../context/Socketcontext.jsx';
import { CiMenuFries } from "react-icons/ci";

function ChatUser() {
  const { selectedconversation } = useconversation();

  const {onlineusers}= useSocketcontext();
  const getonlineusersstatus=(userid)=>{
    return onlineusers.includes(userid)? "Online":"Offline";
  }

  console.log("Selected Conversation:", selectedconversation); // Debugging log

  return (
    <div className="relative flex items-center h-[8%] justify-center gap-4 bg-slate-800 hover:bg-slate-700 duration-300 rounded-md">
      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden absolute left-5"
      >
        <CiMenuFries className="text-white text-xl" />
      </label>
    <div className='flex space-x-3 items-center justify-center h-[8vh] bg-gray-800 hover:bg-gray-700 duration-300'>
      <div className="avatar online">
        <div className="w-12 rounded-full mt-1">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <div>
        {selectedconversation && <h1 className='text-xl text-white'>{selectedconversation.fullname}</h1>}
        <span className='text-sm text-white'>{getonlineusersstatus(selectedconversation._id)}</span>
      </div>
    </div>
    </div>
  );
}

export default ChatUser;


