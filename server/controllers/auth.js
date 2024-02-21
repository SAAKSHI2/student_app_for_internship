import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Users from "../models/Users.js";
import { generateOTP } from "../utils/generateOTP.js";
import { sendOTPByEmail } from "../utils/sendEmail.js";

dotenv.config();


export const login=async(req,res)=>{
    try {
        const { email, otp } = req.body;
    
        // Find the user by email and OTP
        const user = await Users.findOne({ email, otp });
    
        if (!user) {
          return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    
        // Generate a JWT token
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.SECRET_KEY);

        res.cookie("accessToken",token,{
             httpOnly:true,
        }).status(200).json({message:"login successfully"});
    
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      }

}


export const register=async(req,res)=>{
    try {
        const { email } = req.body;

         // Check if the email is already registered
            const existingUser = await Users.findOne({ email });
            if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email is already registered' });
            }


        const otp = generateOTP();
    
        const newUser = new Users({ email, otp });
        await newUser.save();

        // Send OTP to the user's email
        sendOTPByEmail(email, otp);
        res.json({ success: true, message: 'Registration successful. Check your email for OTP.' });

      } catch (error) {

        console.error(error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });

      }
  
}


export const logout=(req,res)=>{
    res.clearCookie("accessToken",{
        secure:true,
        sameSite:"none"
    }).status(200).json("user has been logout")

}