import express from 'express';
import { createRequirement, getRequirements, updateRequirementStatus } from '../controllers/requirementController.js'; // Adjust path if needed
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Route to create a new requirement
router.post('/', createRequirement);

// Route to fetch all requirements
router.get('/', authenticate, isAdmin, getRequirements);

// Route to update requirement status (mark as closed)
router.patch('/:id', authenticate, isAdmin, updateRequirementStatus);

export default router;
