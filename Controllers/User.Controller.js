const {verifyAccessToken} = require("../helpers/jwt_helper")
const User = require('../Models/User.model')
const EditorChannelList = require('../Models/EditorChannelList.model')


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
// add channel for an editor
exports.addChanneltoEditorList = async (req, res) => {
    const editorChannelList = new EditorChannelList({
        editorId:req.params.eId,
        name: req.body.name,
        tags:req.body.tags,
        link: req.body.link,
        enable:req.body.enable
    })
    try{
        const ecl = await editorChannelList.save()
        res.status(200).json(ecl)
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: err,
        });
    }
    
};
//get channel list for an editor
exports.getEditorChannelList = async(req,res) =>{
    console.log('post');
    
    try{
        const editorChannelList = await EditorChannelList.find() 
    res.status(200).json(editorChannelList)
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: err,
        });
    }
};

exports.updateChannelDetails = async(req,res)=> {
    try{
        const editorChannelList = await EditorChannelList.findOneAndUpdate(req.body.id, {"enable":req.body.enable}) 
        editorChannelList.enable = req.body.enable
        //const updateData = await editorChannelList.findById(req.body.id)
        res.status(200).json(editorChannelList) ;
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: err,
        });
    }

};
exports.DeleteChannel = async(req,res)=> {
    try{
        const editorChannelList = await EditorChannelList.findByIdAndDelete(req.params.id) 
        res.status(200).json(editorChannelList)   
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: err,
        });
    }

};