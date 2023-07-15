const { UserTypes, ContractStatus, ErrorCodes } = require('../constants')
const { Sequelize } = require('sequelize');
const { Job, Contract, Profile, sequelize } = require('../model')
const contractService = require('../services/contract-service')
const paymentValidator = require('../validators/job-payment-validator')

const getUnpaidByProfile = async (profile) => {
  const { id: profileId, type: profileType } = profile;
  const where = { paid: { [Sequelize.Op.eq]: null } };
  const include = [
    includeContract(profileId, profileType)
  ]
  return await Job.findAll({ include, where })
}

const getById = async (id) => {
  const where = { id: id };
  return await Job.findOne({ where })
}

const pay = async (client, id) => {
  const job = await getById(id);
  const contract = await contractService.getById(job.ContractId);
  paymentValidator.validate(client, contract, job);
  await executePayment(job.id);
}

const getTotalAmountToPay = async (clientId) => {
  const where = { paid: { [Sequelize.Op.eq]: null } };
  const include = [
    includeContract(clientId, UserTypes.CLIENT)
  ]
  return Job.sum('price', { include, where })
}

const includeContract = (profileId, profileType) => {
  const where = { [Sequelize.Op.and]: [] };
  where[Sequelize.Op.and].push({ status: { [Sequelize.Op.not]: ContractStatus.TERMINATED } });
  profileType === UserTypes.CLIENT
    ? where[Sequelize.Op.and].push({ ClientId: profileId })
    : where[Sequelize.Op.and].push({ ContractorId: profileId });
  return { model: Contract, where }
}

const executePayment = async (jobId) => {
  await sequelize.transaction(async (t) => {
    try {
      const transactionOptions = { transaction: t };

      const job = await Job.findOne({ where: { id: jobId }, ...transactionOptions });
      const contract = await Contract.findOne({ where: { id: job.ContractId }, ...transactionOptions });

      // DEBIT JOB PRICE CLIENT
      const client = await Profile.findOne({ where: { id: contract.ClientId }, ...transactionOptions });
      if (client.balance < job.price) throw new Error(ErrorCodes.INSUFFICIENT_FOUNDS)
      client.balance -= job.price;
      await client.save(transactionOptions);

      // CREDIT JOB PRICE CONTRACTOR
      const contractor = await Profile.findOne({ where: { id: contract.ContractorId }, ...transactionOptions });
      contractor.balance += job.price;
      await contractor.save(transactionOptions);

      // SET JOB AS PAID
      job.paid = true;
      job.paymentDate = new Date();
      await job.save(transactionOptions);

    } catch (error) {
      await t.rollback();
      throw new Error(error.message);
    }
  })
}

module.exports = { getUnpaidByProfile, pay, getTotalAmountToPay }