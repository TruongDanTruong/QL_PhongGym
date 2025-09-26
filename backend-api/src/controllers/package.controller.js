const Package = require('../models/package.model');

exports.getAllPackages = async(req, res) => {
    try {
        const packages = await Package.find();
        res.json(packages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.createPackage = async(req, res) => {
    const { name, description, price, duration } = req.body;
    try {
        const newPackage = new Package({ name, description, price, duration });
        const package = await newPackage.save();
        res.json(package);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getPackageById = async(req, res) => {
    try {
        const package = await Package.findById(req.params.id);
        if (!package) {
            return res.status(404).json({ msg: 'Package not found' });
        }
        res.json(package);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.updatePackage = async(req, res) => {
    const { name, description, price, duration } = req.body;
    const updatedFields = { name, description, price, duration };
    try {
        let package = await Package.findById(req.params.id);
        if (!package) {
            return res.status(404).json({ msg: 'Package not found' });
        }
        package = await Package.findByIdAndUpdate(req.params.id, { $set: updatedFields }, { new: true });
        res.json(package);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.deletePackage = async(req, res) => {
    try {
        let package = await Package.findById(req.params.id);
        if (!package) {
            return res.status(404).json({ msg: 'Package not found' });
        }
        await Package.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Package removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};