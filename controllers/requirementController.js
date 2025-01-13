import Requirement from '../models/Requirement.js';
import { validateRequirement } from '../validators/requirementValidator.js';
import { sendMail } from '../common/sendmail.js';

export const createRequirement = async (req, res) => {
  try {
    const validatedData = await validateRequirement(req.body);
    const requirement = new Requirement({
      ...validatedData
    });
    await requirement.save();

    // Send email to user after requirement is created
    const subject = 'Requirement Confirmation';
    const message = `Dear ${requirement.name}, your requirement has been successfully created with the following details: \nRequirement: ${requirement.requirement}, ID: ${requirement._id}.`;
    await sendMail(req.body.email, subject, message);

    res.status(201).json(requirement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getRequirements = async (req, res) => {
  try {
    // Find all requirements sorted by creation date
    const requirements = await Requirement.find()
      .sort('-createdAt');

    res.json(requirements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateRequirementStatus = async (req, res) => {
  try {
    const requirement = await Requirement.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!requirement) {
      return res.status(404).json({ error: 'Requirement not found' });
    }

    // Send email when the status is updated (CLOSED)
    if (req.body.status === 'CLOSED') {
      const subject = 'Requirement Closed';
      const message = `Dear ${requirement.name}, your requirement with ID: ${requirement._id} has been closed.`;
      await sendMail(requirement.email, subject, message);
    }

    res.json(requirement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
