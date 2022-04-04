const express = require('express')
const resp = require('express/lib/response')
//const editor = require('../model/editor')
const ChannelDetails = require('../model/channelList')
const channelRouters = express.Router()

//get list of default channels
channelRouters.get('/',async(req,resp) => 
{
    try{
        const channelList= await ChannelDetails.find()
        resp.json(channelList)
    }
    catch(err){
        resp.send('Error '+err)
    }
}
)
//get 1 channel details for id
channelRouters.get('/:channelId',async(req,resp) => 
{
    try{
        const channelDetail= await ChannelDetails.find({channelId:req.params.channelId})
        resp.json(channelDetail)
    }
    catch(err){
        resp.send('Error '+err)
    }
}
)

/*
Api for developers to add default channels list
*/
channelRouters.post('/', async(req,resp) =>{
    console.log('post');
    const channelDetails = new ChannelDetails({
        name: req.body.name,
        tags:req.body.tags,
        link: req.body.link
    })
    try{
        const cd = await channelDetails.save()
        resp.json(cd)
    }
    catch(err){
        resp.send('Error')
    }
})

module.exports = channelRouters