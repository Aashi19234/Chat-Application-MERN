import React from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";  // ✅ Import js-cookie
import { useAuth } from '../context/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Login() {
  const [authuser, setauthuser] = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();  

  const onSubmit = (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    axios
      .post("/api/user/login", userInfo)
      .then((response) => {
        if (response.data) {
          toast.success("Login successful");

          // ✅ Store JWT token in cookies (valid for 7 days)
          Cookies.set("jwt", response.data.token, { expires: 7 });

          console.log("Token stored in cookies:", Cookies.get("jwt")); // Debugging

          // ✅ Store user in localStorage
          localStorage.setItem("ChatApp", JSON.stringify(response.data));

          setauthuser(response.data);

          // ✅ Redirect after login
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        if(error.response){
       toast.error("Error:" + error.response.data.error);
        }
      });
  };

  return (
    <div className="bg-gray-600 flex h-screen items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)}
        className="border border-white px-6 py-2 rounded-md space-y-2 w-96">
        <h1 className="text-2xl text-center text-white font-semibold">
          Chat <span className='text-green-500 font-semibold'>App</span>
        </h1>
        <h2 className='text-2xl text-white font-bold'>Login</h2>
        <br />

        {/* Email */}
        <label className="input input-bordered flex items-center gap-2 bg-gray-600 border-gray-500 hover:border-white cursor-pointer">
          <input type="email" className="grow text-white" placeholder="Email"
            {...register("email", { required: "Email is required" })} />
        </label>
        {errors.email && <span className="text-sm font-semibold text-red-500">{errors.email.message}</span>}

        {/* Password */}
        <label className="input input-bordered flex items-center gap-2 bg-gray-600 border-gray-500 hover:border-white cursor-pointer">
          <input type="password" className="grow text-white" placeholder="Password"
            {...register("password", { required: "Password is required" })} />
        </label>
        {errors.password && <span className="text-sm font-semibold text-red-500">{errors.password.message}</span>}

        {/* Text and Button */}
        <div className="flex justify-between">
          <p className="text-white">
            New User? <Link to="/signup" className="text-blue-500 underline cursor-pointer">SignUp</Link>
          </p>
          <input type="submit" value="Login" className="text-white bg-green-500 px-2 py-1 cursor-pointer rounded-lg" />
        </div>
      </form>
    </div>
  );
}

export default Login;

