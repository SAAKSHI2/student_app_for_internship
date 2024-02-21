import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { generateOTP } from "./generateOTP.js";

dotenv.config();

let transporter = nodemailer.createTransport({
    host:process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure : false,
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASS
    }
})


export const sendOTPByEmail = async(email,otp)=>{
    const subject = "OTP for GetInternship";
    const message = "Your OTP for GetInternship is : " + otp;
    

    let mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject: subject,
        text : message
    }


    transporter.sendMail(mailOptions,(error,info) => {
        if(error){
            console.log(error.message);
        } else{
            console.log("email sent successfully :)");
        }
    })

}