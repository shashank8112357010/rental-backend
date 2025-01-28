import express from 'express';
import {
  submitPlagiarismTest,
  getPlagiarismTests,
  updatePlagiarismTestStatus,
  deletePlagiarismTest,
} from '../controllers/PlagiarismController.js';
import upload from '../common/multer.js'; // File upload middleware

const router = express.Router();

router.post('/', upload.single('file'), submitPlagiarismTest);
router.get('/', getPlagiarismTests);
router.put('/:id', updatePlagiarismTestStatus);
router.delete('/:id', deletePlagiarismTest);

export default router;
