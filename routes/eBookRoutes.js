import express from 'express';
import {
  createEBook,
  getAllEBooks,
  getEBookById,
  updateEBook,
  deleteEBook,
} from '../controllers/eBookController.js';
import upload from "../common/multer.js";

const router = express.Router();

// Create a new eBook
router.post('/', upload.single('content'), createEBook);

// Get all eBooks
router.get('/', getAllEBooks);

// Get a specific eBook by ID
router.get('/:id', getEBookById);

// Update an eBook by ID
router.put('/:id', updateEBook);

// Delete an eBook by ID
router.delete('/:id', deleteEBook);

export default router;
