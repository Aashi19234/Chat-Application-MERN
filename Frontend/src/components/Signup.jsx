import React from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';


function Signup() {
    const [authuser,setauthuser]=useAuth();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    // Watch the password and confirm password field
    const password = watch("password", "");
    const confirmpassword = watch("confirmpassword", "");

    const validatePasswordMatch = (value) => {
        return value === password || "Passwords do not match";
    };

    const onSubmit =async (data) => {
        const userinfo = {
            fullname: data.fullname,
            email: data.email,
            password: data.password,
            confirmpassword: data.confirmpassword
        };
       // console.log(userinfo);
       await axios.post("/api/user/signup",userinfo)
       .then((response)=>{
        console.log(response.data);
        if(response.data){
            toast.success("Signup Successful");

        }
        localStorage.setItem("ChatApp",JSON.stringify(response.data));
        setauthuser(response.data); // isme jo registered user hga uska data aaega then this data will
        // go in AuthProvider where this data will be parsed and use in different places
       })
       .catch((error)=>{
        if(error.response){
            toast.error("Error: "+error.response.data.error)
        }
       })
    };

    return (
        <>
            <div className="bg-gray-600 flex h-screen items-center justify-center">
                <form onSubmit={handleSubmit(onSubmit)}
                    className="border border-white px-6 py-4 rounded-md space-y-4 w-96">
                    <h1 className="text-2xl text-center text-white font-semibold">
                        Chat <span className='text-green-500 font-semibold'>App</span>
                    </h1>
                    <h2 className='text-2xl text-white font-bold'>Sign Up</h2>
                    <br />

                    {/* Full Name */}
                    <label className="input input-bordered flex items-center gap-2 bg-gray-600 border-gray-500 hover:border-white cursor-pointer">
                        <input type="text"
                            className="grow text-white"
                            placeholder="Full Name"
                            {...register("fullname", { required: "Full Name is required" })} />
                    </label>
                    {errors.fullname && <span className="text-sm font-semibold text-red-500">{errors.fullname.message}</span>}

                    {/* Email */}
                    <label className="input input-bordered flex items-center gap-2 bg-gray-600 border-gray-500 hover:border-white cursor-pointer">
                        <input type="email"
                            className="grow text-white"
                            placeholder="Email"
                            {...register("email", { required: "Email is required" })} />
                    </label>
                    {errors.email && <span className="text-sm font-semibold text-red-500">{errors.email.message}</span>}

                    {/* Password */}
                    <label className="input input-bordered flex items-center gap-2 bg-gray-600 border-gray-500 hover:border-white cursor-pointer">
                        <input type="password"
                            className="grow text-white"
                            placeholder="Password"
                            {...register("password", { required: "Password is required" })} />
                    </label>
                    {errors.password && <span className="text-sm font-semibold text-red-500">{errors.password.message}</span>}

                    {/* Confirm Password */}
                    <label className="input input-bordered flex items-center gap-2 bg-gray-600 border-gray-500 hover:border-white cursor-pointer">
                        <input type="password"
                            className="grow text-white"
                            placeholder="Confirm Password"
                            {...register("confirmpassword", { 
                                required: "Confirm Password is required",
                                validate: validatePasswordMatch
                            })} />
                    </label>
                    {errors.confirmpassword && <span className="text-sm font-semibold text-red-500">{errors.confirmpassword.message}</span>}

                    {/* Submit and Login Link */}
                    <div className="flex justify-between">
                        <p className="text-white">Have an account? 
                            <Link to="/login" className="text-blue-500 
                            underline cursor-pointer">Login</Link></p>
                        <input type="submit" value="Sign Up" className="text-white bg-green-500 px-4 py-2 cursor-pointer rounded-lg" />
                    </div>
                </form>
            </div>
        </>
    );
}

export default Signup;



