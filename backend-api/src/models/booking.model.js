const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    pt: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming PTs are also users with a 'pt' role
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending',
    },
});

module.exports = mongoose.model('Booking', BookingSchema);