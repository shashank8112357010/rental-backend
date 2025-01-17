
import { submitForm, getForms, deleteForm, updateFormStatus } from '../controllers/formController.js';
import upload from "../common/multer.js";
import express from 'express';
const router = express.Router();



// Submit form
router.post('/', upload.single('file'), submitForm);

// Get all forms
router.get('/', getForms);

// Delete a form by ID
router.delete('/:id', deleteForm);

router.patch('/:id/status', updateFormStatus);

export default router;
