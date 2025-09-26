const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');

// @route   GET api/users/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', auth, userController.getMe);

// @route   GET api/users/qr
// @desc    Get user's QR code
// @access  Private
router.get('/qr', auth, userController.getQrCode);

// In a real app, you'd have a route for personalized workout plans
// router.get('/me/workout-plan', auth, userController.getWorkoutPlan);


module.exports = router;