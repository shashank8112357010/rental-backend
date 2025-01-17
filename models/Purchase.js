import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    eBook: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "eBook",
      required: true
    },
    purchaseDate: {
      type: Date,
      default: Date.now
    },
    price: {
      type: Number,
      required: true
    },
    transactionId: {
      type: String // Optional field for payment tracking
    }
  },
  { timestamps: true }
);

export default mongoose.model('Purchase', purchaseSchema);
