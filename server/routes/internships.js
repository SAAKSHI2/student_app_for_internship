import express from 'express';
import { getAllInternships, getAppliedInternips,applyForInternship } from '../controllers/internships.js';

const router = express.Router();

router.get('/',getAllInternships);
router.get('/:id',getAppliedInternips);
router.post('/',applyForInternship);


export default router;
