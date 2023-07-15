
const canAccessProfile = (req, res, next) => {
    const userProfileId = req.get('profile_id');
    const requestedProfile = req.params.id;
    console.log(userProfileId)
    console.log(requestedProfile)
    if (userProfileId === requestedProfile) {
        next()
    }
    else {
        res.status(403).send({
            error: 'access_denied',
            error_description: 'You can only access to your own profile',
        });
    }

}
module.exports = { canAccessProfile }