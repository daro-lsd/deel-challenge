const { Profile, Job, Contract, sequelize } = require('../model')
const { Sequelize, Op } = require('sequelize');

const getBestProfessionByTime = async (start, end) => {
  const result = await Profile.findAll({
    attributes: [
      'profession',
      [Sequelize.fn('SUM', Sequelize.col('Contractor.Jobs.price')), 'totalAmount']
    ],
    include: [
      {
        model: Contract,
        as: 'Contractor',
        attributes: [],
        include: [
          {
            model: Job,
            attributes: []
          }]
      }
    ],
    where: {
      '$Contractor.Jobs.paymentDate$': {
        [Op.between]: [start, end]
      }
    },
    group: ['Profile.profession'],
    order: [[Sequelize.literal('totalAmount'), 'DESC']]
  })
  return result[0].toJSON();
}


const getBestClientsByTime = async (start, end, limit) => {
  const result = await Job.findAll({
    attributes: [
      [Sequelize.fn('SUM', Sequelize.col('price')), 'paid']
    ],
    include: [
      {
        model: Contract,
        attributes: ['ClientId'],
        include: [
          {

            model: Profile,
            as: 'Client',
            attributes: ['id', 'firstName', 'lastName'],
          }
        ]
      }
    ],
    where: {
      paymentDate: {
        [Op.between]: [start, end]
      },
      paid: true
    },
    group: ['Contract.ClientId'],
    order: [[Sequelize.literal('paid'), 'DESC']],
    limit: limit
  })
  return result;
}

module.exports = { getBestProfessionByTime, getBestClientsByTime }