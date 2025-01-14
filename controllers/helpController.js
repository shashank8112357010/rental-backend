// helpController.js

import Help from '../models/Help.js';

// Create a new help request
export const createHelpRequest = async (req, res) => {
  try {
    const { bookingId,  message } = req.body;

    const newHelpRequest = new Help({
      bookingId,
      userId : req.user.userId,
      message,
    });

    await newHelpRequest.save();
    res.status(201).json({ message: 'Help request created successfully', data: newHelpRequest });
  } catch (error) {
    res.status(500).json({ message: 'Error creating help request', error: error.message });
  }
};

// Get all help requests (admin view)
export const getHelpRequests = async (req, res) => {
  try {
    const helpRequests = await Help.find().populate('userId').populate('bookingId')
    res.status(200).json({ data: helpRequests });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching help requests', error: error.message });
  }
};

// Update help request status
export const updateHelpRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedHelpRequest = await Help.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedHelpRequest) {
      return res.status(404).json({ message: 'Help request not found' });
    }

    res.status(200).json({ message: 'Help request status updated', data: updatedHelpRequest });
  } catch (error) {
    res.status(500).json({ message: 'Error updating help request status', error: error.message });
  }
};

// Add admin response
export const addAdminResponse = async (req, res) => {
  try {
    const { id } = req.params;
    const { adminResponse } = req.body;

    const updatedHelpRequest = await Help.findByIdAndUpdate(
      id,
      { adminResponse },
      { new: true }
    );

    if (!updatedHelpRequest) {
      return res.status(404).json({ message: 'Help request not found' });
    }

    res.status(200).json({ message: 'Admin response added', data: updatedHelpRequest });
  } catch (error) {
    res.status(500).json({ message: 'Error adding admin response', error: error.message });
  }
};
