import React, { useEffect, useRef } from 'react';
import Message from './Message';
import useGetmessage from '../../context/useGetmessage.js';
import Loading from "../../components/Loading.jsx";
import usegetsocketmessage from '../../context/usegetsocketmessage.js';

function Messages() {
  const { loading, messages } = useGetmessage();
  usegetsocketmessage(); // listening incoming messages

  console.log(messages); // Debugging: Ensure messages are fetched

  const lastmsgref= useRef();
  useEffect(()=>{
setTimeout(()=>{
  if(lastmsgref.current){
    lastmsgref.current.scrollIntoView({behaviour:"smooth"});

  }
}, 100)
  },[messages])
  return (
    <div className='flex-1 overflow-y-auto' style={{ minHeight: "calc(92vh - 8vh )" }}>
      {loading ? (
        <Loading />
      ) : (
        messages.length > 0 ? (
          messages.map((message) => (
            <div key={message._id} ref={lastmsgref}>
              <Message  message={message} />
            </div>
            
          ))

        ) : (
          <div>
            <p className='text-center text-white mt-[10%]'>Say! Hi to start the conversation</p>
          </div>
        )
      )}
    </div>
  );
}

export default Messages;

