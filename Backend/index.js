import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js";
import messageroute from "./routes/message.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { app, server } from "./SocketIO/server.js";
import path from "path";


dotenv.config();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
const PORT=process.env.PORT || 4001 ;
const URI=process.env.MONGODB_URI;

try {
    mongoose.connect(URI);
    console.log("Connected to mongoDB");
} catch (error) {
    console.log(error);
}

app.use("/api/user",userRoute);
app.use("/api/message",messageroute);

// code for deployment
if(process.env.NODE_ENV==="production"){
const dirpath=path.resolve();
app.use(express.static("./Frontend/dist"));
app.get("*", (req,res)=>{
  res.sendFile(path.resolve(dirpath, "./Frotend/dist", "index.html"));
  
})
}



server.listen(PORT, () => {
  console.log(`Server Running on on port ${PORT}`)
})