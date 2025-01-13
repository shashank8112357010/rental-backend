import express from 'express';
import { createEnquiry, getEnquiries, updateEnquiryStatus } from '../controllers/enquireController.js'; // Adjust path if needed
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Route to create a new enquiry
router.post('/',  createEnquiry);

// Route to fetch all enquiries
router.get('/', authenticate, isAdmin, getEnquiries);

// Route to update enquiry status (mark as completed)
router.patch('/:id', authenticate, isAdmin, updateEnquiryStatus);

export default router;