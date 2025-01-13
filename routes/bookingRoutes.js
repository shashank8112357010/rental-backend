import express from 'express';
import { createBooking, getAllBookings, getBookings, updateBookingStatus } from '../controllers/bookingController.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, createBooking);
router.get('/', authenticate, getBookings);
router.get('/all', authenticate, isAdmin , getAllBookings);

router.put('/:id/status', authenticate, isAdmin, updateBookingStatus);

export default router;