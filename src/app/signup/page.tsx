'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import {toast} from 'react-hot-toast'

const page = () => {
    const router = useRouter();
    const [user,setUser] = useState({
        email : "",
        password : "",
        username : ""
    })

    const [disableButton,setDisableButton] = useState(false);
    const [loading,setLoading] = useState(false);
    
    const onSignup = async ()=>{
        try{
            setLoading(true);

            const response = await axios.post("/api/users/signup",user);
            console.log(response.data);
            router.push("/login");
            toast.success("Signup successfull");
        } catch(error : any){
            console.log(error.message);
            toast.error(error.meassage);
        }
    }

    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setDisableButton(false);
        }
        else{
            setDisableButton(true);
        }
    },[user])



  return (
    <div className='flex flex-col justify-center items-center min-h-screen py-2'>
        <h1>{loading ? "Processing...." : "SignUp"}</h1>
        <hr />
        <label htmlFor="usename">Username</label>
        <input
            className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-grey-500 text-black' 
            type="text" 
            id="username"
            value={user.username}
            onChange={(e)=>{setUser({...user, username : e.target.value})}}
            placeholder='username'
        />

<label htmlFor="email">email</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />
        <label htmlFor="password">password</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
        />

            <button
            onClick={onSignup}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{disableButton ? "No signup" : "Signup"}</button>
            <Link href="/login">Login</Link>
        </div>
  )
}

export default page