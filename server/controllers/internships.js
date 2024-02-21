import Application from "../models/Application.js";
import Internships from "../models/Internships.js";
import jwt from "jsonwebtoken";

export const applyForInternship = async(req,res) =>{
    const token  = req.cookies.accessToken;

    if(!token){
        return res.status(401).json("Not logged in!");
    }

    jwt.verify(token,process.env.SECRET_KEY,async(err,userInfo)=>{
        if(err){
            return res.status(403).json("Token is not valid!");
        }

        const userId = userInfo.userId;
        const internshipId = req.body.internshipId;

        try {
            const internship = await Internships.findById(internshipId);
            // console.log(user);
            if (!internship) {
              return res.status(404).json({ success: false, error: 'internship not found' });
            }

            const application = new Application({
                user: userId,
                internship: internship._id,
                coinsSpent: 50,
              });
          
            await application.save();

            res.status(200).json("applied for internship");

          } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
          }

    })


}

export const getAllInternships = async(req,res) =>{
    try {
        const allInternships = await Internships.find();
        res.status(200).json(allInternships);
      } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json(error.message);
      }
}

export const getAppliedInternips = async(req,res) =>{
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
            const appliedInternship = await Application.find({user : userId}).populate('internship');
            console.log(appliedInternship);
            const applied = []
            appliedInternship.forEach((ele)=>applied.push(ele.internship))

            res.status(200).json(applied);

          } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
          }

    })

}