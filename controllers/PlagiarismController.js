import PlagiarismTest from '../models/Plagiarism.js';

export const submitPlagiarismTest = async (req, res) => {
  try {
    console.log(req.file);
    const formData = {
      ...req.body,
      file: req.file ? `${process.env.ServerUrl}/rental_uploads/${req.file.filename}` : null,
    };

    // Validate required fields
    if (!formData.file || !formData.checkType) {
      return res.status(400).json({ error: 'File and check type are required for Plagiarism Test' });
    }

    const newForm = new PlagiarismTest(formData);
    await newForm.save();

    res.status(201).json({ message: 'Plagiarism Test submitted successfully', data: newForm });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getPlagiarismTests = async (req, res) => {
  try {
    const forms = await PlagiarismTest.find();
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePlagiarismTestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'completed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const updatedForm = await PlagiarismTest.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedForm) {
      return res.status(404).json({ message: 'Plagiarism Test not found' });
    }

    res.status(200).json({ message: 'Status updated successfully', data: updatedForm });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePlagiarismTest = async (req, res) => {
  try {
    const { id } = req.params;

    const form = await PlagiarismTest.findByIdAndDelete(id);
    if (!form) {
      return res.status(404).json({ message: 'Plagiarism Test not found' });
    }

    res.status(200).json({ message: 'Plagiarism Test deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
