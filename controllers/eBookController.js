import eBook from '../models/EBook.js';
import { validateEBook } from '../validators/eBookValidator.js';
import fs from 'fs';
import path from 'path';

export const createEBook = async (req, res) => {
    try {
        // Validate the incoming request data
        const eBookData = {
            ...req.body,
            content: req.file ? `${process.env.ServerUrl}/rental_uploads/${req.file.filename}` : null, // Use file name or path
        };

        console.log(eBookData, "eBookData");

        // Validate the combined data
        const validatedData = await validateEBook(eBookData);

        // Create a new eBook document
        const newEBook = new eBook(validatedData);

        // Save the eBook to the database
        await newEBook.save();

        res.status(201).json(newEBook);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAllEBooks = async (req, res) => {
    try {
        const eBooks = await eBook.find();
        console.log(eBooks);
        res.status(200).json(eBooks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getEBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const eBookData = await eBook.findById(id);

        if (!eBookData) {
            return res.status(404).json({ message: 'eBook not found' });
        }

        res.status(200).json(eBookData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateEBook = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate the incoming request data
        const validatedData = await validateEBook(req.body);

        const updatedEBook = await eBook.findByIdAndUpdate(id, validatedData, {
            new: true, // Return the updated document
            runValidators: true, // Run schema validations
        });

        if (!updatedEBook) {
            return res.status(404).json({ message: 'eBook not found' });
        }

        res.status(200).json(updatedEBook);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



export const deleteEBook = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the eBook document by ID
        const eBookData = await eBook.findById(id);

        if (!eBookData) {
            return res.status(404).json({ message: 'eBook not found' });
        }

        // Extract the file path from the content field
        if (eBookData.content) {
            const filePath = path.resolve(`.${eBookData.content.replace(process.env.ServerUrl, '')}`);

            // Check if the file exists and delete it
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath); // Synchronously delete the file
            }
        }

        // Delete the eBook document from the database
        await eBook.findByIdAndDelete(id);

        res.status(200).json({ message: 'eBook and associated file deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
