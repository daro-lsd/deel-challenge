const service = require('../services/job-service')

const RESPONSE_EMPTY = {
  error: 'not_found',
  error_description: `The selected profile has no active unpaid jobs`,
}

const getUnpaid = async (req, res) => {
  const profile = req.profile;
  const contracts = await service.getUnpaidByProfile(profile);
  if (!contracts) return res.status(204).json(RESPONSE_EMPTY);
  res.json(contracts)
}

const pay = async (req, res) => {
  const client = req.profile;
  const jobId = req.params.job_id;
  try {
    await service.pay(client, jobId)
  }
  catch (error) {
    return res.status(400).json({ error_code: error.message });
  }
  res.json({
    success: true
  })
}

module.exports = { getUnpaid, pay };
