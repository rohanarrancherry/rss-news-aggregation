const express = require('express')
const resp = require('express/lib/response')
//const editor = require('../model/editor')
//const ChannelDetails = require('../model/channelList')
const EditorChannelList = require('../model/editorChannelList')
 
const editorRouters = express.Router()
const Editor = require('../model/User')



// add channel for an editor
editorRouters.post('/:eId/addChannel', async(req,resp) =>{
    console.log('post');
    const editorChannelList = new EditorChannelList({
        editorId:req.params.eId,
        channelId:req.body.channelId,
        name: req.body.name,
        tags:req.body.tags,
        link: req.body.link,
        enable:req.body.enable
    })
    try{
        const cd = await editorChannelList.save()
        resp.json(cd)
    }
    catch(err){
        resp.send('Error')
    }
})

//get channel list for an editor
editorRouters.get('/:eId/channels', async(req,resp) =>{
    console.log('post');
    
    try{
        const editorChannelList = await EditorChannelList.find({editorId:req.params.eId}) 
    resp.json(editorChannelList)
    }
    catch(err){
        resp.send('Error :'+err)
    }
})
//get one channel detail for an editor
editorRouters.get('/:eId/channel/:cId', async(req,resp) =>{
    console.log('post');
    
    try{
        const editorChannelList = await EditorChannelList.find({editorId:req.params.eId ,channelId:req.params.cId})  
    resp.json(editorChannelList)
    }
    catch(err){
        resp.send('Error')
    }
})

// update channel enable/disable for an editor
editorRouters.patch('/:eId/channel/:cId',async(req,resp)=> {
    try{
        const editorChannelList = await EditorChannelList.find({editorId:req.params.eId ,channelId:req.params.cId}) 
        editorChannelList.enable = req.body.enable
        const updateData = await editorChannelList.save()
        resp.json(updateData)   
    }catch(err){
        resp.send('Error')
    }

})

module.exports = editorRouters