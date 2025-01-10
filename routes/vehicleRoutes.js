import express from 'express';
import {
    createVehicle,
    getVehicles,
    updateVehicle,
    deleteVehicle,
    increaseStock,
    decreaseStock,
    getVehicleById
} from '../controllers/vehicleController.js';
import { authenticate, isAdmin } from '../middleware/auth.js';
import upload from "../common/multer.js"

const router = express.Router();

// CRUD routes
router.post('/', authenticate, isAdmin, upload.array('images', 5), createVehicle); // Create vehicle
router.get('/', getVehicles); // Get all vehicles
router.get('/:vehicleId', getVehicleById); // Get all vehicles

router.put('/:id', authenticate, isAdmin, upload.array('images', 5), updateVehicle); // Update vehicle
router.delete('/:id', authenticate, isAdmin, deleteVehicle); // Delete vehicle

// Stock management routes
router.put('/:id/increase-stock', authenticate, isAdmin, increaseStock);
router.put('/:id/decrease-stock', authenticate, isAdmin, decreaseStock);

export default router;
