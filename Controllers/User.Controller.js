const {verifyAccessToken} = require("../helpers/jwt_helper")
const User = require('../Models/User.model')
const EditorChannelList = require('../Models/EditorChannelList.model')
const MasterChannelData = require('../Models/MasterChannelData.model')
const {job} = require("../updateFeeds");

exports.getUserCategories = async (req, res) => {
    try {
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
// add channel for an editor
exports.addChanneltoEditorList = async (req, res) => {
    const editorChannelList = new EditorChannelList({
        source: req.body.source,
        category: req.body.category,
        url: req.body.url,
        enable: req.body.enable
    })
    try {
        const ecl = await editorChannelList.save()
        res.status(200).json(ecl)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err,
        });
    }

};
//get channel list for an editor
exports.getEditorChannelList = async (req, res) => {
    try {
        const editorChannelList = await EditorChannelList.find()
        res.status(200).json(editorChannelList)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err,
        });
    }
};

exports.getMasterData = async (req, resp) => {
    console.log('get')
    try {
        const channelList = await MasterChannelData.find()
        resp.status(200).json(channelList)
    } catch (err) {
        console.log(err);
        resp.status(500).json({
            message: err,
        });
    }
};

exports.updateChannelDetails = async (req, res) => {
    try {
        const editorChannelList = await EditorChannelList.updateOne({_id: req.body.id}, {enable: req.body.enable})
        editorChannelList.enable = req.body.enable
        res.status(200).json(editorChannelList);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err,
        });
    }

};
exports.deleteChannel = async (req, res) => {
    try {
        console.log(req.params.id)
        const editorChannelList = await EditorChannelList.deleteOne({_id: req.params.id})
        res.status(200).json(editorChannelList)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err,
        });
    }
};

exports.updateUserFeed = async (req, res) => {
    try {
        const channels = await EditorChannelList.find()
        console.log(channels.length)
        const filteredChannels = channels.filter(channel => channel.enable === true);
        console.log(filteredChannels.length)
        const result = await job(filteredChannels)
        res.status(200).json({
            message: result,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err,
        });
    }

};