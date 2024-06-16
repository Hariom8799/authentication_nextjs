import { connect } from "@/DbConfig/DBConnect";
import User from "@/models/userModel";
import {NextResponse,NextRequest} from 'next/server'

connect();

export async function POST (req: NextRequest){
    try {

        const reqBody = await req.json();
        const {token} = reqBody;
        
        const user = await User.findOne({verifyUserToken : token, verifyUserExpiry : {$gt : Date.now()}});

        if(!user){
            return NextResponse.json({message : "Invalid token or token expired"},{status : 400})
        }

        console.log(user);
        user.isVerified = true;
        user.verifyUserToken = undefined;
        user.verifyUserExpiry = undefined;
        await user.save();

        return NextResponse.json({message : "Email verified successfully"},{status : 200})
        
    } catch (error : any) {
        return NextResponse.json({error : error.message},{status : 500})
    }
}