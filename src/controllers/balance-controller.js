const service = require('../services/balance-service')

const deposit = async (req, res) => {
  const { userId: clientId } = req.params;
  const { amount } = req.body;
  try {
    const newBalance = await service.deposit(clientId, amount);
    res.json({
      success: true,
      newBalance
    })
  }
  catch (error) {
    return res.status(400).json({ error_code: error.message });
  }

}

module.exports = { deposit };
