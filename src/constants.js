const UserTypes = {
  CLIENT: 'client',
  CONTRACTOR: 'contractor'
}

const ContractStatus = {
  NEW: 'new',
  IN_PROGRESS: 'in_progress',
  TERMINATED: 'terminated'
}

const ErrorCodes = {
  JOB_NOT_FOUD: 'job_not_found',
  JOB_ALREADY_PAID: 'job_already_paid',
  CONTRACT_TERMINATED: 'contract_terminated',
  INSUFFICIENT_FOUNDS: 'insufficient_founds',
  PAYMENT_NOT_PROCESSED: 'payment_not_processed',
  DEPOSIT_AMOUNT_REQUIRED: 'amount_required',
  DEPOSIT_AMOUNT_NOT_VALID: 'amount_not_valid_number',
  DEPOSIT_AMOUNT_LIMIT_EXCEED: 'amount_greather_than_limit'
}

module.exports = { UserTypes, ContractStatus, ErrorCodes }