import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createtokenandsavecookie from "../jwt/Generatetoken.js"
 
 export const signup= async (req,res)=>{
    try {
        const {fullname,email,password,confirmpassword}=req.body;
        if(password!= confirmpassword){
            return res.status(400).json({error:"Passwords do not match"});
    
        }
        const user= await User.findOne({email})
        if(user){
            return res.status(400).json({error:"User already registered"})
    
        }
        // Hashing the password
        const hashpassword=await bcrypt.hash(password,10)
        const newUser= await new User({
            fullname,
            email,
            password:hashpassword,
        })
       await newUser.save();
       if(newUser){
        createtokenandsavecookie(newUser._id,res);
        res.status(201).json({
            message:"User created successfully",
             user:{
                _id:newUser._id,
                fullname:newUser.fullname,
                email:newUser.email
             }});
       }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"Internal Server error"});


        
    }

}
 
export const login=async(req,res)=>{
    const {email,password}=req.body;
   try {
    
    const user= await User.findOne({email});
    const ismatch= await bcrypt.compare(password,user.password);

    if(!user || !ismatch){
        res.status(400).json({error:"Invalid user credential"});
    }
    createtokenandsavecookie(user._id,res); // token generate hra h login time bhi
    res.status(200).json({message:"User logged in successfully",user:{
        _id:user._id,
        fullname:user.fullname,
        email:user.email
    }});

    
   } catch (error) {
    console.log(error);
    res.status(500).json({error:"Internal Server Error"});
    
   }
}

export const logout=async(req,res)=>{
    try {
        res.clearCookie("jwt");
        res.status(200).json({message:"User logged out successfully"});
        
        
    } catch (error) {
        console.log(error);
    res.status(500).json({error:"Internal Server Error"});
    
    }
}


// get all users

export const allusers = async (req, res) => {
    try {
        const loggedinuser = req.user._id;

        // Fetch all users except the logged-in user
        const filteredusers = await User.find({ _id: { $ne: loggedinuser } }).select("-password");

        if (!filteredusers || filteredusers.length === 0) {
            return res.status(404).json({ message: "No users found." });
        }

        res.status(200).json({ filteredusers }); // ✅ Correct response format
    } catch (error) {
        console.error("Error in fetching all users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
