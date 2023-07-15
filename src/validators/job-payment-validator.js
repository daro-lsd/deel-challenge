const { json } = require('body-parser');
const { ErrorCodes, ContractStatus } = require('../constants')

const validate = (profile, contract, job) => {
  if (!job) {
    throw new Error(ErrorCodes.JOB_NOT_FOUD);
  }
  if (job.paid) {
    throw new Error(ErrorCodes.JOB_ALREADY_PAID);
  }
  if (job.price > profile.balance) {
    throw new Error(ErrorCodes.INSUFFICIENT_FOUNDS);
  }
  if (contract.status === ContractStatus.TERMINATED) {
    throw new Error(ErrorCodes.CONTRACT_TERMINATED);
  }
}

module.exports = { validate }