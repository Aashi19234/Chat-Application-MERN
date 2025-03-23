import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


  const createtokenandsavecookie=(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_TOKEN,{
        expiresIn:"10d"
    });
    res.cookie("jwt",token,{
        httpOnly:true, // will protect from xss attack
        secure:true, // for securing
        sameSite:"strict" // protect from csrf attack
    })
    

}

export default createtokenandsavecookie;