const { Profile } = require('../model')

const getById = async (id) => {
  const contract = await Profile.findOne({ where: { id } })
  return contract;
}


module.exports = { getById }