const express = require('express');
const router = express.Router();

const { getProfile } = require('../middleware/getProfile')
const { isClient } = require('../middleware/isClient')
const controller = require('../controllers/job-controller')

/**
 * @returns unpaid jobs
 */
router.get('/unpaid', getProfile, controller.getUnpaid)

/**
 * @returns payment success
 */
router.post('/:job_id/pay', getProfile, isClient, controller.pay)

module.exports = router;
