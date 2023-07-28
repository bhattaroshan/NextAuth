
import {connect} from '@/app/dbConfig/dbConfig';
import User from '@/app/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';


connect()

export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json();
        console.log(reqBody," is here");
        const {username,password,email} = reqBody;

        console.log("I was successful until this point");
        const user = await User.findOne({email});
        console.log("I went down here");
        if(user){
            return NextResponse.json({error:"User already exists"},{status:400});
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword  
        });

        const savedUser = await newUser.save();
        return NextResponse.json({message:'user created successfully'},{status:200});

    }catch(error:any){
        return NextResponse.json({error: error.message},{status:500})
    }
}