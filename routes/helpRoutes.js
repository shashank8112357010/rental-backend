// helpRoutes.js

import express from 'express';
import {
  createHelpRequest,
  getHelpRequests,
  updateHelpRequestStatus,
  addAdminResponse,
} from '../controllers/helpController.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Route to create a new help request
router.post('/', authenticate, createHelpRequest);

// Route to fetch all help requests (admin only)
router.get('/', authenticate, isAdmin, getHelpRequests);

// Route to update the status of a help request (mark as done)
router.put('/status/:id', authenticate, isAdmin, updateHelpRequestStatus);

// Route to add an admin response to a help request
router.put('/response/:id', authenticate, isAdmin, addAdminResponse);

export default router;
