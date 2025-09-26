const Booking = require('../models/booking.model');

exports.createBooking = async(req, res) => {
    const { ptId, date } = req.body;
    const memberId = req.user.id;

    try {
        // Add validation logic here (e.g., check if PT exists, if timeslot is available)
        const newBooking = new Booking({
            member: memberId,
            pt: ptId,
            date,
        });

        const booking = await newBooking.save();
        res.json(booking);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getMyBookings = async(req, res) => {
    try {
        const bookings = await Booking.find({ member: req.user.id }).populate('pt', ['name', 'email']);
        res.json(bookings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getAllBookings = async(req, res) => {
    try {
        const bookings = await Booking.find().populate('member', ['name', 'email']).populate('pt', ['name', 'email']);
        res.json(bookings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};