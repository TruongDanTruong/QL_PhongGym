const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    duration: { // in days
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Package', PackageSchema);