'use client';
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';


const Page = () => {

    const router = useRouter();
    const [data,setData] = useState("Nothing")

    const getUserDetails = async ()=>{
        const res = await axios.post("api/users/me");
        console.log(res.data.user);
        setData(res.data.user._id);
    }

    const logout = async ()=>{
        try{
            await axios.get("/api/users/logout");
            toast.success("Logged out");
            router.push("/login"); 
        }
        catch(error : any){
            console.log(error.message);
            toast.error(error.message);
        }
    }

  return (
    <div className='flex flex-col justify-center items-center min-h-screen py-2 '>
        <h1>Profile Page</h1>
        <hr />
        <h2>{data === "Nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
        <hr />

        <button onClick={getUserDetails} className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
            getUserDetails
        </button>
        <button onClick={logout} className = "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Logout
        </button>

    </div>
  )
}

export default Page