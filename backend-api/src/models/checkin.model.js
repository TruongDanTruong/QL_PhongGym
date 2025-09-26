const mongoose = require('mongoose');

const CheckinSchema = new mongoose.Schema({
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    checkinTime: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Checkin', CheckinSchema);