import mongoose from 'mongoose';

const plagiarismTestSchema = new mongoose.Schema(
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
    file: {
      type: String, // Store file path or URL
      required: true, // Always required for Plagiarism Test
      validate: {
        validator: function (value) {
          return /\.(pdf|doc|docx)$/i.test(value); // Validate file extensions
        },
        message: (props) =>
          `${props.value} is not a valid file type. Only PDF or DOC/DOCX are allowed.`,
      },
    },
    checkType: {
      type: String,
      enum: ['Plagiarism Check', 'AI Check', 'AI+Check'], // Allowed check types
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed'], // Allowed values
      default: 'pending', // Default status
    },
  },
  { timestamps: true }
);

export default mongoose.model('PlagiarismTest', plagiarismTestSchema);
