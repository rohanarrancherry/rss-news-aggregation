const express = require('express')
const resp = require('express/lib/response')
//const editor = require('../model/editor')
const Filter = require('../model/filter')
const filterRouters = express.Router()


filterRouters.get('/:uId/selectedTags',async(req,resp) => 
{
    try{
        const filter= await Filter.find({userId:req.params.uId})
        if(filter!=null)
        resp.json(filter)
        else
        resp.json('Empty list')
    }
    catch(err){
        resp.send('Error '+err)
    }
}
)

filterRouters.put('/:uId',async(req,resp) => 
{
    try{
        
        const filter= await Filter.find({userId:req.params.uId})
        if(filter.length==0){
            console.log("filter :"+filter)
            const FilterDetails = new Filter({
                listOfTags:req.body.listOfTags,
                userId:req.params.uId
            })
            const updateData = await FilterDetails.save()
            resp.json(updateData) 
        }  
        else{
            console.log("filter :"+filter.length)
            /*const FilterDetails = new Filter({
                listOfTags:req.body.listOfTags,
                _id:filter._id
            })*/
            //filter.listOfTags = req.body.listOfTags
            const updateData = await Filter.findOneAndUpdate({userId:req.params.uId},{"listOfTags":req.body.listOfTags})
            resp.json(updateData) 
        } 
    }
    catch(err){
        resp.send('Error '+err)
    }
}
)

module.exports = filterRouters