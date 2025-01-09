import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
 
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true,
    min: 0
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  role : {
    type : String ,
    default : "user" ,
    enum : ["user" , "admin"]
  }
  
}, { timestamps: true });

export default mongoose.model('User', userSchema);