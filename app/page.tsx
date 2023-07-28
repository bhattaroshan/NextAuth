"use client"
import Image from 'next/image'
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {

  const [user,setUser] = useState({
    username: '',
    email: '',
    password: ''
  });

  async function handleLogIn(){
      const response = await fetch('/api/user/login',{
        method: 'POST',
        body: JSON.stringify(user)
      });
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className='border p-2 rounded-md flex flex-col justify-center items-center'>

    
      <p className='p-4 text-lg font-bold'>Sign In</p>
      <div className='grid gap-3'>
        <div className="grid grid-cols-4 gap-2">
          <p className='col-span-1'>Username</p>
          <input type="text" placeholder='username' className="border col-span-3 p-1 rounded-md"
            onChange={(e)=>setUser({...user,username:e.target.value})}/>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <p className='col-span-1'>Email</p>
          <input type="text" placeholder='example@service.com' className="border col-span-3 p-1 rounded-md"
            onChange={(e)=>setUser({...user,email:e.target.value})}/>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <p className='col-span-1'>Password</p>
          <input type="password" placeholder='password' className="border col-span-3 p-1 rounded-md"
            onChange={(e)=>setUser({...user,password:e.target.value})}/>
        </div>
      </div>
      <button className="border p-2 my-2 rounded-md bg-blue-400 hover:bg-blue-300 active:bg-blue-400" onClick={handleLogIn}>Sign In</button>
      </div>
      <Link className=" text-sm text-blue-500 p-4" href="/signup">No Account?</Link>
    </div>
    );
}
