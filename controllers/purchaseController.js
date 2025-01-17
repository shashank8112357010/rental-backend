import Purchase from '../models/Purchase.js';
import { validatePurchase } from '../validators/purchaseValidator.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();
// Razorpay instance

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create Razorpay Order
export const createRazorpayOrder = async (req, res) => {
    const { amount, currency, receipt } = req.body;

    try {
        const options = {
            amount: amount * 100, // Razorpay accepts amount in paise
            currency: currency || "INR",
            receipt: receipt || `receipt_${Date.now()}`,
            payment_capture: 1,
        };

        const razorpayOrder = await razorpay.orders.create(options);
        res.status(201).json({
            id: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            receipt: razorpayOrder.receipt,
        });
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        res.status(500).json({ error: "Failed to create Razorpay order" });
    }
};

// Verify Razorpay Payment
export const verifyRazorpayPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    console.log(req.body);

    try {
        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        console.log(generatedSignature, "generatedSignature");
        console.log(razorpay_signature, "razorpay_signature");


        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({ success: false, error: "Payment verification failed" });
        }

        res.status(200).json({ success: true, message: "Payment verified successfully" });
    } catch (error) {
        console.error("Error verifying Razorpay payment:", error);
        res.status(500).json({ error: "Payment verification error" });
    }
};

export const createPurchase = async (req, res) => {
    try {
        // Validate request data
        const validatedData = await validatePurchase({ ...req.body, user: req.user.userId });

        // Create a new purchase
        const purchase = new Purchase(validatedData);

        // Save the purchase in the database
        await purchase.save();

        res.status(201).json(purchase);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAllPurchases = async (req, res) => {
    try {
        const purchases = await Purchase.find().populate('user').populate('eBook');
        res.status(200).json(purchases);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getPurchasesByUserId = async (req, res) => {
    try {
        const { userId } = req.user;

        const purchases = await Purchase.find({ user: userId })
            .populate('eBook')
            .sort({ purchaseDate: -1 }); // Sort by most recent purchase

        res.status(200).json(purchases);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deletePurchase = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedPurchase = await Purchase.findByIdAndDelete(id);

        if (!deletedPurchase) {
            return res.status(404).json({ message: 'Purchase not found' });
        }

        res.status(200).json({ message: 'Purchase deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
