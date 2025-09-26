const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');
const auth = require('../middlewares/auth.middleware');
const admin = require('../middlewares/admin.middleware');

// @route   POST api/bookings
// @desc    Create a booking with a PT
// @access  Private (Member)
router.post('/', auth, bookingController.createBooking);

// @route   GET api/bookings
// @desc    Get user's bookings
// @access  Private (Member)
router.get('/my-bookings', auth, bookingController.getMyBookings);

// @route   GET api/bookings/all
// @desc    Get all bookings (for admin)
// @access  Private (Admin)
router.get('/all', [auth, admin], bookingController.getAllBookings);


module.exports = router;