import mongoose from 'mongoose';

const internshipSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    eligibility: {
        type: String,
        required: true
    },
    process: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
}, { timestamps: true });

export default mongoose.model('Internship', internshipSchema);

