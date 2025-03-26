import React from 'react'

function Message({message}) {
  const authuser= JSON.parse(localStorage.getItem("ChatApp"));
 const itsme= message.senderid==authuser.user._id;
 // console.log(message.sendid);
  //console.log(authuser.user._id);
  
  const chatname=itsme? "chat-end": "chat-start";
  const chatcolor= itsme? "bg-blue-500":"";
  const createdAt= new Date(message.createdAt);
  const formattedTime= createdAt.toLocaleTimeString([],{
    hour:"2-digit",
    minute:"2-digit"
  })


    return (
        <div>
            <div className='p-4'>
          <div className={`chat ${chatname}`}
          >
  <div className={`chat-bubble text-white  ${chatcolor}`}>{message.message}</div>
  <div className=' text-white chat-footer'>{formattedTime}</div>
</div>

            </div>
        </div>
    )
}

export default Message
