const { Profile, sequelize } = require('../model')
const jobService = require('../services/job-service')
const profileService = require('../services/profile-service')
const balanceDepositValidator = require('../validators/balance-deposit-validator')

const deposit = async (clientId, amount) => {
  const totalAmountToPay = await jobService.getTotalAmountToPay(clientId);
  balanceDepositValidator.validate(totalAmountToPay, amount);

  await executeDeposit(clientId, amount);

  const { balance } = await profileService.getById(clientId);
  return balance;
}

const executeDeposit = async (clientId, amount) => {
  await sequelize.transaction(async (t) => {
    try {
      const transactionOptions = { transaction: t };
      // UPDATE CLIENT BALANCE
      const client = await Profile.findOne({ where: { id: clientId }, ...transactionOptions });
      client.balance += amount;
      await client.save(transactionOptions);
    } catch (error) {
      await t.rollback();
      throw new Error(error.message);
    }
  });
}

module.exports = { deposit }