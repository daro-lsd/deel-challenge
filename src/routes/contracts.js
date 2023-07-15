const express = require('express');
const router = express.Router();

const { getProfile } = require('../middleware/getProfile')
const { canAccessProfile } = require('../middleware/canAccessProfile')
const controller = require('../controllers/contract-controller')

/**
 * @returns contract by id
 */
router.get('/:id', getProfile, canAccessProfile, controller.getById)

/**
 * @returns all contract of the current profile
 */
router.get('/', getProfile, controller.list)

module.exports = router;
