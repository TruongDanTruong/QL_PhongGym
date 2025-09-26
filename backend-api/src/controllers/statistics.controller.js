const User = require('../models/user.model');
const Checkin = require('../models/checkin.model');
const Package = require('../models/package.model');

exports.getStatistics = async(req, res) => {
    try {
        const totalMembers = await User.countDocuments({ role: 'member' });
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const checkinsToday = await Checkin.countDocuments({
            checkinTime: { $gte: today, $lt: tomorrow }
        });

        // Add more stats as needed
        const stats = {
            totalMembers,
            checkinsToday,
            // e.g., totalRevenue, activePackages, etc.
        };

        res.json(stats);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};