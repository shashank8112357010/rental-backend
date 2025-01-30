import express from 'express';
import {
  createSubject,
  getAllSubjects,
  createModule,
  getModulesBySubject,
  createEBook,
  getAllEBooks,
  getEBookById,
  updateEBook,
  deleteEBook,
  getEBooksByModuleId,
} from '../controllers/eBookController.js';
import upload from "../common/multer.js";
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// **Subject Routes**
// Create a new subject
router.post('/subject', authenticate, isAdmin, createSubject);
// Get all subjects
router.get('/subject', getAllSubjects);

// **Module Routes**
// Create a new module
router.post('/modules', authenticate, isAdmin, createModule);

// Get all modules by subjectId
router.get('/modules/:subjectId', getModulesBySubject);

// **eBook Routes**
// Create a new eBook
router.post('/', authenticate, isAdmin, upload.single('content'), createEBook);
// Get all eBooks
router.get('/', getAllEBooks);
// Get a specific eBook by ID
router.get('/:id', getEBookById);
// Get eBooks by moduleId


router.get('/module/:moduleId', getEBooksByModuleId);


// Update an eBook by ID
router.put('/:id', authenticate, isAdmin, upload.single('content'), updateEBook);
// Delete an eBook by ID
router.delete('/:id', authenticate, isAdmin, deleteEBook);

export default router;