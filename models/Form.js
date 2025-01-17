import mongoose from 'mongoose';

const formSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ['AcademicResearch', 'PlagiarismTest'] // Distinguish between forms
    },
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
    message: {
      type: String,
      required: true
    },
    file: {
      type: String, // Store file path or URL
      required: function () {
        return this.type === 'AcademicResearch'; // Required only for Academic Research
      },
      validate: {
        validator: function (value) {
          if (this.type === 'AcademicResearch') {
            return /\.(pdf|doc|docx)$/i.test(value); // Validate file extensions
          }
          return true; // No validation needed for Plagiarism Test
        },
        message: (props) => `${props.value} is not a valid file type. Only PDF or DOC/DOCX are allowed.`
      }
    },
    status: {
        type: String,
        enum: ['pending', 'completed'], // Allowed values
        default: 'pending' // Default status
      }
  },
  { timestamps: true }
);

export default mongoose.model('Form', formSchema);
