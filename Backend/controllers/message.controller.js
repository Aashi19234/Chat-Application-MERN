import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getreceiversocketid } from "../SocketIO/server.js";

export const sendmessage=async(req , res)=>{
   // console.log("Message sent");
   try {
    const {message}=req.body;
    const {id: receiverid}=req.params; // receiver id
    const senderid=req.user._id; // current logged in user
    let conversation=await Conversation.findOne({
        members:{$all: [senderid, receiverid]}
    })
    if(!conversation){
        conversation=await Conversation.create({
            members:[senderid,receiverid],
        });
    }
    const newmessage= new Message({
        senderid,
        receiverid,
        message
    })
    if(newmessage){
        conversation.messages.push(newmessage._id);
    }
   // await conversation.save()
   // await newmessage.save()
   // We will not use this we will at once save both

   await Promise.all([conversation.save(), newmessage.save()]);
   // it will run parallely
   const receiversocketid= getreceiversocketid(receiverid);
   if(receiversocketid){
    io.to(receiversocketid).emit("newmessage", newmessage);
    
   }
   res.status(201).json({
    message: "Message send successfully",
    newmessage
   })


    
   } catch (error) {
    console.log("Error in send message", error);
    res.status(500).json({error:"Internal Server Error"});

   }
};

export const getmesssage=async(req,res)=>{
try {
    const {id: chatuser}=req.params; // receiver id
    const senderid=req.user._id; // current logged in user
    let conversation= await Conversation.findOne({
        members:{$all:[senderid, chatuser]},
    }).populate("messages");
    if(!conversation){
        return res.status(201).json([]);
    }
    const messages=conversation.messages;
    res.status(201).json(messages);
    
} catch (error) {
    console.log("Error in get message", error);
    res.status(500).json({error:"Internal Server Error"});

    
}
}