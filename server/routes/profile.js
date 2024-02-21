import express from "express";
import { updateProfile, getProfile } from "../controllers/profile.js";

const router = express.Router();

router.put('/',updateProfile);
router.get('/',getProfile);


export default router;