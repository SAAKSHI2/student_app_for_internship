import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import connect from "./database/connect.js";
import profileRoute from "./routes/profile.js";
import {scrapeInternshala} from "./webScraping/intershala.js";
import internshipRoute from "./routes/internships.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;


app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials",true);
    next();
})

app.use(cookieParser());
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true,      
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/api/auth/',authRoute);
app.use("/api/profile/",profileRoute)
app.use("/api/internship/",internshipRoute);

app.listen(PORT, ()=>{
    connect();
    // Run the scraping function to fetch the internship everytime
    // scrapeInternshala().then((internships) => {
    // console.log(internships);
    // });

    console.log("server running at port : ", PORT);
})