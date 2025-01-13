import Enquiry from '../models/Enquire.js';
import { validateEnquiry } from '../validators/enquireValidator.js';
import { sendMail } from '../common/sendmail.js';  // Assuming sendMail is in this path

export const createEnquiry = async (req, res) => {
  try {
    const validatedData = await validateEnquiry(req.body);
    const enquiry = new Enquiry({
      ...validatedData
    });
    await enquiry.save();

    // Send email to user after enquiry is created
    const subject = 'Enquiry Confirmation';
    const message = `Dear ${enquiry.name}, your enquiry has been successfully created for ${enquiry.itemType} with ID: ${enquiry._id}.`;
    await sendMail(req.body.email, subject, message);

    res.status(201).json(enquiry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getEnquiries = async (req, res) => {
  try {
    // Find all enquiries and populate based on the itemType (Property or Vehicle)
    const enquiries = await Enquiry.find()
      .sort('-createdAt')
      .populate('serviceId');  // Assuming serviceId is the reference field to the item (Property or Vehicle)
    
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEnquiryStatus = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    
    if (!enquiry) {
      return res.status(404).json({ error: 'Enquiry not found' });
    }

    // Send email when the status is updated (REJECTED or APPROVED)
    let subject, message;
    if (req.body.status === 'APPROVED') {
      subject = 'Enquiry Approved';
      message = `Dear ${enquiry.name}, your enquiry with ID: ${enquiry._id} has been approved.`;
    } else if (req.body.status === 'REJECTED') {
      subject = 'Enquiry Rejected';
      message = `Dear ${enquiry.name}, we regret to inform you that your enquiry with ID: ${enquiry._id} has been rejected.`;
    }

    // Send the email if status is APPROVED or REJECTED
    if (subject && message) {
      await sendMail(enquiry.email, subject, message);
    }

    res.json(enquiry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
