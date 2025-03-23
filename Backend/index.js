import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js";
import messageroute from "./routes/message.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { app, server } from "./SocketIO/server.js";


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





server.listen(PORT, () => {
  console.log(`Server Running on on port ${PORT}`)
})