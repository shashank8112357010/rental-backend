import mongoose from 'mongoose';

const academicResearchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      default: 'NO MESSAGE',
    },
    wordCount: {
      type: Number,
      required: true,
    },
    researchType: {
      type: String,
      enum: [
        'Research Paper',
        'Literature Review',
        'Presentation Speech',
        'Critical Analysis',
        'Case Commentary',
        'IRAC Analysis',
        'Book / Movie Review',
      ],
      required: true,
    },
    deliveryOption: {
      type: String,
      enum: ['Standard Delivery within 72 Hours', 'Express Delivery within 12 Hours'],
      required: true,
    },
    paymentOption: {
      type: String,
      enum: [
        'Standard',
        'Premium',
      ],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    TransactionId: {
      type: String,
      required: false,
      default : "razor pay"
    },
    status: {
      type: String,
      enum: ['pending', 'completed'], // Allowed values
      default: 'pending', // Default status
    },
  },
  { timestamps: true }
);

export default mongoose.model('AcademicResearch', academicResearchSchema);
