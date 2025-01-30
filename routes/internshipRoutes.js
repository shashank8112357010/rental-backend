import express from 'express';
import {
  createInternship,
  getActiveInternships,
  getAllInternships,
  getInternshipById,
  updateInternship,
  deleteInternship
} from '../controllers/internshipController.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// User Routes
router.get('/active', getActiveInternships); // Get only active internships
router.get('/:id', getInternshipById); // Get specific internship by ID

// Admin Routes
router.post('/', authenticate, isAdmin, createInternship); // Create internship
router.get('/', authenticate, isAdmin, getAllInternships); // Get all internships (admin)
router.put('/:id', authenticate, isAdmin, updateInternship); // Update internship
router.delete('/:id', authenticate, isAdmin, deleteInternship); // Delete internship

export default router;
