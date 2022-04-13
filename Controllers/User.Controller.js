const {verifyAccessToken} = require("../helpers/jwt_helper")
const User = require('../Models/User.model')
const EditorChannelList = require('../Models/EditorChannelList.model')


exports.getUserCategories = async (req, res) => {
    try{
    const payload = verifyAccessToken(req, res)
        console.log(payload)
    const currentUser = await User.findById(payload.aud)
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
        res.json(ecl)
    }
    catch(err){
        res.send('Error')
    }
    
};
//get channel list for an editor
exports.getEditorChannelList = async(req,resp) =>{
    console.log('post');
    
    try{
        const editorChannelList = await EditorChannelList.find({editorId:req.params.eId}) 
    resp.json(editorChannelList)
    }
    catch(err){
        resp.send('Error :'+err)
    }
};

exports.updateChannelDetails = async(req,resp)=> {
    try{
        const editorChannelList = await EditorChannelList.find({editorId:req.params.eId, name:req.body.name }) 
        editorChannelList.enable = req.body.enable
        const updateData = await editorChannelList.save()
        resp.json(updateData)   
    }catch(err){
        resp.send('Error')
    }

};