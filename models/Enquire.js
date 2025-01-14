import mongoose from 'mongoose';

const enquireSchema = new mongoose.Schema({
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
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'itemType',
    required: true
  },
  itemType: {
    type: String,
    enum: ['Property', 'Vehicle'],
    required: true
  },
  enquire: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['OPEN', 'CLOSED'],
    default: 'OPEN'
  }
}, { timestamps: true });

export default mongoose.model('Enquiry', enquireSchema);

