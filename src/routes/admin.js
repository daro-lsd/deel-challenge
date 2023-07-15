const express = require('express');
const router = express.Router();

const controller = require('../controllers/admin-controller')

/**
 * @returns best profession by date range
 */
// TODO include validation for admin API-KEY
router.get('/best-profession', controller.bestProfession)

/**
 * @returns best client by date rante
 */
// TODO include validation for admin API-KEY
router.get('/best-clients', controller.bestClients)

module.exports = router;
