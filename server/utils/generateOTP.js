import otpGenerator from "otp-generator";

export const generateOTP = () =>{
    const otp = otpGenerator.generate(6,{
        specialChars:false,
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false
    })
    console.log(otp);

    return otp;

}