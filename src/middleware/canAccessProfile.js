
const canAccessProfile = (req, res, next) => {
    const userProfileId = req.get('profile_id');
    const requestedProfile = req.params.id;
    if (userProfileId === requestedProfile) {
        next()
    }
    else {
        res.status(403).send({
            error: 'access_denied',
            error_description: 'You can not access resource of other user',
        });
    }
}
module.exports = { canAccessProfile }