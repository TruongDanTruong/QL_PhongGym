const User = require('../models/user.model');

// In a real app, you would have more complex logic here
exports.getAllMembers = async(req, res) => {
    try {
        const members = await User.find({ role: 'member' });
        res.json(members);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.createMember = async(req, res) => {
    // This is a simplified example. In a real app, you'd use the register logic.
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        user = new User({ name, email, password, role: 'member' });
        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getMemberById = async(req, res) => {
    try {
        const member = await User.findById(req.params.id);
        if (!member || member.role !== 'member') {
            return res.status(404).json({ msg: 'Member not found' });
        }
        res.json(member);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.updateMember = async(req, res) => {
    const { name, email } = req.body;
    const updatedFields = { name, email };
    try {
        let member = await User.findById(req.params.id);
        if (!member || member.role !== 'member') {
            return res.status(404).json({ msg: 'Member not found' });
        }
        member = await User.findByIdAndUpdate(req.params.id, { $set: updatedFields }, { new: true });
        res.json(member);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.deleteMember = async(req, res) => {
    try {
        let member = await User.findById(req.params.id);
        if (!member || member.role !== 'member') {
            return res.status(404).json({ msg: 'Member not found' });
        }
        await User.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Member removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};