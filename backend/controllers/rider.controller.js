import Rider from "../db/riderSchema.js";
import jwt from "jsonwebtoken";
import { transporter } from "./user.controller.js";
import otpgenerator from 'otp-generator';

export const registerRiderAccount = async (req, res) => {
    try {
        const data = req.body;
        // console.log("Data: ",data)

        const checkIfExist = await Rider.findOne({
            email: data.email
        });

        if (checkIfExist) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const otp = otpgenerator.generate(6, {
            upperCase: true,
            specialCharacters: false
        });

        const mailOptions = {
            from: "abhayguptaak39@gmail.com",
            to: `${data.email}`,
            subject: "RideEasy Pay Account Verification - OTP Required",
            html: `
                  <br/>Thank you for registering an account with RideEasy, the leading platform for hassle-free and convenient ride bookings. To ensure the safety and security of your account, we kindly request you to verify your identity by completing the OTP (One-Time Password) verification process.  
      <b>Your OTP is: ${otp}</b>  
      
      <br/>As a valued user, your security is our top priority. The OTP verification process confirms that you are the legitimate owner of the registered email address and phone number. This additional layer of security helps prevent unauthorized access and protects your RideEasy account.  
      
      <br/>To proceed with OTP verification, please follow these steps:  
      
      <br/>1. Log in to your RideEasy account using your registered email address and password.  
      <br/>2. Navigate to the "Account Settings" or "Security Settings" section.  
      <br/>3. Select the "OTP Verification" option and request an OTP.  
      
      <br/>Once you've requested the OTP, you will receive a unique numerical code via SMS or email (depending on your preference). Enter this OTP in the designated field on the RideEasy platform to complete the verification process.  
      
      <br/>We encourage you to complete this verification promptly to unlock the full range of services and features available on RideEasy, including quick ride bookings, seamless payments, and real-time tracking.  
      
      <br/>If you face any issues or have questions, our support team is ready to assist you. Please reach out to our customer service representatives or visit the Help Center at [RideEasy Help Center](#).  
      
      <br/>Your trust and satisfaction are essential to us, and we are committed to making your experience with RideEasy smooth and secure. Thank you for choosing RideEasy as your preferred ride-booking platform.  
      
      <br/><b>Best regards,  
      <br/>Abhay Kumar Gupta  
      <br/>Customer Support Representative  
      <br/>RideEasy</b>
      `
        };

        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
            } else {
                // console.log("Email sent:", info.response);
                const newRider = new Rider({
                    ...data,
                    otp: otp
                });
                const ifCreated = await newRider.save();
                if (ifCreated) {
                    const token = jwt.sign({ id: newRider._id }, process.env.SECRET_KEY, {
                        expiresIn: "15d"
                    });
                    return res.status(201).json({
                        message: "Account created successfully. Kindly verify your account using the otp sent to your email address",
                        token: token
                    });
                }
                res.status(400).json({
                    message: "Failed to create account"
                });
            }
        });


    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}