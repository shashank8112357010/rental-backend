import Internship from '../models/Internship.js';

// Create Internship (Admin only)
export const createInternship = async (req, res) => {
  try {
    const { title, description, eligibility, process, link, deadline } = req.body;

    if (!title || !description || !eligibility || !process || !link || !deadline) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newInternship = new Internship({
      title,
      description,
      eligibility,
      process,
      link,
      deadline,
    });

    await newInternship.save();

    res.status(201).json({ message: 'Internship created successfully', data: newInternship });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Active Internships (Users)
export const getActiveInternships = async (req, res) => {
  try {
    const currentDate = new Date();

    const activeInternships = await Internship.find({
      deadline: { $gte: currentDate }  // Only fetch non-expired internships
    });

    res.status(200).json(activeInternships);
  } catch (error) {
    console.error("Error fetching active internships:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get All Internships (Admin)
export const getAllInternships = async (req, res) => {
  try {
    const internships = await Internship.find();

    res.status(200).json(internships);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Internship by ID
export const getInternshipById = async (req, res) => {
  try {
    const { id } = req.params;
    const internship = await Internship.findById(id);

    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    res.status(200).json(internship);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Internship (Admin only)
export const updateInternship = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, eligibility, process, link, deadline } = req.body;

    const updatedInternship = await Internship.findByIdAndUpdate(
      id,
      { title, description, eligibility, process, link, deadline },
      { new: true, runValidators: true }
    );

    if (!updatedInternship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    res.status(200).json({ message: 'Internship updated successfully', data: updatedInternship });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Internship (Admin only)
export const deleteInternship = async (req, res) => {
  try {
    const { id } = req.params;

    const internship = await Internship.findByIdAndDelete(id);

    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    res.status(200).json({ message: 'Internship deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
