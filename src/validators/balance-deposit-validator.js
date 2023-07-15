const { ErrorCodes } = require('../constants')

const validate = (totalAmountToPay, amountToDeposit) => {
  if (!amountToDeposit) {
    throw new Error(ErrorCodes.DEPOSIT_AMOUNT_REQUIRED);
  }
  if (isNaN(amountToDeposit)) {
    throw new Error(ErrorCodes.DEPOSIT_AMOUNT_NOT_VALID);
  }
  if (amountToDeposit > totalAmountToPay * 0.25) {
    throw new Error(ErrorCodes.DEPOSIT_AMOUNT_LIMIT_EXCEED);
  }
}

module.exports = { validate }