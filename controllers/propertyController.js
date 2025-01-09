import Property from '../models/Property.js';
import { validateProperty } from '../validators/propertyValidator.js';
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

export const createProperty = async (req, res) => {
  try {
    const validatedData = await validateProperty({
      ...req.body,
      images: req.files
        ? req.files
            .map((file) => `${process.env.ServerUrl}/rental_uploads/${file.filename}`)
            .filter((image) => image) // Filter out any falsy values
        : []
    });

    const property = new Property(validatedData);
    await property.save();
    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort('-createdAt');
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    res.json(property);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.propertyId);

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    // Delete images associated with the property
    if (property.images && property.images.length > 0) {
      property.images.forEach((image) => {
        const filePath = path.join(__dirname, '..', image.replace(`${process.env.ServerUrl}/`, ''));
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath); // Delete the image file
        }
      });
    }

    // Delete the property from the database
    await Property.deleteOne({ _id: req.params.propertyId });
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
