import express from "express";
import { allusers, login, logout, signup } from "../controllers/user.controller.js";
import secureroute from "../middleware/secure_route.js";

const router=express.Router()
router.post("/signup", signup) // we want to post data in database thats why post req
router.post("/login",login);
router.post("/logout",logout);
router.get("/allusers",secureroute, allusers);

export default router