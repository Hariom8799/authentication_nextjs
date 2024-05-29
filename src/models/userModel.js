const mongoose = require('mongoose');
const { type } = require('os');

const userSchema = new mongoose.Schema({
    username :{
        type : String,
        required : [true,"pls enter username"],
        unique : true
    },
    password :{
        type : String,
        required : [true,"pls enter password"]
    },
    email : {
        type : String,
        required : [true,"pls enter email"],
        unique : true
    },
    isVerified : {
        type: Boolean,
        default : false
    },
    isAdmin:{
        type : Boolean,
        default : false
    },
    forgotPasswordToken :String,
    forgotPasswordExpiry : Date,
    verifyUserToken : String,
    verifyUserExpiry : Date
})

const User = mongoose.models.users || mongoose.model("users",userSchema);

export default User;