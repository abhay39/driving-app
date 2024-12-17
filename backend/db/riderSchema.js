import mongoose from "mongoose";

const RiderSchema=new mongoose.Schema({
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
    },
    aadharcardFrontPic:{
        type:String,
        required:true,
    },
    aadharcardBackPic:{
        type:String,
        required:true,
    },
    pancardFrontPic:{
        type:String,
        required:true,
    },
    pancardBackPic:{
        type:String,
        required:true,
    },
    currentAddress:{
        type:String,
        required:true,
    },
    permanentAddress:{
        type:String,
        required:true,
    },
    vehicleType:{
        type:String,
        required:true,
        enum:['bike','auto','cab']
    },
    vehicleNumber:{
        type:String,
        required:true,
        unique:true
    },
    aadharcardNumber: {
        type: String,
        required: true,
        unique: true,
        minLength: [16, "Aadhar card number should be at least 16 digits long"],
        maxLength: [16, "Aadhar card number should be at most 16 digits long"],
        match: [/^\d{16}$/, "Aadhar card number must only contain 16 digits"], // Ensures it's numeric
    },
    pancardNumber:{
        type:String,
        required:true,
        unique:true,
        minLength:[10,"Pan card number should be atleast 10 characters long"],
        maxLength:[10,"Pan card number should be at most 10 characters long"],
    }
},{timestamps:true});

const Rider=mongoose.model("Rider",RiderSchema);

export default Rider;