const express = require('express');
const router = express.Router();
const checkinController = require('../controllers/checkin.controller');
const auth = require('../middlewares/auth.middleware');

// @route   POST api/checkin
// @desc    Check in a member (using QR code data)
// @access  Private (could be admin or a dedicated check-in terminal)
router.post('/', auth, checkinController.checkInMember);

module.exports = router;