import jwt from "jsonwebtoken";
import Users from "../models/Users.js";
import Application from "../models/Application.js";
import { calculateCoins } from "../utils/calculateCoins.js";

export const updateProfile = async(req,res)=>{

    const token  = req.cookies.accessToken;

    if(!token){
        return res.status(401).json("Not logged in!");
    }

    jwt.verify(token,process.env.SECRET_KEY,async(err,userInfo)=>{
        if(err){
            return res.status(403).json("Token is not valid!");
        }


        const { email, profile, education, projects, experiences } = req.body;

        const userId = userInfo.userId;

        let coinsEarned = calculateCoins({ profile, education, projects, experiences });

        const appliedInternship = await Application.countDocuments({user : userId}).then((count) => {
          coinsEarned = coinsEarned - (50*count);
        
          }).catch((err) => {
            console.error(err);
          });
         

        try {
             const user = await Users.findOneAndUpdate({ email },{profile,education ,projects,experiences,coins:coinsEarned},{ new: true });

              res.status(200).json(user);

          } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
          }

    })
    
    
}

export const getProfile = async(req,res)=>{
    const token  = req.cookies.accessToken;

    if(!token){
        return res.status(401).json("Not logged in!");
    }

    jwt.verify(token,process.env.SECRET_KEY,async(err,userInfo)=>{
        if(err){
            return res.status(403).json("Token is not valid!");
        }

        const userId = userInfo.userId;

        try {
            const user = await Users.findById(userId);
            // console.log(user);
            if (!user) {
              return res.status(404).json({ success: false, error: 'User not found' });
            }

            res.status(200).json(user);

          } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
          }

    })
    
}