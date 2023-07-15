const express = require('express');
const router = express.Router();

const { getProfile } = require('../middleware/getProfile')
const { isClient } = require('../middleware/isClient')
const { canAccessBalance } = require('../middleware/canAccessBalance')
const controller = require('../controllers/balance-controller')

/**
 * @returns deposit success
 */
router.post('/deposit/:userId', getProfile, canAccessBalance, isClient, controller.deposit)

module.exports = router;
