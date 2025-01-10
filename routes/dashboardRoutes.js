import express from 'express';
const router = express.Router();

import User from "../models/User.js";
import Booking from "../models/Booking.js";
import Property from "../models/Property.js";
import Vehicle from "../models/Vehicle.js";

import { authenticate, isAdmin } from '../middleware/auth.js';

// Route to fetch counts and last updated timestamps of various collections
router.get('/count', authenticate, isAdmin, async (req, res) => {
    try {
        // Get counts and last updated timestamps for each model
        const userCount = await User.countDocuments();
        const userLastUpdated = await User.findOne().sort({ updatedAt: -1 }).select('updatedAt');

        const bookingCount = await Booking.countDocuments();
        const bookingLastUpdated = await Booking.findOne().sort({ updatedAt: -1 }).select('updatedAt');

        const propertyCount = await Property.countDocuments();
        const propertyLastUpdated = await Property.findOne().sort({ updatedAt: -1 }).select('updatedAt');

        const vehicleCount = await Vehicle.countDocuments();
        const vehicleLastUpdated = await Vehicle.findOne().sort({ updatedAt: -1 }).select('updatedAt');

        // Return the counts and last updated timestamps as a JSON response
        return res.status(200).json({
            success: true,
            data: {
                user: { count: userCount, lastUpdated: userLastUpdated ? userLastUpdated.updatedAt : null },
                booking: { count: bookingCount, lastUpdated: bookingLastUpdated ? bookingLastUpdated.updatedAt : null },
                property: { count: propertyCount, lastUpdated: propertyLastUpdated ? propertyLastUpdated.updatedAt : null },
                vehicle: { count: vehicleCount, lastUpdated: vehicleLastUpdated ? vehicleLastUpdated.updatedAt : null },
            }
        });
    } catch (error) {
        console.error('Error fetching counts and last updated:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch counts and last updated timestamps'
        });
    }
});

export default router;
