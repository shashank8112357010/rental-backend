import express from 'express';
import {
  createEBook,
  getAllEBooks,
  getEBookById,
  updateEBook,
  deleteEBook,
} from '../controllers/eBookController.js';
import upload from "../common/multer.js";
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Create a new eBook
router.post('/', authenticate , isAdmin ,  upload.single('content'), createEBook);

// Get all eBooks
router.get('/',  getAllEBooks);

// Get a specific eBook by ID
router.get('/:id', getEBookById);

// Update an eBook by ID
router.put('/:id', authenticate , isAdmin , updateEBook);

// Delete an eBook by ID
router.delete('/:id', authenticate , isAdmin , deleteEBook);

export default router;
