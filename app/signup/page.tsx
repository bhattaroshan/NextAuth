"use client"
import React,{useEffect, useState} from 'react'

function SignUp() {

    const [user,setUser] = useState({
        username: "",
        email: "",
        password: "",
    });

    async function handleSignUp(){
        try{
            // const response = await axios.post("/api/user/signup",user);
            const response = await fetch('api/user/signup', {
                method: 'POST',
                body: JSON.stringify(user),
            });

        }catch(error:any){
            console.log('sign up failed ',error);
        }
    }

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <div className='border p-2 rounded-md flex flex-col justify-center items-center'>
                <p className='text-lg font-bold p-4'>Sign Up</p>
                <div className="grid justify-center items-center gap-3">
                    <div className="grid grid-cols-4 gap-2">
                        <p className='col-span-1'>Username</p>
                        <input placeholder='username' type="text" className="border col-span-3 rounded-md px-1" onChange={(e)=>setUser({...user,username:e.target.value})}/>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        <p className='col-span-1'>Email</p>
                        <input placeholder='example@service.com' type="text" className="border col-span-3 rounded-md px-1" onChange={(e)=>setUser({...user,email:e.target.value})}/>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        <p className='col-span-1'>Password</p>
                        <input placeholder='password' type="password" className="border col-span-3 rounded-md px-1" onChange={(e)=>setUser({...user,password:e.target.value})}/>
                    </div>
                </div>
                <button className="border mt-4 p-2 rounded-md bg-blue-400 hover:bg-blue-300 active:bg-blue-400" onClick={handleSignUp}>SignUp</button>
            </div>
            <p className='text-red-500 text-sm'>*Username already taken</p>
        </div>

    )
}

export default SignUp