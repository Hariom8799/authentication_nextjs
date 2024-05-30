import { connect } from "@/DbConfig/DBConnect";
import {NextResponse,NextRequest} from 'next/server'

connect();

export async function POST (req : NextRequest){
    try {

        const response = NextResponse.json({message : "Logout successfull" , success : true},{status : 200});

        response.cookies.set("token" , "",{
            httpOnly : true,
            expires : new Date(0)
        })

        return response;
        
    } catch (error:any) {
        return NextResponse.json({error : error.message},{status : 500})
    }

}