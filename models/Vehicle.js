import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['BIKE', 'SCOOTY'],
    required: true
  },
  model: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  pricePerDay: {
    type: Number,
    required: true,
    min: 0
  },
  stock : {
    type: String,
    required: true,
    default : "0"
  },
  images: [{
    type: String,
    required: true
  }],
  available: {
    type: Boolean,
    default: true
  },
  owner: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Vehicle', vehicleSchema);