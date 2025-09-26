const Checkin = require('../models/checkin.model');
const User = require('../models/user.model');
const { io } = require('../../server'); // Import io from server

exports.checkInMember = async(req, res) => {
    // The QR code would contain the member's ID
    const { memberId } = req.body;

    try {
        const member = await User.findById(memberId);
        if (!member) {
            return res.status(404).json({ msg: 'Member not found' });
        }

        // Here you could add logic to check if the member has an active package

        const newCheckin = new Checkin({
            member: memberId,
        });

        const checkin = await newCheckin.save();

        // Emit a real-time event
        io.emit('new_checkin', {
            member: {
                id: member.id,
                name: member.name,
            },
            checkinTime: checkin.checkinTime,
        });


        res.json({ msg: 'Check-in successful', checkin });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};