import AcademicResearch from '../models/AcademicResearch.js';

export const submitAcademicResearch = async (req, res) => {
  try {
    const formData = { ...req.body };

    // Validate required fields
    if (!formData.wordCount || !formData.researchType) {
      return res.status(400).json({ error: 'All fields are required for Academic Research' });
    }

    const newForm = new AcademicResearch(formData);
    await newForm.save();

    res.status(201).json({ message: 'Academic Research submitted successfully', data: newForm });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAcademicResearch = async (req, res) => {
  try {
    const forms = await AcademicResearch.find();
    res.status(200).json({error : false  , success : true  , data  : forms});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAcademicResearchStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'completed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const updatedForm = await AcademicResearch.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedForm) {
      return res.status(404).json({ message: 'Academic Research not found' });
    }

    res.status(200).json({ message: 'Status updated successfully', data: updatedForm });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAcademicResearch = async (req, res) => {
  try {
    const { id } = req.params;

    const form = await AcademicResearch.findByIdAndDelete(id);
    if (!form) {
      return res.status(404).json({ message: 'Academic Research not found' });
    }

    res.status(200).json({ message: 'Academic Research deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
