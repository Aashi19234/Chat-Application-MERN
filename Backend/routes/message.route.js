import express from "express"
import { getmesssage, sendmessage } from "../controllers/message.controller.js";
import secureRoute from "../middleware/secure_route.js";

const router=express.Router();

router.post("/send/:id", secureRoute, sendmessage);
router.get("/get/:id", secureRoute, getmesssage);


export default router;