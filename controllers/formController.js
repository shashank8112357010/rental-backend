import Form from '../models/Form.js';
import { validateForm } from '../validators/formValidator.js';
import dotenv from 'dotenv';
dotenv.config();
export const submitForm = async (req, res) => {
  try {
    const { type } = req.body; 

    const formData = {
      ...req.body,
      file: req.file ? `${process.env.ServerUrl}/rental_uploads/${req.file.filename}` : null, 
    }; 
     if(type === 'PlagiarismTest'){
        delete formData.file;
     }

      console.log(formData);
    // Validate form data
    await validateForm(formData, type);

    // Save form submission to database
    const newForm = new Form(formData);
    await newForm.save();

    res.status(201).json({ message: `${type} submitted successfully`, data: newForm });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteForm = async (req, res) => {
  try {
    const { id } = req.params;

    const form = await Form.findByIdAndDelete(id);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.status(200).json({ message: 'Form deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateFormStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      // Validate status value
      if (!['pending', 'completed'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status value' });
      }
  
      // Update form status
      const updatedForm = await Form.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true } // Return the updated document and run validators
      );
  
      if (!updatedForm) {
        return res.status(404).json({ message: 'Form not found' });
      }
  
      res.status(200).json({ message: 'Status updated successfully', data: updatedForm });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  