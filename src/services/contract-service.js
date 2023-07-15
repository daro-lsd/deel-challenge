const { UserTypes, ContractStatus } = require('../constants')
const { Sequelize, DataTypes } = require('sequelize');
const { Contract } = require('../model')

const getById = async (id) => {
  const contract = await Contract.findOne({ where: { id } })
  return contract;
}

const getAllByProfile = async (profile) => {
  const { id, type } = profile;
  const where = { [Sequelize.Op.and]: [] };

  where[Sequelize.Op.and].push({ status: { [Sequelize.Op.not]: ContractStatus.TERMINATED } });
  type === UserTypes.CLIENT
    ? where[Sequelize.Op.and].push({ ClientId: id })
    : where[Sequelize.Op.and].push({ ContractorId: id })
  return await Contract.findAll({ where })
}

module.exports = { getById, getAllByProfile }