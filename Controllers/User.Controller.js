const {verifyAccessToken} = require("../helpers/jwt_helper")
const User = require('../Models/User.model')


exports.getUserCategories = async (req, res) => {
    try{
    const payload = verifyAccessToken(req, res)
        console.log(payload)
    const currentUser = await User.findById(payload.aud)
        console.log(currentUser.newsCategories)
    res.status(200).json(currentUser.newsCategories);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err,
        });
    }
};