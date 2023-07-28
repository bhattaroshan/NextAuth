import {connect} from '@/app/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/app/models/userModel';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();


export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json();
        const {username,password,email} = reqBody;
        const user = await User.findOne({email});
        console.log(user);
        if(!user){
            return NextResponse.json({message:"error login"},{status:400});
        }
        console.log("User login successfull");
        const encryptedPassword = user.password;
        const validPassword = await bcryptjs.compare(password,user.password);

        if(!validPassword){
            console.log("not valid password");
            return NextResponse.json({message:"error password"},{status:400});
        }

        //token data
        const tokenData = {
            id: user._id
        }

        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:'1d'});
        const response = NextResponse.json({
            message: "login successful",
        },{
            status:200
        });
        response.cookies.set("token",token,{
            httpOnly:true
        });
        return response;

    }catch(error:any){
        console.log(error.message);
        return NextResponse.json({message:"error"},{status:400});
    }
}