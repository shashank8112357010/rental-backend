import Vehicle from '../models/Vehicle.js';
import { validateVehicle } from '../validators/vehicleValidator.js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Create a vehicle
export const createVehicle = async (req, res) => {
  try {
    console.log(req.files , "reaching");
    const validatedData = await validateVehicle({
      ...req.body,
      images: req.files 
        ? req.files.map(file => `${process.env.ServerUrl}/rental_uploads/${file.filename}`).filter((image) => image) // Filter out any falsy values
        : []
    });

    const vehicle = new Vehicle(validatedData);
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all vehicles
export const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().sort('-createdAt');
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a vehicle
export const updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    res.status(200).json(vehicle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a vehicle
export const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    // Remove associated images
    if (vehicle.images && vehicle.images.length > 0) {
      vehicle.images.forEach(image => {
        const filePath = path.join(__dirname, '..', image.replace(`${process.env.ServerUrl}/`, ''));
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
    }

    await vehicle.deleteOne();
    res.status(200).json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Increase stock
export const increaseStock = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    vehicle.stock = String(Number(vehicle.stock) + 1);
    await vehicle.save();

    res.status(200).json(vehicle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Decrease stock
export const decreaseStock = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    if (parseInt(vehicle.stock, 10) <= 0) {
      return res.status(400).json({ error: 'Stock cannot go below 0. No stock available to decrease.' });
    }

    vehicle.stock = String(parseInt(vehicle.stock, 10) - 1);
    await vehicle.save();

    res.status(200).json({ message: 'Stock decreased successfully.', vehicle });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

