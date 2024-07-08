'use client';
import React, { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const Page = () => {

    const [token, setToken] = useState(" ");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const searchParams = useSearchParams(); 

    

    useEffect(()=>{
        setError(false)
        // const urlToken : any = window.location.search.split('=')[1];
        const urlToken:any = searchParams.get('token')
        setToken(urlToken || "");
    },[searchParams])

    useEffect(()=>{
        setError(false)
        if(token.length > 0){
            const verifyEmail = async ()=>{
                try{
                    await axios.post("/api/users/verifyemail",{token});
                    setVerified(true);
                    setError(false)
                }
                catch(error : any){
                    setError(true);
                    console.log(error.response.data);
                }   
            }
            verifyEmail();
        }
    },[token])
    
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>

            {verified && (
                <div>
                    <h2 className="text-2xl">Email Verified</h2>
                    <Link href="/login">
                        Login
                    </Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                    
                </div>
            )}
        </div>
  )
}

export default Page