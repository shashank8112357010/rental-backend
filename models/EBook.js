import mongoose from 'mongoose';

const eBookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number, // Changed to Number for numerical operations
    required: true
  },
 
  content: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Ensure the file has the correct extension
        return /\.(pdf|doc|docx)$/i.test(value);
      },
      message: (props) => `${props.value} is not a valid file type. Only PDF or DOC/DOCX are allowed.`
    }
  },
}, { timestamps: true });

export default mongoose.model('eBook', eBookSchema);
