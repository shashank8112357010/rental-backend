import Booking from '../models/Booking.js';
import Property from '../models/Property.js';
import Vehicle from '../models/Vehicle.js';
import { validateBooking } from '../validators/bookingValidator.js';
import {sendMail} from '../common/sendmail.js';

export const createBooking = async (req, res) => {
  try {
    const validatedData = await validateBooking(req.body);
    const booking = new Booking({
      ...validatedData,
      user: req.user.userId
    });
    await booking.save();
     console.log(req.user);
    // Send email to user after booking is created
    const subject = 'Booking Confirmation';
    const message = `Dear User, your booking has been successfully created with ID: ${booking._id}.`;
    await sendMail(req.user.email, subject, message);

    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.userId })
      .populate('item')
      .sort('-createdAt');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('item')
      .populate('user') 
      .sort('-createdAt');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    // Find the booking by ID and populate the user field to get the email
    const booking = await Booking.findById(req.params.id).populate('user', 'email');
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Check if the status is being updated to APPROVED
    if (req.body.status === 'APPROVED') {
      if (booking.itemType === 'Property') {
        // Update Property item (set isBooked flag to true)
        const property = await Property.findById(booking.item);
        if (!property) {
          return res.status(404).json({ error: 'Property not found' });
        }
        property.isBooked = true;
        await property.save();
      } else if (booking.itemType === 'Vehicle') {
        // Update Vehicle item (reduce stock by 1)
        const vehicle = await Vehicle.findById(booking.item);
        if (!vehicle) {
          return res.status(404).json({ error: 'Vehicle not found' });
        }
        if (vehicle.stock > 0) {
          vehicle.stock -= 1;
          await vehicle.save();
        } else {
          return res.status(400).json({ error: 'No stock available for this vehicle' });
        }
      }

      // Send email for APPROVED status
      const subject = 'Booking Approved';
      const message = `Dear User, your booking with ID: ${booking._id} has been approved.`;
      await sendMail(booking.user.email, subject, message);

    } else if (req.body.status === 'REJECTED') {
      // Send email for REJECTED status
      const subject = 'Booking Rejected';
      const message = `Dear User, we regret to inform you that your booking with ID: ${booking._id} has been rejected.`;
      await sendMail(booking.user.email, subject, message);
    }

    // Update the booking status
    booking.status = req.body.status;
    await booking.save();

    // Return the updated booking
    res.json(booking);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
