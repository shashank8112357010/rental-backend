import express from 'express';
import {
    createPurchase,
    getAllPurchases,
    getPurchasesByUserId,
    deletePurchase,
    createRazorpayOrder,
    verifyRazorpayPayment
} from '../controllers/purchaseController.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();
router.post("/razorpay/order", authenticate, createRazorpayOrder); // Create Razorpay order
router.post("/razorpay/verify", authenticate, verifyRazorpayPayment); // Verify Razorpay payment

// Create a new purchase
router.post('/', authenticate ,  createPurchase);

// Get all purchases (admin only)
router.get('/all', authenticate , isAdmin , getAllPurchases);

// Get purchases by user ID
router.get('/',  authenticate ,getPurchasesByUserId);

// Delete a purchase by ID
router.delete('/:id', authenticate , isAdmin ,  deletePurchase);

export default router;
