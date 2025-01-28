import express from 'express';
import {
  submitAcademicResearch,
  getAcademicResearch,
  updateAcademicResearchStatus,
  deleteAcademicResearch,
} from '../controllers/AcademicResearchController.js';

const router = express.Router();

router.post('/', submitAcademicResearch);
router.get('/', getAcademicResearch);
router.put('/:id', updateAcademicResearchStatus);
router.delete('/:id', deleteAcademicResearch);

export default router;
