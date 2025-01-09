import Booking from '../models/Booking.js';
import { validateBooking } from '../validators/bookingValidator.js';

export const createBooking = async (req, res) => {
  try {
    const validatedData = await validateBooking(req.body);
    const booking = new Booking({
      ...validatedData,
      user: req.user._id
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('item')
      .sort('-createdAt');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};