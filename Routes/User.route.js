const express = require('express');
const router = express.Router();
const {
    updateUserFeed,
    getUserCategories,
    addChanneltoEditorList,
    getEditorChannelList,
    getMasterData,
    updateChannelDetails,
    deleteChannel

} = require("../Controllers/User.Controller");

router.get('/categories', getUserCategories);
router.post('/addchannel', addChanneltoEditorList);
router.get('/channellist', getEditorChannelList);
router.patch('/channel', updateChannelDetails);
router.delete('/channel/:id', deleteChannel);
router.get('/masterdata', getMasterData);
router.get('/update', updateUserFeed);

module.exports = router;