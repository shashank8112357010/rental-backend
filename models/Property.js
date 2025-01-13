import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['FLAT', 'PG'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  location: {
    type: String,
    required: true
  },
  locationLink: {
    type: String,
    required: true
  },
  images: [{
    type: String,
    required: true
  }],
  amenities: [{
    type: String
  }],
  available: {
    type: Boolean,
    default: true
  },
  owner: {
    type: String,
    default: true
  },
  isBooked: {
    type: String,
    default: false
  },
  // Specific for PG
  pgCategory: {
    type: String,
    enum: ['BOYS', 'GIRLS'],
    required: function() {
      return this.type === 'PG'; // Only required if property type is PG
    }
  },
  occupancy: {
    type: Number,
    required: function() {
      return this.type === 'PG'; // Only required if property type is PG
    },
    min: 1,
    max: 100, // Adjust this max value based on how many rooms you want to support
    default: 1
  },
  // Specific for Flats
  flatType: {
    type: String,
    enum: ['1BHK', '2BHK', '3BHK'],
    required: function() {
      return this.type === 'FLAT'; // Only required if property type is FLAT
    }
  },
  furnishType: {
    type: String,
    enum: ['SemiFurnished', 'Unfurnished', 'FullyFurnished'],
    required: function() {
      return this.type === 'FLAT'; // Only required if property type is FLAT
    }
  }
}, { timestamps: true });

export default mongoose.model('Property', propertySchema);
