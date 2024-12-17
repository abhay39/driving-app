import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3,"First name should be atleast 3 characters"],
        required:true,
    },
    lastName:{
        type:String,
        required:true,
        minLength:[3,"Last name should be atleast 3 characters"],
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:[/\S+@\S+\.\S+/, "Please enter a valid email address"],
    },
    otp:{
        type:String,
        required:true,
        maxLength:[6, "OTP should be atleast 6 characters"]
    },
    contactNumber:{
        type:Number,
        required:true,
        unique:true,
        minLength:[10,"Contact number should be at least 10 digits long"],
        maxLength:[10,"Contact number should be at most 10 digits long"],
    },
    isVerified:{
        type:Boolean,
        default:false,
    }
},{timestamps:true});

const User=mongoose.model("User",UserSchema);

export default User;