const User = require('../models/user.model');
const QRCode = require('qrcode');

exports.getMe = async(req, res) => {
    try {
        // req.user.id is from the auth middleware
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getQrCode = async(req, res) => {
    try {
        const userId = req.user.id;
        // Generate QR code with user's ID or a unique token
        const qrCodeDataUrl = await QRCode.toDataURL(userId);
        res.json({ qrCodeDataUrl });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Placeholder for personalized workout plan
exports.getWorkoutPlan = async(req, res) => {
    // Logic to get personalized workout plan based on user's data
    res.json({ plan: "Your personalized workout plan is here." });
};