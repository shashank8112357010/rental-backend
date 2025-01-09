import express from 'express';
import { createProperty, getProperties, updateProperty , deleteProperty } from '../controllers/propertyController.js';
import { authenticate, isAdmin } from '../middleware/auth.js';
import upload from "../common/multer.js"

const router = express.Router();

router.post('/', authenticate, isAdmin, upload.array('images', 5) , createProperty);
router.get('/', getProperties);
router.put('/:id', authenticate, isAdmin,  upload.array('images', 5), updateProperty);
router.delete('/:propertyId', authenticate, isAdmin, deleteProperty);


export default router;