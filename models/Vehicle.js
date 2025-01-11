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
  pricePerMonth: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: String,
    required: true,
    default: "0"
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
  },
  availabilityTime: {
    type: [String],
    enum: ['hourly', 'weekly', 'monthly'],
    required: true,
    validate: {
      validator: function (v) {
        return Array.isArray(v) && v.length > 0;
      },
      message: 'At least one availability time must be specified.'
    }
  }
}, { timestamps: true });

export default mongoose.model('Vehicle', vehicleSchema);
