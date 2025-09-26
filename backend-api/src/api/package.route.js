const express = require('express');
const router = express.Router();
const packageController = require('../controllers/package.controller');
const auth = require('../middlewares/auth.middleware');
const admin = require('../middlewares/admin.middleware');

router.get('/', packageController.getAllPackages); // Publicly viewable
router.post('/', [auth, admin], packageController.createPackage);
router.get('/:id', packageController.getPackageById); // Publicly viewable
router.put('/:id', [auth, admin], packageController.updatePackage);
router.delete('/:id', [auth, admin], packageController.deletePackage);

module.exports = router;