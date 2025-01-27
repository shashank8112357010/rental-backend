import mongoose from 'mongoose';

// Subject Schema
const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true // Ensures each subject name is unique
    }
  },
  { timestamps: true }
);

// Module Schema
const moduleSchema = new mongoose.Schema(

  {
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject', // Reference the Subject model
      required: true
    },
    title: {
      type: String,
      required: true
    }

  },
  { timestamps: true }
);

// eBook Schema
const eBookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    doc: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject', // Reference the Subject model
      required: true
    },
    moduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Module', // Reference the Subject model
      required: true
    },
  },
  { timestamps: true }
);

// Export Models
const Subject = mongoose.model('Subject', subjectSchema);
const Module = mongoose.model('Module', moduleSchema);

const eBook = mongoose.model('eBook', eBookSchema);

export { Subject, eBook, Module };
