import { connect } from "@/DbConfig/DBConnect";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer"; 
import {NextResponse,NextRequest} from 'next/server'


connect();
export async function POST (req : NextRequest){
    try{
        const reqBody = await req.json();
        const { username, email, password } = reqBody;

        console.log(reqBody);

        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser =  await User.create({
            username,
            password : hashedPassword,
            email
        })

        

        // send vaerification email 
        await sendEmail({email, emailType : "VERIFY" , userID : newUser._id});

        const user = await User.findOne({email});
        console.log(user)

        return NextResponse.json({
            message : "User created successfully",
            newUser,
            success : true

        } , {status : 200})

    }
    catch(err : any){
        console.log("error in signup page")
        console.log(err)
    }
}