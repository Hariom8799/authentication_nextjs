const mongoose = require('mongoose');

export async function connect(){
    try{
        await mongoose.connect(process.env.DB_URL).
        then(()=>{
            console.log("DB connected successfully")
        })
        .catch((err : string)=>{
            console.log("DB Connection Eroor")
            console.log(err)
            process.exit(1)
        })
    }
    catch(error){
        console.log("something went wrong in connecting DB");
        console.log(error);
    }
}