const { UserTypes } = require('../constants')

const RESPONSE_NOT_CLIENT = {
    error: 'not_allowed',
    error_description: `The selected profile is not a client `,
}

const isClient = async (req, res, next) => {
    const profile = req.profile;
    if (profile.type !== UserTypes.CLIENT) return res.status(403).json(RESPONSE_NOT_CLIENT)
    req.profile = profile
    next()
}
module.exports = { isClient }