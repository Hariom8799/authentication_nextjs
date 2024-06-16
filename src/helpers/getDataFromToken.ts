import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function getDataFromToken (req:NextRequest){
    try{

        const tokenData = req.cookies.get("token")?.value || "";
        const data:any = jwt.verify(tokenData ,process.env.JWT_SECRET!)

        return data.id;

    }
    catch(error:any){
        throw new Error(error.message);
    }
}
