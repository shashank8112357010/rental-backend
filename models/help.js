// HelpModel.js

import mongoose from 'mongoose';

const helpSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking', // Referencing the Booking model
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referencing the User model
    required: true,
  },
  message: {
    type: String,
    required: true, // Problem the user has faced
  },
  status: {
    type: String,
    default: 'Pending', // Status of the help request (Pending, Done, etc.)
    enum: ['Pending', 'Done'],
  },
  adminResponse: {
    type: String,
    default: 'Admin Respond soon', // Admin's response to the help request
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
} ,{ timestamps: true });

const Help = mongoose.model('Help', helpSchema);

export default Help;
