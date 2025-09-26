const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statistics.controller');
const auth = require('../middlewares/auth.middleware');
const admin = require('../middlewares/admin.middleware');

// @route   GET api/admin/statistics
// @desc    Get gym statistics
// @access  Private (Admin)
router.get('/', [auth, admin], statisticsController.getStatistics);

module.exports = router;