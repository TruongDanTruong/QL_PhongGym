const express = require('express');
const router = express.Router();
const memberController = require('../controllers/member.controller');
const auth = require('../middlewares/auth.middleware');
const admin = require('../middlewares/admin.middleware');

// @route   GET api/admin/members
// @desc    Get all members
// @access  Private (Admin)
router.get('/', [auth, admin], memberController.getAllMembers);

// @route   POST api/admin/members
// @desc    Create a member
// @access  Private (Admin)
router.post('/', [auth, admin], memberController.createMember);

// @route   GET api/admin/members/:id
// @desc    Get member by ID
// @access  Private (Admin)
router.get('/:id', [auth, admin], memberController.getMemberById);

// @route   PUT api/admin/members/:id
// @desc    Update a member
// @access  Private (Admin)
router.put('/:id', [auth, admin], memberController.updateMember);

// @route   DELETE api/admin/members/:id
// @desc    Delete a member
// @access  Private (Admin)
router.delete('/:id', [auth, admin], memberController.deleteMember);

module.exports = router;