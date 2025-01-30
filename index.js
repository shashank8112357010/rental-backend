import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import propertyRoutes from './routes/propertyRoutes.js';
import vehicleRoutes from './routes/vehicleRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import enquireRoutes from './routes/enquireRoutes.js';
import requirementRoutes from './routes/requirementRoutes.js';
import helpRoutes from './routes/helpRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import userRoutes from './routes/userRoutes.js';
import purchaseRoutes from './routes/purchaseRoutes.js';

import academicRoutes from './routes/AcademicResearchRoutes.js';
import plagiarismRoutes from './routes/PlagiarismRoutes.js';

import path from 'path'
import bodyParser from "body-parser"
import { fileURLToPath } from 'url';
import eBookRoutes from './routes/eBookRoutes.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();




const app = express();




app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' })); // Adjust limit as needed
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));



app.use('/rental/rental_uploads', express.static(path.join(__dirname, 'rental_uploads')))
app.get('/rental/test', (req, res) => res.send('Rental Server is UP'))
// Routes
app.use('/rental/api/property', propertyRoutes);
app.use('/rental/api/vehicles', vehicleRoutes);
app.use('/rental/api/bookings', bookingRoutes);
app.use('/rental/api/enquire', enquireRoutes);
app.use('/rental/api/requirement', requirementRoutes);
app.use('/rental/api/help', helpRoutes);
app.use('/rental/api/ebook', eBookRoutes);
app.use('/rental/api/purchase', purchaseRoutes);
app.use('/rental/api/academic-research', academicRoutes );
app.use('/rental/api/plagiarism-test', plagiarismRoutes);





app.use('/rental/api/user', userRoutes);
app.use('/rental/api/dashboard', dashboardRoutes);




// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('data base connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});