const Feed = require('../Models/Feed.model');
const createError = require("http-errors");
const {verifyAccessToken} = require("../helpers/jwt_helper");
const User = require('../Models/User.model');
const jwt = require("jsonwebtoken");
const defaultPage = 1;
const defaultLimit = 30;
const MasterChannelData = require('../Models/ChannelMasterData.model')
exports.getOptions = (req, res, next) => {
    // do user validation here
    // find the user from token get users categories
    // pass it to getByCategory
    const { page, limit } = req.query;

    req.options = {
        page: parseInt(page) || defaultPage,
        limit: parseInt(limit) || defaultLimit,
        select: '-__v -_id -__ttl -guid',
        sort: {
            isoDate: -1,
        },
    };
    next();
};

exports.getDefaultCategory = async (req, res, next) => {
    if (!req.headers['authorization']) return next(createError.Unauthorized())
    const authHeader = req.headers['authorization']
    const bearerToken = authHeader.split(' ')
    const token = bearerToken[1]
    console.log("Before jwt")
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    console.log(payload)

    const currentUser = await User.findById(payload.aud)
    const { options } = req;
    const { category } = currentUser.newsCategories[0];

    try {
        const feeds = await Feed.paginate({ categories: category }, options);
        res.status(200).json(feeds);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err,
        });
    }
};


exports.getByCategory = async (req, res, next) => {
    if (!req.headers['authorization']) return next(createError.Unauthorized())
    const authHeader = req.headers['authorization']
    const bearerToken = authHeader.split(' ')
    const token = bearerToken[1]
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    const currentUser = await User.findById(payload.aud)
    const { options } = req;
    const { category } = req.params;

    try {
        const feeds = await Feed.paginate({ categories: category }, options);
        res.status(200).json(feeds);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err,
        });
    }
};

exports.getByKeyword = async (req, res) => {
    const { options } = req;
    const { keyword } = req.params;
    try {
        const feeds = await Feed.paginate(
            {
                $or: [
                    { title: { $regex: `${keyword}`, $options: 'i' } },
                    { categories: { $regex: `${keyword}`, $options: 'i' } },
                ],
            },
            options
        );
        res.status(200).json(feeds);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err,
        });
    }
};


exports.getMasterData = async(req,resp) => 
{
    try{
        const channelList= await MasterChannelData.find()
        resp.json(channelList)
    }
    catch(err){
        resp.send('Error '+err)
    }
}