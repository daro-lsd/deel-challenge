const service = require('../services/contract-service')

const RESPONSE_EMPTY = {
  error: 'not_found',
  error_description: `The selected profile has no active contracts`,
}

const getById = async (req, res) => {
  const { id } = req.params
  const contract = await service.getById(id);
  if (!contract) return res.status(404).end()
  res.json(contract)
}

const list = async (req, res) => {
  const profile = req.profile;
  const contracts = await service.getAllByProfile(profile);
  if (!contracts) return res.status(204).json(RESPONSE_EMPTY);
  res.json(contracts)
}

module.exports = { getById, list };
