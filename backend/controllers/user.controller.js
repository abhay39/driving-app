import User from "../db/userSchema.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import otpgenerator from 'otp-generator';


export const transporter = nodemailer.createTransport({
  host: "gmail",
  auth: {
    user: "abhayguptaak39@gmail.com",
    pass: "cnxnswlxhsgpsdtb"
  },
  host: "smtp.gmail.com",
  port: 465,
  secure: true
});

export const createNewAccount = async (req, res) => {
  try {
    const data = req.body;

    const checkIfExist = await User.findOne({
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

    transporter.sendMail(mailOptions, async(error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        // console.log("Email sent:", info.response);
        const newUser = new User({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            contactNumber: data.contactNumber,
            otp: otp
          });
          const ifCreated = await newUser.save();
          if (ifCreated) {
            const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
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
    console.error(err.message);
    res.status(500).json({ error: `${err.message}` });
  }
};

export const verifyAccount = async (req, res) => {
    try {
    const data = req.body;
    const findUserAccount=await User.findOne({
        email: data.email,
    });
    if (!findUserAccount) {
        return res.status(404).json({ message: "Account not found" });
    }
    if (findUserAccount.otp!== data.otp) {
        return res.status(400).json({ message: "Invalid OTP" });
    }
    const user = await User.findByIdAndUpdate(findUserAccount._id, { isVerified: true }, { new: true });
    if (user) {
      return res.status(200).json({ message: "Account verified successfully" });
    }
    res.status(400).json({ message: "Failed to verify account" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: `${err.message}` });
  }
}

export const getUserDetails=async(req, res) => {
    const token=req.params.token;
    if (!token) return res.status(403).json({ message: "No token provided" });
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded.id) return res.status(403).json({ message: "Token is not valid" });

    try {
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: `${err.message}` });
    }
}

export const userLogin=async (req, res) => {
    const data=req.body;
    console.log("Data: ", data)
    try{
        const isEmail=await User.findOne({
            email: data.email
        });
        if(!isEmail){
            return res.status(400).json({message: 'Email not found'});
        }

        const otp = otpgenerator.generate(6, {
            upperCase: true,
            specialCharacters: false
          });
    
        const mailOptions = {
          from: "abhayguptaak39@gmail.com",
          to: `${data.email}`,
          subject: "RideEasy One time Login OTP",
          html: `
                <br/>
                <b>Your OTP for login is: ${otp}</b>  
                <br/><b>Best regards,  
                <br/>Abhay Kumar Gupta  
                <br/>Customer Support Representative  
                <br/>RideEasy</b>
                `
        };
    
        transporter.sendMail(mailOptions, async(error, info) => {
          if (error) {
            return res.json({
              message: `Failed to send OTP ${error.message}`
            })
          } else {
            // console.log("Email sent:", info.response);
            const token = jwt.sign({ id: isEmail._id }, process.env.SECRET_KEY, {
                expiresIn: "15d"
            });
            return res.status(201).json({
                message: "Your one time password is sent to your email",
                token: token,
                otp: otp
            })
          }
        });
        
    }catch(err){
        console.error(err.message);
        res.status(500).json({ error: `${err.message}` });
    }
}
