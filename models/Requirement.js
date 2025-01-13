import mongoose from 'mongoose';

const requirementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
 
  requirement: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['OPEN', 'CLOSED'],
    default: 'OPEN'
  }
}, { timestamps: true });

export default mongoose.model('Requirement', requirementSchema);