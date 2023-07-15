const service = require('../services/admin-service')

const bestProfession = async (req, res) => {
  const { start, end } = req.query;
  const { profession, totalAmount } = await service.getBestProfessionByTime(start, end);
  res.json({
    profession, totalAmount
  })
}

const bestClients = async (req, res) => {
  const { start, end, limit } = req.query;
  const result = await service.getBestClientsByTime(start, end, limit);
  res.json(mapClients(result));
}

const mapClients = (result) => {
  return result.map(r => ({
    id: r.Contract.Client.id,
    fullName: `${r.Contract.Client.firstName} ${r.Contract.Client.lastName}`,
    paid: r.paid
  }))
}

module.exports = { bestProfession, bestClients };
