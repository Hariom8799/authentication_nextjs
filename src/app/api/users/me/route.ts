import { connect } from "@/DbConfig/DBConnect";
import User from "@/models/userModel";
import {NextResponse,NextRequest} from 'next/server'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST (req : NextRequest){
    try{

        const userId = getDataFromToken(req);
        const user = await User.findOne({_id : userId}).select("-password");

        if(!user){
            return NextResponse.json({message: "user not found" , success : false},{status : 400})
        }
        
        return NextResponse.json({
            message : "User found",
            user : user
        },{status : 200})
    }
    catch(error :any){
        return NextResponse.json({
            error : error.message,
            success : false
        }, {status : 500})
    }
}