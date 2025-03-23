import {Server} from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server= http.createServer(app);
const io= new Server(server,{
    cors:{
        origin:"http://localhost:3001",
        methods:["GET", "POST"],
        credentials:true
    }
})

// real-time message code goes here

export const getreceiversocketid=(receiverid)=>{
    return users[receiverid];
};

const users={}

// used to listen events on server side
io.on("connection", (socket)=>{
    console.log(" a user connected", socket.id);
    const userid=socket.handshake.query.userid;
    if(userid){
        users[userid]=socket.id
        console.log("Hello",users);
    }

    // used to send events to all connected clients
    io.emit("getonlineusers", Object.keys(users));

    // used to listen client side events on server side (server and client)
    socket.on("disconnect", ()=>{
        console.log("a user disconnected", socket.id);
        delete users[userid];
        io.emit("getonlineusers", Object.keys(users));
    })

})

export {app,io,server};
