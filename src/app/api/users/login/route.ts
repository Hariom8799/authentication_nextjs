import { connect } from "@/DbConfig/DBConnect";
import User from "@/models/userModel";
import {NextResponse,NextRequest} from 'next/server'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export async function POST (req : NextRequest){
    try {

        const {email,password} = await req.json();

        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({message : "user does not exist"},{status : 400})
        }

        const isPasswordMatch = await bcrypt.compare(password,user.password);

        if(!isPasswordMatch){
            return NextResponse.json({message : "Invalid credentials"},{status : 400})
        }

        const tokenData = {
            id : user._id,
            email : user.email,
            usename : user.username
        }

        const token = jwt.sign(tokenData,process.env.JWT_SECRET!, {expiresIn : '1d'});

        const response = NextResponse.json({message : "Login successfull"},{status : 200});

        response.cookies.set("token",token,{
            httpOnly : true,
        })

        return response;

    } catch (error:any) {
        return NextResponse.json({error : error.message},{status : 500})
    }

}